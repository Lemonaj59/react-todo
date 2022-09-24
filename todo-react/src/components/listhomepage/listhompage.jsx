import React from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import TodoItem from "./components/todoItems";
import CloseModal from "./components/deleteModal";
import NewItem from "./components/newItem";
import Loading from "../everyPageComponent/loadingScreen";
import Error from "../everyPageComponent/error";
import Logout from "../everyPageComponent/logoutButton";
import EditItemName from "./components/editTodo";

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      todoIds: [],
      isLoaded: false,
      error: null,
      id: [],
      selectedEditedItem: null,
      deleteModalDisplay: false,
      editModalDisplay: false,
      newItemInput: "",
      newListType: null,
      addNewItem: null,
      createNewList: false,
      editedItem: null,
      editedItemId: null,
      handleEditHover: false,
    };
    // binding these functions so there are no problem with context
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleNewItemChange = this.handleNewItemChange.bind(this);
    this.handletype = this.handletype.bind(this);
    this.handleLogouts = this.handleLogouts.bind(this);
    this.handleEditItemChange = this.handleEditItemChange.bind(this);
    this.resetSelectedEditItem = this.resetSelectedEditItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.postList = this.postList.bind(this);
    this.clickEditButton = this.clickEditButton.bind(this);
  }
  //adding a new todoList item
  async postList(todoList, type) {
    const body = { todoList, type };
    const response = await fetch(`/todo/${todoList}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    await this.props.currentTodoList(response.todoList);
    await this.props.changeType(response.type);
    await this.props.navigation("./lists");
  }
  // used to delete a specific item, using the list id.
  async deleteItem(listId) {
    let body = { listId };

    await fetch(`/todo/${this.props.userId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    this.closeDeleteModal();
    this.componentDidMount();
  }
  //used to change the name of a list. Uses newName as what is typed into
  //form, listId
  async changeItem(listId, newName) {
    let body = { listId, newName };

    await fetch(`/todo/${this.props.userId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    this.resetSelectedEditItem();
  }

  //checks if user is already logged in using sessions, if not, will
  //be navigated back to loginPage, else, will show all of their todoLists
  async componentDidMount() {

    await this.props.checkLoginStatus();
    if (!this.props.userId) {
      this.props.navigation("../");
    }

    let response = await fetch(`/todo/${this.props.userId}`);
    response = await response.json();

    this.setState(await { todo: response, isLoaded: true });
  }
  //used to logout a person when clicking logout button.
  async handleLogouts() {
    await this.props.handleLogout();
    await this.props.logout();
    await this.props.navigation("../");
  }

  async componentWillUnmount() {}
  //used to close modal, to delete or not.
  closeDeleteModal = () => {
    this.setState({ deleteModalDisplay: false });
  };
  //used to show delete modal, with the list name
  async showDeleteModal(option) {
    await this.setState(
      await { deleteModalDisplay: true, selectedEditedItem: option }
    );
  }
  //will return the name of the item to the modal.
  async displaySelectedItem() {
    return await this.state.selectedEditedItem;
  }

  //once pressing the adding button, will pull form up, and let you add an item.
  async wantToAddList() {
    this.setState({ addNewItem: true });
  }
  //changes on change for the new item.
  handleNewItemChange(event) {
    this.setState({ newItemInput: event.target.value });
  }
  //will make the type of list that the user has selected.
  async handletype(type) {
    this.setState(await { newListType: type });
  }

  //toggles the edit form.
  async clickEditButton(listName, listId) {
    this.setState(await { editedItem: listName, editedItemId: listId });
  }
  //changes the name onChange, with what is typed in editform
  async handleEditItemChange(event) {
    this.setState({ editedItem: event.target.value });
  }

  //resets the selected item that is edited. with using closeButton, or PATCHING.
  async resetSelectedEditItem() {
    this.setState(await { editedItem: null, editedItemId: null });
  }

  render() {
    const { error, isLoaded, todo, selectedEditedItem } = this.state;
    if (error) {
      return (
        <div>
          <Error error={error} />
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <div key="todoLists">
          <h1 className="text" key="listname">
            Todo Lists{" "}
          </h1>
          <ul>
            {todo.map((dynamicComponent, index) => {
              if (dynamicComponent.id === this.state.editedItemId) {
                return (
                  <div key="edit item">
                    <EditItemName
                      dynamicComponent={dynamicComponent}
                      editedItem={this.state.editedItem}
                      handleEditItemChange={this.handleEditItemChange}
                      resetSelectedEditItem={this.resetSelectedEditItem}
                      changeItem={this.changeItem}
                    />
                  </div>
                );
              } else {
                return (
                  <div>
                    <TodoItem
                      clickEditButton={this.clickEditButton}
                      postList={this.postList}
                      showDeleteModal={this.showDeleteModal}
                      dynamicComponent={dynamicComponent}
                      index={index}
                    />
                    <CloseModal
                      deleteModalDisplay={this.state.deleteModalDisplay}
                      closeDeleteModal={this.closeDeleteModal}
                      selectedEditedItem={selectedEditedItem}
                      deleteItem={this.deleteItem}
                      id={dynamicComponent.id}
                    />
                  </div>
                );
              }
            })}
            <div>
              <NewItem
                newItemInput={this.state.newItemInput}
                newListType={this.state.newListType}
                handleNewItemChange={this.handleNewItemChange}
                handletype={this.handletype}
                userId={this.props.userId}
              />
            </div>
          </ul>
          <div>
            <Logout handleLogouts={this.handleLogouts} />
          </div>
        </div>
      );
    }
  }
}

export default function HomePage(props) {
  const navigation = useNavigate();

  return <Todolist {...props} navigation={navigation} />;
}

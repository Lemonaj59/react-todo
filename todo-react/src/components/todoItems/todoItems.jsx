import React from "react";
import "./todoItems.css";
import { useNavigate } from "react-router-dom";
import ItemDetails from "./components/itemDetails";
import Error from "../everyPageComponent/error";
import Loading from "../everyPageComponent/loadingScreen";

class ListTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      todoOptions: [],
      isLoaded: false,
      error: null,
      name: Number(localStorage.getItem("name")) || null,
      type: JSON.parse(localStorage.getItem("type")) || null,
      toggleAdd: false,
      addingItem: false,
    };
    this.reload = this.reload.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getItems = this.getItems.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.putItem = this.putItem.bind(this);
  }

  async componentDidMount() {
    await this.getItems();
  }

  async getItems() {
    let name = this.props.selectedTodoList;
    let type = this.props.typeOfTodoList;
    let body = {};
    if (name) {
      localStorage.setItem("name", JSON.stringify(name));
      localStorage.setItem("type", JSON.stringify(type));
      this.setState({ name });
    }
    name
      ? (body = { name, type })
      : (body = { name: this.state.name, type: this.state.type });

    const response = await fetch("/lists", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    this.setState(
      await {
        todoOptions: response.rowNames,
        todoItems: response.items,
        type: response.type,
        isLoaded: true,
      }
    );
  }

  async addItem() {
    await this.setState({ addingItem: true });
  }

  async deleteItem(list_item_id) {
    let body = { list_item_id };

    await fetch("/lists", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    await this.reload();
  }

  async handleExit() {
    this.setState({ addingItem: false });
  }

  async putItem(body) {
    let newBody = await body;

    await fetch("/lists", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBody),
    });
    await this.handleExit();
    await this.reload();
  }

  async reload() {
    this.setState({ isLoaded: false });
    await this.getItems();
  }

  async toggleEdit(dynamicComponent) {
    this.setState(await { edit: true, item: dynamicComponent });
  }

  async cancelEdit() {
    this.setState({ edit: null, item: null });
  }

  componentWillUnmount() {
    localStorage.removeItem("name");
    localStorage.removeItem("type");
  }

  render() {
    const { error, isLoaded, todoItems, todoOptions } = this.state;

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
        <div>
          <ItemDetails
            todoItems={todoItems}
            todoOptions={todoOptions}
            userId={this.props.userId}
            type={this.state.type}
            todoId={this.state.name}
            deleteItem={this.deleteItem}
            componentDidMount={this.componentDidMount}
            reload={this.reload}
            getItem={this.getItems}
            addItem={this.addItem}
            addingItem={this.state.addingItem}
            putItem={this.putItem}
            handleExit={this.handleExit}
          />

          <button onClick={() => this.props.navigation("/homepage")}>
            {" "}
            back
          </button>
        </div>
      );
    }
  }
}

export default function TodoLists(props) {
  const navigation = useNavigate();

  return <ListTodo {...props} navigation={navigation} />;
}

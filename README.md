# **react_todolist**

## **startup**

To start the web application you will need to install docker, And if you are on a linux machine, need to also install `docker-compose`.

secondly you will need to create a `.env` file for your environment variable for the postgres client AND your secret for 'express-sessions'
**client file (db.js)**

```js
const { Pool } = require("pg");

let client = new Pool({
  user: JSON.parse(process.env.USER),
  host: JSON.parse(process.env.HOST),
  database: JSON.parse(process.env.DATABASE),
  password: JSON.parse(process.env.PASSWORD),
  port: JSON.parse(process.env.DBPORT),
});

module.exports = client;

```
**.env file example**
```
SECRET="SECRET"
USER="USER"
DATABASE="DATABASE
PASSWORD="PASSWORD
DBPORT=PORT
PORT=PORT
HOST="POSTGRES PORT"
```

lastly for setup, go to the package.json in the react-todo folder, and add the proxy server your or port your node server is going to run on.
'''
 {"scripts" ...}
 "proxy": "your server port here"
```

--next 
Next go to the postgres server and run docker-compose up -d, the same with the server. and lastly run npm in run the react-todo directory!



## Description
This is a simple todo application, I used `React` for the Front-end. I designed this with classes using React.Component, 
so the readability of the code is more clear. The Goal of this application was to make components and pass the state
 that was needed to the components. 

On my server, I used Node.js with Express.js. while Express.js handled my asynchronous query calls to my database.
Manipulating data as needed for my database and front-end to recognize. Lastly I used postgresql as my database.

I dockerized my psql server, and on initial build it will create the schema. This also adds baseline
data(user, password, lists, and items) for testing purposes.
Also dockerized my node.js server, making it install my node packages. I also made it so you have to be in the directory
to make changes, and cannot add changes while interacting with the docker container. 
I did this just for a bit more security. 


## Priority Plans
*one command start
* Updating edge cases on creating user.
* Updating adding item to list so when selecting done column its a droppdown for  true or false setting.
* Hosting website.
* Putting my server and database on the Google cloud services.
* adding docker swarm to my project, to keep my server up.

## Future Plans
* Putting a background and making website more apealing.
* User settings/profile.
* Random daily tasks on homepage. 
* Hover description on buttons, to give discription.
* Add modal for lists when user is about to delete lists.


## Dependencies

Morgan- I'm going to be using Morgan for my middlware, to use when I have errors and sending
information to me and my server, when an error occors. This way it will give me information about what happened, and the server status.

Express-session - I used express sessions to keep the user logged into the web application as they were accessing their lists, and their homepage.
 
Pg - I used pg to connect to my postgress server from my node.js server. This helped me access queries by also having
the ability to pick a user, password, where I could then limit what that user could do for security reasons. 








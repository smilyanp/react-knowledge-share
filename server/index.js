const express = require("express");
const cors = require('cors')
const crypto = require('crypto')
const databases = {
  images: [
    { id: crypto.randomUUID(), href: 'https://cdn2.thecatapi.com/images/7nm.jpg'},
    { id: crypto.randomUUID(), href: 'https://cdn2.thecatapi.com/images/a59.jpg'},
    { id: crypto.randomUUID(), href: 'https://cdn2.thecatapi.com/images/MTg2NTAwMw.jpg'},
    { id: crypto.randomUUID(), href: 'https://cdn2.thecatapi.com/images/dfn.jpg'},
  ],
};
const server = express();
server.use(cors())
server.use(express.json());

const getImageById = (id) => 
  databases['images'].find(image => image.id === id)

server.use((request, response, next) => {
  const dbName = request.params.entityName;
  if(dbName) {
    const specificDb = databases[dbName];
    if(!specificDb) {
      response.status(400).send("Invalid db");
      return;
    }
  }
  next();
});
server.get("/:dbName", (request, response) => {
  const dbName = request.params.dbName;
  response.status(200).send(databases[dbName]);
});
server.get("/:dbName/:id", (request, response) => {
  const dbName = request.params.dbName;
  const id = request.params.id;
  const entity = databases[dbName].find(image => image.id === id);
  if(!entity) {
    response.status(404).send("Entity not found");
  }
  response.status(200).send(entity);
});
server.put("/:dbName/:id", (request, response) => {
  const dbName = request.params.dbName;
  const id = request.params.id;
  if(getImageById(id)) {
    response.status(409).send("Already exists");
    return;
  }
  const index = databases[dbName].findIndex(image => image.id === id)
  databases[dbName][index] = request.body;
  // Can make this return the new entity, 201 for created?
  // response.status(201).send(db[dbName][id]);
  // Or have the client refetch with maybe an optimistic update in between
  response.status(201).send();
});
server.post("/:dbName", (request, response) => {
  const dbName = request.params.dbName;
  const id = crypto.randomUUID();
  console.log('request.body', request.body)
  databases[dbName].unshift({ id, href: request.body.href })
  // Can make this return the new entity
  // response.status(200).send(db[dbName][id]);
  // Or have the client refetch with maybe an optimistic update in between
  response.status(200).send();
});
server.delete("/:dbName/:id", (request, response) => {
  const dbName = request.params.dbName;
  const id = request.params.id;
  if(!getImageById(id)) {
    response.status(400).send("Entity does not exist");
  }
  const index = databases[dbName].findIndex(image => image.id === id)
  databases[dbName].splice(index, 1);
  response.status(200).send();
});
server.listen(9001, () => console.log("Server started!"))
const personsRouter = require("express").Router();
const Person = require("../models/person");

personsRouter.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

personsRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

personsRouter.get("/info", (request, response) => {
  const date = new Date(Date.now());
  Person.find({}).then((persons) => {
    response.send(
      `<div>Phonebook info has ${
        persons.length
      } people</div> \n <div>${date.toString()}</div>`
    );
  });
});

personsRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

personsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((SavedFormattedPerson) => {
      response.json(SavedFormattedPerson);
    })
    .catch((err) => next(err));
});

personsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    id: request.params.id,
    name: String(body.name),
    number: String(body.number),
  };

  Person.findByIdAndUpdate(person.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      console.log();
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;

const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());

// 3.7 + 3.8: "tiny" format, plus the request body for POST requests.
// A format function is used instead of morgan.token(), because newer morgan
// versions escape token output (the quotes would show up as \").
app.use(
  morgan((tokens, request, response) =>
    [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, "content-length"),
      "-",
      tokens["response-time"](request, response),
      "ms",
      request.method === "POST" ? JSON.stringify(request.body) : "",
    ].join(" ")
  )
);

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only Javascript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/info", (request, response) => {
  response.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()}</div>
  `);
});
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  if (!body.number || !body.name) {
    return response.status(400).json({
      error: "Name or number is missing",
    });
  }
  if (persons.find((p) => p.name === body.name)) {
    return response.status(409).json({
      error: "Name must be unique",
    });
  }
  const person = {
    id: generateId(persons), // Note: I didn't use Math.random here, since this seemed more efficient
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((n) => n.id !== id);
  response.status(204).end();
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const generateId = (param) => {
  const maxId =
    param.length > 0 ? Math.max(...param.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(notes),
  };

  notes = notes.concat(note);
  response.json(note);
});

// must come AFTER all routes, otherwise it catches every request
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

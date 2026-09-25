import ReactDOM from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";

const notes = [
  {
    id: 0,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 1,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 2,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App notes={notes} />
  </StrictMode>,
);

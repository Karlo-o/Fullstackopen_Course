import React from "react";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ content }) => {
  return (
    <div>
      {content.map((part) => (
        <p key={part.name}>{part.name}, {part.count} </p>
      ))}
    </div>
  );
};

const Total = ({ count }) => {
  return <p>Number of exercises: {count}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;
  const parts = [
    { name: "Fundamentals of React", count: exercises1 },
    { name: "Using props to pass data", count: exercises2 },
    { name: "State of a component", count: exercises3},
  ];
  return (
    <div>
      <Header course={course} />
      <Content content={parts} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;

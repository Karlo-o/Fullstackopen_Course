import React from "react";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};

const Total = ({ count }) => {
  return (
    <p>
      Number of exercises: {count[0].count + count[1].count + count[2].count}
    </p>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      Part: {part.name}, exercises: {part.count}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      count: 10,
    },
    {
      name: "Using props to pass data",
      count: 7,
    },
    {
      name: "State of a component",
      count: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total count={parts} />
    </div>
  );
};

export default App;

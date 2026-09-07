import React from "react";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ part1, part2, part3 }) => {
  return (
    <div>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </div>
  );
};

const Total = ({ count }) => {
  return <p>Number of exercises: {count}</p>;
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
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;
  const part1 = {
    name: "Fundamentals of React",
    count: exercises1,
  };
  const part2 = {
    name: "Using props to pass data",
    count: exercises2,
  };
  const part3 = {
    name: "State of a component",
    count: exercises3,
  };
  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;

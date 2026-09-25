const Course = ({ courses }) => {
  //let total = courses.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      {courses.map((course) => {
        const total = course.parts.reduce(
          (sum, part) => sum + part.exercises,
          0,
        );
        return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            <ul>
              {course.parts.map((part) => (
                <p key={part.id}>
                  {part.name} {part.exercises}
                </p>
              ))}
            </ul>
            <p>
              <strong>total of {total} exercises</strong>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Course;

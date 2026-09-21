//import { useState } from "react";

//const Button = ({ onClick, text }) => {
//  return <button onClick={onClick}>{text}</button>;
//};
//const StatisticLine = ({ text, value }) => {
//  return (
//    <div>
//      {text} {value}
//    </div>
//  );
//};

//const Statistics = (props) => {
// return props.good === 0 && props.neutral === 0 && props.bad === 0 ? (
//   <p>no feedback yet</p>
// ) : (
//  <div>
//  <h1>statistics</h1>
//  <table>
// <tbody>
//  <tr>
//  <td><StatisticLine text="good" value={props.good} /></td>
//    </tr>
//     <tr>
//        <td><StatisticLine text="neutral" value={props.neutral} /></td>

//    </tr>
//     <tr>
//       <td><StatisticLine text="bad" value={props.bad} /></td>

//     </tr>
//           <tr>
//            <td><StatisticLine text="all" value={props.all} /></td>

//         </tr>
//           <tr>
//             <td><StatisticLine text="average" value={props.average} /></td>
//
//         </tr>
//           <tr>
//             <td><StatisticLine text="positive" value={props.positive} /></td>
//
//          </tr>
//        </tbody>
//      </table>
//    </div>
//  );
//};

//const App = () => {
//const [good, setGood] = useState(0);
//const [neutral, setNeutral] = useState(0);
//const [bad, setBad] = useState(0);

//const all = good + neutral + bad;
//const average = all === 0 ? 0 : (good - bad) / all;
//const positive = all === 0 ? 0 : (good / all) * 100;
//const handleGoodClick = () => setGood(good + 1);
//const handleNeutralClick = () => setNeutral(neutral + 1);
//const handleBadClick = () => setBad(bad + 1);

//return (
// <div>
//<h1>give feedback</h1>
// <Button onClick={handleGoodClick} text="good" />
//<Button onClick={handleNeutralClick} text="neutral" />
// <Button onClick={handleBadClick} text="bad" />
//<Statistics
//good={good}
//neutral={neutral}
//bad={bad}
//all={all}
//average={average}
//positive={positive}
///>
//</div>
//);
//};

//export default App;
import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const handleOnClick = () => {
    if (selected >= anecdotes.length - 1) {
      setSelected(0);
    } else {
      setSelected(selected + 1);
    }
  };
  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleOnClick}>Next anecdote</button>
      <button onClick={handleVoteClick}>vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {votes[votes.indexOf(Math.max(...votes))]} votes</p>
    </div>
  );
};

export default App;

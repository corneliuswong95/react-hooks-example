import React, { useEffect, useReducer, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FaStar } from 'react-icons/fa';
import useInput from './useInput';
import useFetch from './useFetch';


const createArray = (length) => [
  ...Array(length)
];

const Star = ({ selected = false, onSelect }) => {
  return <FaStar
    color={selected ? "red" : "green"}
    onClick={onSelect}
  />
}

const StarRating = ({ numberOfStars }) => {
  const [selected, setSelected] = useState(0);
  return createArray(numberOfStars).map((n, i) => {
    return <Star key={i} selected={i < selected} onSelect={() => setSelected(i + 1)} />
  });
}

//object destructuring 
const [, , third] = ["alex", "betty", "cornelius"];

const App = () => {

  //useState
  const [status, setStatus] = useState("not delivered");
  const [checked, setChecked] = useState(false);
  //const [data, setData] = useState([]);

  //useEffect
  useEffect(() => {
    console.log("the check is: " + checked)
  }, [checked])

  // useEffect(() => {
  //   fetch('https://api.github.com/users')
  //     .then((response) => response.json())
  //     .then(setData);
  // }, [])

  const [loading, data, error] = useFetch(`https://api.github.com/users`);


  //useReducer
  const [number, setNumber] = useReducer(
    (number, newNumber) => {
      return number + newNumber
  }, 0)

  const initialState = {
    message: "hi"
  }
  const reducer = (state, action) => {
    switch(action) {
      case "yell":
        return {
          message: "HEYY!"
        }
      case "whisper": 
        return {
          message: "excuse me"
        }
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  //useRef
  const soundVal = useRef();
  const colorVal = useRef();

  //custom hook useInput
  const [input, setInput] = useInput("");

  const submit = (e) => {
    e.preventDefault();
    const sound = input.value;
    const color = colorVal.current.value;
    alert(`${sound} sounds like ${color}`);
    setInput("");
    colorVal.current.value = "";
  }

  return (
    <div>
      <p>
        The package is: {status}
      </p>
      <button onClick={() => { setStatus("Delivered") }}>Deliver</button>
      <br />
      <input
        type="checkbox"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <p>{checked ? "checked" : "not checked"}</p>
      <br />
      <br />
      <StarRating numberOfStars={10} />
      <br />
      <br />
      <h1>Users</h1>
      <ul>
        {loading && <h1>Loading...</h1>}
        {!loading && data.map((user,i) => {
          if(i<10){
            return <li key={user.id}>{user.login}</li>
          }
        })}
      </ul>
      <br />
      <h1 onClick={() => setNumber(1)}>{number}</h1>
      <br />
      <p>Message: {state.message}</p>
      <button onClick={()=>dispatch("yell")}>yell</button>
      <button onClick={()=>dispatch("whisper")}>whisper</button>
      <br/>
      <form onSubmit={submit}>
        <input type="text" {...input} placeholder="Sound.."></input>
        <input type="color" ref={colorVal} ></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App name={third} />
  </React.StrictMode>
)


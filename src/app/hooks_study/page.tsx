"use client"
import { useState, useEffect,useContext, useRef } from "react";

export default function App() {
  const [count,setCount] = useState(0);
  const ref = useRef();

  const handleRef = () => {
    console.log(ref.current.value);
    console.log(ref.current.offsetHeight);
  };

  const handleClick = () => {
  setCount(count + 1);
  };
    useEffect(() => {
      console.log("Hello Hooks");
    }, [count]);//この角括弧で発火タイミングを決める

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">useState,useEffect</h1>
      <button className="border-2 rounded-box"onClick={handleClick}>＋</button>
      <p className="text-lg">{count}</p>

      <p className="text-2xl text-bold">useContext</p>
      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button className="border-2"onClick={handleRef}>useRef</button>

      <hr />
      <h1>useReducer</h1>
      <input type="text" ref={ref} />
      <button className="border-2"onClick={handleRef}>useRef</button>
    </div>
  );
}

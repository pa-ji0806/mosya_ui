"use client"
import { useState, useEffect } from "react";

export default function App() {
  const [count,setCount] = useState(0);
  useEffect(() => {
    console.log("Hello Hooks");
  }, [count]);//この角括弧で発火タイミングを決める

  const handleClick = () => {
  setCount(count + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">UseState,UseEffect</h1>
      <button className="border-2 rounded-box"onClick={handleClick}>＋</button>
      <p className="text-lg">{count}</p>
    </div>
  );
}

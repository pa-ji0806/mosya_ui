"use client"

export default function MyButton() {
  function handleClick() {
    const name = prompt("あなたの名前は？");
    alert(`こんにちは、${name}さん！`);
  }

  return <button onClick={handleClick}>あいさつする</button>;
}
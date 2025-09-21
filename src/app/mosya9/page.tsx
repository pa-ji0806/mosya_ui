"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "veteran" | "newbie";
  text: string;
  timestamp: Date;
}

const VeteranChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "veteran", text: "こんにちは！今日はどんなことで困ってますか？😊", timestamp: new Date() },
    { id: 2, sender: "newbie", text: "離乳食を始めたばかりで、どんな食材からがいいのか不安です…", timestamp: new Date() },
    { id: 3, sender: "veteran", text: "いい質問ですね！最初はにんじんやかぼちゃのペーストがおすすめですよ🥕🎃", timestamp: new Date() },
    { id: 4, sender: "newbie", text: "やっぱり甘めの野菜からがいいんですね！ブレンダーを使っても大丈夫ですか？", timestamp: new Date() },
    { id: 5, sender: "veteran", text: "もちろんOK。なめらかになって食べやすいです✨", timestamp: new Date() },
    { id: 6, sender: "newbie", text: "保存はどうしたら？まとめて作って冷凍でも平気？", timestamp: new Date() },
    { id: 7, sender: "veteran", text: "製氷皿に小分けで冷凍🧊 1週間以内を目安に使い切ってね。", timestamp: new Date() },
    { id: 8, sender: "newbie", text: "助かります！ありがとうございます😊", timestamp: new Date() },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const me: ChatMessage = {
      id: Date.now(),
      sender: "newbie",
      text: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, me]);
    setInput("");

    // デモ用の自動返信
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "veteran",
          text: "とても頑張ってますね。他にも不安があれば何でも聞いてください🌸",
          timestamp: new Date(),
        },
      ]);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col pb-20">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-100 px-4 py-3 flex items-center gap-3">
        {/* 三本線 */}
        <button
          className="btn btn-ghost btn-circle"
          aria-label="open menu"
          onClick={() => console.log("menu")}
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 rounded bg-gray-800" />
            <span className="block h-0.5 w-5 rounded bg-gray-800" />
            <span className="block h-0.5 w-5 rounded bg-gray-800" />
          </div>
        </button>

        {/* ブランド名 */}
<div className="flex-1">
  <span className="text-lg font-bold tracking-wide bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
    Ikumi-
  </span>
</div>


        {/* 相手の状態（右側スペース） */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">
            サポート中
          </span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            V
          </div>
        </div>
      </header>

      {/* メッセージエリア */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "newbie" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow ${
                msg.sender === "newbie"
                  ? "bg-purple-500 text-white rounded-br-none"
                  : "bg-pink-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* 入力エリア */}
      <div className="border-t border-pink-100 p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-2 border-2 border-pink-200 rounded-full outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 text-sm"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:shadow-md"
            aria-label="send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* ボトムナビゲーション（固定） */}
      <nav className="bg-white/90 backdrop-blur-sm border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="max-w-5xl mx-auto flex items-center justify-around py-2">
          {/* 配信 */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-gray-600">配信</span>
          </button>

          {/* 検索 */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>
            <span className="text-xs text-gray-600">検索</span>
          </button>

          {/* ホーム（アクティブ） */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-1">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <span className="text-xs text-purple-600 font-medium">ホーム</span>
          </button>

          {/* チャット */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            <span className="text-xs text-gray-600">チャット</span>
          </button>

          {/* 動画 */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="12" rx="2" ry="2" strokeWidth="2"/>
              <polygon points="10,8 16,12 10,16" fill="currentColor"/>
            </svg>
            <span className="text-xs text-gray-600">動画</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default VeteranChatPage;


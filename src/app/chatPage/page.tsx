"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "veteran" | "newbie";
  text: string;
  timestamp: Date;
}

const TAB_BAR_H = 56;
const INPUT_BAR_H = 50;

const formatTime = (d: Date) =>
  new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

const VeteranChatMobile: React.FC = () => {
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
  const [isComposing, setIsComposing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
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
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative mx-auto h-[100dvh] max-w-[380px] bg-gradient-to-br from-pink-50 to-purple-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-pink-100">
        <div className="flex items-center gap-3 px-4 py-3">
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
          <div className="flex-1 min-w-0">
            <div className="text-lg font-bold tracking-wide truncate bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Ikumi
            </div>
            <div className="text-[10px] text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full inline-block mt-1">
              サポート中
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 grid place-items-center text-white text-sm font-bold">
            V
          </div>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "newbie" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] px-3 py-2 rounded-xl text-sm shadow-sm leading-snug ${
                msg.sender === "newbie"
                  ? "bg-purple-500 text-white rounded-br-none"
                  : "bg-pink-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
              <div className={`mt-1 text-[10px] ${msg.sender === "newbie" ? "text-purple-100/90" : "text-gray-500"}`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className="fixed inset-x-0 z-30 bg-white border-t border-pink-100"
        style={{ bottom: `${TAB_BAR_H}px` }}
      >
        <div className="mx-auto max-w-[380px] px-3 py-2">
          <div className="flex items-center gap-2 border-2 border-pink-200 rounded-full px-3 py-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder="メッセージを入力…"
              className="flex-1 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white grid place-items-center disabled:opacity-40"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-20 bg-white/90 backdrop-blur border-t border-gray-200">
        <div className="mx-auto max-w-[380px] flex items-center justify-around" style={{ height: TAB_BAR_H }}>
          <button className="flex flex-col items-center text-gray-700 text-[11px]">
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            配信
          </button>
          <button className="flex flex-col items-center text-gray-700 text-[11px]">
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>
            検索
          </button>
          <button className="flex flex-col items-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg text-[11px] text-purple-700 font-medium">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full grid place-items-center mb-0.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            ホーム
          </button>
          <button className="flex flex-col items-center text-gray-700 text-[11px]">
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            チャット
          </button>
          <button className="flex flex-col items-center text-gray-700 text-[11px]">
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="12" rx="2" ry="2" strokeWidth="2"/>
              <polygon points="10,8 16,12 10,16" fill="currentColor"/>
            </svg>
            動画
          </button>
        </div>
      </nav>
    </div>
  );
};

export default VeteranChatMobile;

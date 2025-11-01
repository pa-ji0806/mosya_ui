"use client";
import React, { useState, useEffect, useRef } from "react";
import { Heart, Share2, Users, Send } from "lucide-react";

interface ChatMessage {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

interface StreamerInfo {
  name: string;
  badge: string;
  avatar: string;
  description: string;
}

const LiveStreamPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, user: "あやママ", avatar: "あ", text: "離乳食作り頑張って！応援してます✨", timestamp: new Date() },
    { id: 2, user: "えみ", avatar: "え", text: "うちも6ヶ月です！一緒に学ばせてもらいます🍼", timestamp: new Date() },
  ]);

  const [inputMessage, setInputMessage] = useState<string>("");
  const [viewerCount, setViewerCount] = useState<number>(128);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const streamerInfo: StreamerInfo = {
    name: "みかママ",
    badge: "新米ママ",
    avatar: "み",
    description:
      "初めての離乳食作りに挑戦中！6ヶ月の赤ちゃんのために、栄養バランスを考えた離乳食を一緒に作りましょう。質問やアドバイスもお気軽にどうぞ♪",
  };

  const sampleMessages: Omit<ChatMessage, "id" | "timestamp">[] = [
    { user: "さくらママ", avatar: "さ", text: "初めての離乳食作り、懐かしいです💕" },
    { user: "たなか", avatar: "た", text: "手作りは愛情がこもってて素敵ですね" },
    { user: "のぞみ", avatar: "の", text: "レシピ教えてください！" },
    { user: "ひろママ", avatar: "ひ", text: "冷凍保存のコツも知りたいです🧊" },
    { user: "りえ", avatar: "り", text: "みんなで支え合えるって素晴らしい✨" },
  ];

  // 自動メッセージ
  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      const newMessage: ChatMessage = {
        id: Date.now(),
        ...sampleMessages[messageIndex % sampleMessages.length],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev.slice(-9), newMessage]);
      messageIndex++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 視聴者数の変動
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // チャットの自動スクロール
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (): void => {
    if (!inputMessage.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now(),
      user: "あなた",
      avatar: "あ",
      text: inputMessage.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev.slice(-9), newMessage]);
    setInputMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleHeartClick = (): void => {
    document.querySelectorAll(".heart-effect").forEach((el) => el.remove());
    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.className = "heart-effect";
    heart.style.cssText = `
      position: fixed;
      left: ${Math.random() * window.innerWidth}px;
      top: 50%;
      font-size: 24px;
      pointer-events: none;
      animation: heartFloat 2s ease-out forwards;
      z-index: 1000;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  };

  // 右から二番目（カンガルーケア）画像
  const liveBgUrl =
    "https://tse1.mm.bing.net/th/id/OIP.JV3Dn4UDbK8U5v8uUOdn9gHaE8?r=0&pid=Api";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-100 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* 三本線 */}
          <button className="btn btn-ghost btn-circle" aria-label="open menu">
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 rounded bg-gray-800" />
              <span className="block h-0.5 w-5 rounded bg-gray-800" />
              <span className="block h-0.5 w-5 rounded bg-gray-800" />
            </div>
          </button>

          {/* ブランド名（グラデーション） */}
          <span className="text-lg font-bold tracking-wide bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Ikumi-
          </span>

          {/* 右側：視聴者数バッジ */}
          <div className="ml-auto bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
            <Users size={16} />
            {viewerCount}人が視聴中
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-65px)]">
        {/* 動画セクション */}
        <div className="flex-1 p-5">
          <div className="bg-black rounded-2xl relative overflow-hidden shadow-2xl mb-5 h-[70vh]">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${liveBgUrl}")` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute top-4 left-4">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                  🔴 LIVE
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-white text-2xl font-bold mb-2">新米ママの離乳食作り</h2>
                <p className="text-white/90 text-base">みんなで一緒に学びましょう！</p>
              </div>
            </div>
          </div>

          {/* 配信情報 */}
          <div className="bg-white rounded-xl p-5 shadow-lg border border-pink-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                み
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">みかママ</h3>
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    新米ママ
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              初めての離乳食作りに挑戦中！6ヶ月の赤ちゃんのために、栄養バランスを考えた離乳食を一緒に作りましょう。質問やアドバイスもお気軽にどうぞ♪
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleHeartClick}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Heart size={18} />
                応援する
              </button>
              <button className="flex-1 bg-pink-100 text-pink-600 px-4 py-3 rounded-full font-medium hover:bg-pink-200 transition-colors duration-200 flex items-center justify-center gap-2 border-2 border-pink-200">
                <Share2 size={18} />
                シェア
              </button>
            </div>
          </div>
        </div>

        {/* チャットセクション */}
        <div className="w-80 bg-white border-l border-pink-100 flex flex-col">
          <div className="p-5 border-b border-pink-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">チャット</h3>
            <p className="text-sm text-gray-500">ママ同士で応援し合いましょう</p>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 p-3 bg-pink-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {message.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-pink-600 mb-1">{message.user}</div>
                  <div className="text-sm text-gray-700 leading-relaxed">{message.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-pink-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="メッセージを入力してください..."
                className="flex-1 px-4 py-3 border-2 border-pink-200 rounded-full outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-200 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
                aria-label="send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ボトムナビ（配信をアクティブ表示） */}
      <nav className="bg-white/90 backdrop-blur-sm border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="max-w-6xl mx-auto flex items-center justify-around py-2">
          {/* ✅ 配信（アクティブ） */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-1">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs text-purple-600 font-medium">配信</span>
          </button>

          {/* 検索 */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>
            <span className="text-xs text-gray-600">検索</span>
          </button>

          {/* ホーム */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="text-xs text-gray-600">ホーム</span>
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

      {/* ハートアニメーション */}
      <style jsx>{`
        @keyframes heartFloat {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default LiveStreamPage;

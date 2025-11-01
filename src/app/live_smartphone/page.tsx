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

// Layout constants
const VIDEO_H = "50dvh"; // 上半分がライブ映像
const TAB_BAR_H = 44; // 下部タブの高さ(px)
const INPUT_H = 52; // チャット入力欄の高さ(px)

const LiveStreamPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, user: "あやママ", avatar: "あ", text: "離乳食作り頑張って！応援してます✨", timestamp: new Date() },
    { id: 2, user: "えみ", avatar: "え", text: "うちも6ヶ月です！一緒に学ばせてもらいます🍼", timestamp: new Date() },
  ]);

  const [inputMessage, setInputMessage] = useState<string>("");
  const [viewerCount, setViewerCount] = useState<number>(128);
  const [showChat, setShowChat] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

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
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, showChat]);

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

  const liveBgUrl =
    "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=900";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 max-w-md mx-auto relative">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-100 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button className="p-2" aria-label="open menu">
            <div className="space-y-1">
              <span className="block h-0.5 w-5 rounded bg-gray-800" />
              <span className="block h-0.5 w-5 rounded bg-gray-800" />
              <span className="block h-0.5 w-5 rounded bg-gray-800" />
            </div>
          </button>

          <span className="text-lg font-bold tracking-wide bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Ikumi
          </span>

          <div className="ml-auto bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
            <Users size={14} />
            {viewerCount}人
          </div>
        </div>
      </header>

      {/* ライブ映像（画面上半分） */}
      <section className="relative" style={{ height: VIDEO_H }}>
        <div className="absolute inset-0 bg-black overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${liveBgUrl}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute top-3 left-3">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                🔴 LIVE
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <h2 className="text-white text-base font-bold mb-0.5">新米ママの離乳食作り</h2>
              <p className="text-white/90 text-xs">みんなで一緒に学びましょう！</p>
            </div>
          </div>
        </div>

        {/* チャットトグル（映像の上に浮かぶ） */}
        <button
          onClick={() => setShowChat((v) => !v)}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg"
          aria-label="open chat"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </section>

      {/* ライブ情報＆アクション（チャット非表示時のみ） */}
      {!showChat && (
        <section className="px-4 pt-3 pb-[calc(16px+var(--tab-h))]" style={{ ['--tab-h' as any]: `${TAB_BAR_H}px` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
              {streamerInfo.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{streamerInfo.name}</h3>
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                  {streamerInfo.badge}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            {streamerInfo.description}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleHeartClick}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Heart size={16} />
              応援する
            </button>
            <button className="flex-1 bg-pink-100 text-pink-600 px-4 py-3 rounded-full font-medium hover:bg-pink-200 transition-colors duration-200 flex items-center justify-center gap-2 border-2 border-pink-200">
              <Share2 size={16} />
              シェア
            </button>
          </div>
        </section>
      )}

      {/* チャット（開くと、ライブ映像以外の領域をちょうど埋める） */}
      {showChat && (
        <section
          className="fixed left-0 right-0 max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl flex flex-col"
          style={{
            top: `calc(${VIDEO_H})`,
            bottom: `calc(${TAB_BAR_H}px + env(safe-area-inset-bottom, 0px))`,
          }}
        >
          {/* チャットヘッダー */}
          <div className="p-4 border-b border-pink-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-800">チャット</h3>
              <p className="text-[11px] text-gray-500">ママ同士で応援し合いましょう</p>
            </div>
            <button onClick={() => setShowChat(false)} className="p-2" aria-label="close chat">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* メッセージリスト */}
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-3 space-y-2"
            style={{ paddingBottom: `${INPUT_H + 12}px` }}
          >
            {messages.map((m) => (
              <div key={m.id} className="flex gap-2 p-2.5 bg-pink-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-pink-600 mb-0.5">{m.user}</div>
                  <div className="text-sm text-gray-700 leading-relaxed break-words">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 入力エリア（チャット内に固定） */}
          <div
            className="absolute left-0 right-0 px-3 pb-3"
            style={{ bottom: 0 }}
          >
            <div className="bg-white rounded-full border-2 border-pink-200 px-3 py-1.5 flex items-center gap-2 shadow-sm">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="メッセージを入力..."
                className="flex-1 px-1 py-1 outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-9 h-9 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full grid place-items-center"
                aria-label="send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ボトムナビ */}
      <nav
        className="bg-white/90 backdrop-blur-sm border-t border-gray-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto"
        style={{ height: TAB_BAR_H, paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="h-full flex items-center justify-around">
          {/* 配信（アクティブ） */}
          <button className="flex flex-col items-center py-1 px-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100">
            <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[10px] text-purple-600 font-medium">配信</span>
          </button>

          {/* 検索 */}
          <button className="flex flex-col items-center py-1 px-3">
            <svg className="w-5 h-5 text-gray-600 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>
            <span className="text-[10px] text-gray-600">検索</span>
          </button>

          {/* ホーム */}
          <button className="flex flex-col items-center py-1 px-3">
            <svg className="w-5 h-5 text-gray-600 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="text-[10px] text-gray-600">ホーム</span>
          </button>

          {/* チャット */}
          <button className="flex flex-col items-center py-1 px-3" onClick={() => setShowChat(true)}>
            <svg className="w-5 h-5 text-gray-600 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            <span className="text-[10px] text-gray-600">チャット</span>
          </button>

          {/* 動画 */}
          <button className="flex flex-col items-center py-1 px-3">
            <svg className="w-5 h-5 text-gray-600 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="12" rx="2" ry="2" strokeWidth="2"/>
              <polygon points="10,8 16,12 10,16" fill="currentColor"/>
            </svg>
            <span className="text-[10px] text-gray-600">動画</span>
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

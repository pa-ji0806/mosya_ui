"use client";

export default function TestSVG() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">SVGテスト</h1>
      
      {/* 背景付きでSVGを見やすくする */}
      <div className="space-y-4">
        <div className="p-4 bg-white border rounded">
          <p className="mb-2">ハンバーガーメニュー:</p>
          <svg viewBox="0 0 24 24" className="w-12 h-12 border">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="black" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="p-4 bg-white border rounded">
          <p className="mb-2">円:</p>
          <svg viewBox="0 0 24 24" className="w-12 h-12 border">
            <circle cx="12" cy="12" r="8" fill="blue" stroke="red" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* さらに簡単なテスト */}
        <div className="p-4 bg-white border rounded">
          <p className="mb-2">簡単な長方形:</p>
          <svg width="100" height="100" className="border">
            <rect x="10" y="10" width="80" height="80" fill="green"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
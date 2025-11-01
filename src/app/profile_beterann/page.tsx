"use client";
import React, { useMemo, useState } from "react";
import { Search, Filter, ChevronDown, Star, MapPin, BadgeCheck, MessageCircle, Calendar, Heart } from "lucide-react";

// --- Types ---
interface Instructor {
  id: string;
  name: string;
  avatar: string; // fallback initial
  badge: "助産師" | "小児科看護師" | "管理栄養士" | "ベテランママ" | "産後ケア";
  years: number; // years of experience
  rating: number; // 0-5
  reviews: number;
  area: string; // city / region
  tags: string[]; // specialties
  intro: string; // short bio
  online: boolean;
  price: number; // kept in data but not shown per request
}

// --- Layout constants ---
const TAB_BAR_H = 52; // bottom nav height

// --- Mock data ---
const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: "1",
    name: "みかママ",
    avatar: "み",
    badge: "ベテランママ",
    years: 8,
    rating: 4.8,
    reviews: 126,
    area: "東京・武蔵野",
    tags: ["離乳食", "初期ケア", "寝かしつけ"],
    intro: "初めての離乳食・寝かしつけを一緒に。肩の力を抜ける伴走が得意です。",
    online: true,
    price: 1800,
  },
  {
    id: "2",
    name: "田中えみ",
    avatar: "え",
    badge: "管理栄養士",
    years: 6,
    rating: 4.9,
    reviews: 89,
    area: "神奈川・横浜",
    tags: ["アレルギー対応", "栄養設計", "後期メニュー"],
    intro: "食物アレルギーの不安に寄り添い、月齢別の献立を提案します。",
    online: true,
    price: 2200,
  },
  {
    id: "3",
    name: "さくら",
    avatar: "さ",
    badge: "助産師",
    years: 12,
    rating: 4.7,
    reviews: 210,
    area: "埼玉・大宮",
    tags: ["母乳相談", "産後ケア", "赤ちゃんの発達"],
    intro: "産前産後の心と体をトータルでサポート。",
    online: false,
    price: 2500,
  },
  {
    id: "4",
    name: "のぞみ",
    avatar: "の",
    badge: "小児科看護師",
    years: 7,
    rating: 4.6,
    reviews: 73,
    area: "千葉・船橋",
    tags: ["発熱時の対応", "お薬相談", "生活リズム"],
    intro: "はじめての発熱・風邪の不安に、看護の視点でアドバイス。",
    online: true,
    price: 2000,
  },
  {
    id: "5",
    name: "りえ",
    avatar: "り",
    badge: "産後ケア",
    years: 5,
    rating: 4.5,
    reviews: 41,
    area: "東京・世田谷",
    tags: ["産後メンタル", "家事両立", "パートナー支援"],
    intro: "育児と自分時間のバランスづくりを二人三脚で。",
    online: false,
    price: 1600,
  },
];

// --- Helpers ---
const formatStars = (rating: number) => Array.from({ length: 5 }, (_, i) => i + 1);

const StarRow: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = formatStars(rating);
  return (
    <div className="flex items-center gap-0.5">
      {stars.map((s) => (
        <svg
          key={s}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-[14px] h-[14px] ${s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        >
          <path stroke="currentColor" strokeWidth="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.57a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.507a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.57a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z" />
        </svg>
      ))}
      <span className="text-[11px] text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

const Tag: React.FC<React.PropsWithChildren<{ active?: boolean; onClick?: () => void }>> = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-2.5 py-1 rounded-full text-[11px] border ${active ? "bg-pink-100 text-pink-700 border-pink-200" : "bg-white text-gray-700 border-gray-200"}`}
  >
    {children}
  </button>
);

const InstructorCard: React.FC<{ i: Instructor; onLike?: (id: string) => void }> = ({ i, onLike }) => (
  <div className="p-3 rounded-2xl bg-white border border-pink-100 shadow-sm">
    <div className="flex items-start gap-3">
      <div className={`w-12 h-12 rounded-full grid place-items-center text-white font-semibold ${i.online ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-gray-400"}`}>
        {i.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h3 className="text-[15px] font-semibold text-gray-900 truncate max-w-[60%]">{i.name}</h3>
          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
            <BadgeCheck size={12} />{i.badge}
          </span>
          <span className="text-[10px] text-gray-500 ml-auto">{i.years}年経験</span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-gray-600">
          <StarRow rating={i.rating} />
          <span className="text-[11px]">({i.reviews})</span>
        </div>

        <div className="mt-1 flex items-center gap-1 text-[12px] text-gray-600">
          <MapPin size={14} /> {i.area}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {i.tags.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[11px]">{t}</span>
          ))}
        </div>

        <p className="mt-2 text-[12px] text-gray-700 line-clamp-2">{i.intro}</p>

        {/* Footer actions (price removed as requested) */}
        <div className="mt-3 flex items-center justify-end gap-2">
          <button className="h-9 px-3 rounded-full border-2 border-pink-200 text-pink-700 text-[12px] flex items-center gap-1">
            <MessageCircle size={14} /> 相談
          </button>
          <button className="h-9 px-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[12px] flex items-center gap-1">
            <Calendar size={14} /> 予約
          </button>
          <button onClick={() => onLike?.(i.id)} className="w-9 h-9 grid place-items-center rounded-full bg-pink-50 text-pink-600">
            <Heart size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Page ---
const InstructorsListMobile: React.FC = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"おすすめ" | "レビュー" | "料金が安い">("おすすめ");
  const [filters, setFilters] = useState<string[]>([]);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const data = useMemo(() => {
    let d = [...MOCK_INSTRUCTORS];
    if (q.trim()) {
      const kw = q.trim().toLowerCase();
      d = d.filter((i) =>
        i.name.toLowerCase().includes(kw) ||
        i.area.toLowerCase().includes(kw) ||
        i.tags.some((t) => t.toLowerCase().includes(kw))
      );
    }
    if (filters.length) {
      d = d.filter((i) => filters.every((f) => i.tags.includes(f) || i.badge === f));
    }
    if (sort === "レビュー") d.sort((a, b) => b.reviews - a.reviews);
    if (sort === "料金が安い") d.sort((a, b) => a.price - b.price);
    if (sort === "おすすめ") d.sort((a, b) => Number(b.online) - Number(a.online) || b.rating - a.rating || b.reviews - a.reviews);
    return d;
  }, [q, sort, filters]);

  const toggleFilter = (f: string) => setFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const allFilterOptions = [
    "離乳食",
    "初期ケア",
    "寝かしつけ",
    "アレルギー対応",
    "栄養設計",
    "母乳相談",
    "産後ケア",
    "お薬相談",
    "生活リズム",
    "助産師",
    "小児科看護師",
    "管理栄養士",
    "ベテランママ",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-pink-100">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Ikumi</span>
            <span className="text-sm text-gray-600">講師一覧</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-full border-2 border-pink-200 bg-white px-3 py-2">
              <Search size={16} className="text-gray-600" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="キーワード（例: 離乳食・助産師・世田谷）"
                className="flex-1 text-sm outline-none"
              />
            </div>
            <button className="px-3 h-[38px] rounded-full border border-gray-200 bg-white text-gray-700 text-sm flex items-center gap-1">
              <Filter size={16} />
              絞り込み
            </button>
          </div>

          <div className="mt-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[12px] text-gray-600">人気タグ:</span>
            {allFilterOptions.slice(0, 7).map((f) => (
              <Tag key={f} active={filters.includes(f)} onClick={() => toggleFilter(f)}>
                {f}
              </Tag>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-[12px] text-gray-600">並び替え</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="appearance-none text-sm pr-6 pl-3 py-1.5 rounded-full border border-gray-200 bg-white"
              >
                <option>おすすめ</option>
                <option>レビュー</option>
                <option>料金が安い</option>
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      {/* List */}
      <main className="px-3 pt-3 space-y-3" style={{ paddingBottom: `calc(${TAB_BAR_H}px + env(safe-area-inset-bottom, 0px))` }}>
        {data.length === 0 && (
          <div className="text-center text-sm text-gray-600 bg-white/70 border border-dashed border-pink-200 rounded-xl p-6">
            条件に一致する講師が見つかりませんでした。キーワードやタグを調整してください。
          </div>
        )}
        {data.map((i) => (
          <InstructorCard
            key={i.id}
            i={i}
            onLike={(id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }))}
          />
        ))}
      </main>

      {/* ボトムナビ（5アイコン） */}
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
          <button className="flex flex-col items-center py-1 px-3">
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

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default InstructorsListMobile;

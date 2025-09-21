"use client";
import { useMemo, useState } from "react";
import { Home, Search, MessageCircle, Monitor, Play } from "lucide-react";

/**
 * Veteran Mom Search (Tailwind + daisyUI)
 * - 鮮やかなピンク〜パープル系のグラデーション
 * - daisyUIのcard/input/badge/btn等のユーティリティ
 * - スクロール可能なリスト & 簡易検索
 * - 下部に5つのアイコンのボトムナビ
 */
export default function VeteranMomSearch() {
  const [q, setQ] = useState("");

  const veteranMoms = [
    { id: 1, name: "あやママ", years: 10, tags: ["お弁当", "時短"], bio: "お弁当作りの達人。朝の時短レシピ配信。" },
    { id: 2, name: "みきママ", years: 8, tags: ["寝かしつけ", "習慣化"], bio: "寝かしつけアドバイザー。生活リズム作りが得意。" },
    { id: 3, name: "さとママ", years: 12, tags: ["双子育児", "家事分担"], bio: "双子ママ経験者。夫婦での家事分担ノウハウを配信。" },
    { id: 4, name: "ゆかママ", years: 6, tags: ["離乳食", "偏食"], bio: "離乳食＆偏食対応の工夫レシピ多数。" },
  ];

  const list = useMemo(() => {
    const k = q.trim();
    if (!k) return veteranMoms;
    return veteranMoms.filter((m) =>
      [m.name, `${m.years}`, m.bio, ...m.tags].some((t) => t.includes(k))
    );
  }, [q]);

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
      {/* ===== 背景（鮮やかなグラデーション） ===== */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="h-full w-full bg-gradient-to-b from-fuchsia-200 via-pink-200 to-rose-100" />
        {/* ソフトな光彩 */}
        <div className="absolute -left-28 -top-24 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
        <div className="absolute right-[-60px] top-24 h-72 w-72 rounded-full bg-rose-300/40 blur-3xl" />
      </div>

      {/* ===== 上部バー ===== */}
      <header className="sticky top-0 z-10 backdrop-blur-md/0">
        <div className="navbar bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
          <div className="flex-none">
            {/* 三本線 */}
            <button className="btn btn-ghost btn-circle">
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 rounded bg-gray-800" />
                <span className="block h-0.5 w-5 rounded bg-gray-800" />
                <span className="block h-0.5 w-5 rounded bg-gray-800" />
              </div>
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-800 tracking-wide ml-3">
              ベテランママを探す
            </h1>
          </div>
        </div>

        {/* 検索欄 */}
        <div className="px-4 py-3">
          <label className="input input-bordered input-lg rounded-2xl flex items-center gap-3 w-full bg-white/80 shadow-sm">
            <Search className="opacity-60" size={18} />
            <input
              type="text"
              placeholder="キーワードで検索（例：寝かしつけ／双子／離乳食）"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="min-w-0"
            />
            {q && (
              <button onClick={() => setQ("")} className="btn btn-xs btn-ghost">
                クリア
              </button>
            )}
          </label>
        </div>
      </header>

      {/* ===== リスト ===== */}
      <main className="flex-1 overflow-y-auto px-4 pb-28 pt-2">
        <div className="grid grid-cols-1 gap-4">
          {list.map((m) => (
            <article key={m.id} className="card bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow rounded-2xl">
              <div className="card-body p-4">
                <div className="flex items-center gap-4">
                  {/* アバター（はみ出し防止版） */}
                  <div className="avatar shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden ring ring-offset-2 ring-offset-white ring-pink-300">
                      <div className="grid place-items-center w-full h-full bg-gradient-to-br from-pink-300 to-fuchsia-300">
                        <span className="text-white text-xl font-bold leading-none select-none">
                          {m.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-lg font-semibold text-gray-800">{m.name}</h2>
                      <span className="badge badge-secondary badge-outline whitespace-nowrap">
                        育児歴 {m.years}年
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{m.bio}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.tags.map((t) => (
                        <span key={t} className="badge badge-ghost whitespace-nowrap">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end pt-2">
                  <button className="btn btn-sm rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white hover:brightness-110 whitespace-nowrap">
                    プロフィールを見る
                  </button>
                </div>
              </div>
            </article>
          ))}

          {!list.length && (
            <div className="text-center text-sm text-gray-600 py-8">
              該当するベテランママが見つかりませんでした。
            </div>
          )}
        </div>
      </main>

      {/* ===== ボトムナビ（5アイコン） ===== */}
      <nav className="fixed inset-x-0 bottom-0 z-20">
        <div className="mx-4 mb-4 rounded-2xl bg-white/80 backdrop-blur shadow-lg border border-white/60">
          <ul className="grid grid-cols-5 place-items-center py-2">
            <li>
              <button className="btn btn-ghost btn-circle">
                <Monitor size={26} className="text-gray-700" />
              </button>
            </li>
            <li>
              <button className="btn btn-ghost btn-circle">
                <Search size={26} className="text-gray-700" />
              </button>
            </li>
            <li>
              <button className="btn btn-ghost btn-circle">
                <Home size={26} className="text-gray-700" />
              </button>
            </li>
            <li>
              <button className="btn btn-ghost btn-circle">
                <MessageCircle size={26} className="text-gray-700" />
              </button>
            </li>
            <li>
              <button className="btn btn-ghost btn-circle">
                <Play size={26} className="text-gray-700" />
              </button>
            </li>
          </ul>
          {/* アクティブ・インジケータ（中央下にグラデーションバー） */}
          <div className="mx-auto h-1 w-14 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 mb-2" />
        </div>
      </nav>
    </div>
  );
}

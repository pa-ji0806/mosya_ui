"use client"

import React, { useState } from 'react';

export default function VeteranMamaProfile() {
  const [isFollowing, setIsFollowing] = useState(false);

  const videos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400',
      title: '新生児のお世話の基本 - 初めてのママ・パパへ',
      duration: '15:42',
      views: '2.3M',
      uploadTime: '1週間前'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
      title: '夜泣き対策 - 赤ちゃんがよく眠るコツ',
      duration: '18:23',
      views: '3.1M',
      uploadTime: '2日前'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400',
      title: '赤ちゃんとの遊び方 - 月齢別発達を促すおもちゃ',
      duration: '22:18',
      views: '950K',
      uploadTime: '5日前'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400',
      title: '産後ケア - ママの心と体のリカバリー',
      duration: '25:50',
      views: '1.4M',
      uploadTime: '4日前'
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
      title: 'おむつ交換のコツとポイント - 新米パパママ必見',
      duration: '8:15',
      views: '720K',
      uploadTime: '1週間前'
    },
    {
      id: 6,
      thumbnail: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
      title: '子どもの安全対策 - 家庭内事故を防ぐ方法',
      duration: '16:42',
      views: '1.1M',
      uploadTime: '6日前'
    }
  ];

  return (
    <div className="flex flex-col items-center w-full bg-black ">
      <div className="min-h-screen bg-pink-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">プロフィール</h1>
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            あ
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">あやママ</h2>
              <span className="px-3 py-1 bg-pink-100 text-pink-600 text-xs rounded-full border border-pink-300">
                育児歴 10年
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              お弁当作りの達人。朝の時短レシピ配信。
            </p>
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                #お弁当
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                #時短
              </span>
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-bold text-gray-800">156</span>
                <span className="text-gray-600 ml-1">投稿</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">12.5K</span>
                <span className="text-gray-600 ml-1">フォロワー</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">234</span>
                <span className="text-gray-600 ml-1">フォロー中</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              isFollowing
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
            }`}
          >
            {isFollowing ? 'フォロー中' : 'メンバーになる'}
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
            メッセージ
          </button>
          <button className="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white mt-2 p-4 flex justify-around border-y">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">4.8</div>
          <div className="text-xs text-gray-600">評価</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">892</div>
          <div className="text-xs text-gray-600">いいね</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">156</div>
          <div className="text-xs text-gray-600">動画</div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="p-4 pb-20">
        <h3 className="text-lg font-bold text-gray-800 mb-4">投稿動画</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {video.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{video.views} 回視聴</span>
                  <span>•</span>
                  <span>{video.uploadTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-1">
        <button className="flex flex-col items-center py-1 px-3 text-gray-600">
          <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px]">配信</span>
        </button>
        <button className="flex flex-col items-center py-1 px-3 text-gray-600">
          <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[10px]">検索</span>
        </button>
        <button className="flex flex-col items-center py-1 px-3 text-pink-600">
          <svg className="w-5 h-5 mb-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="text-[10px]">ホーム</span>
        </button>
        <button className="flex flex-col items-center py-1 px-3 text-gray-600">
          <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-[10px]">チャット</span>
        </button>
        <button className="flex flex-col items-center py-1 px-3 text-gray-600">
          <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px]">動画</span>
        </button>
      </div>
    </div>
    </div>
  );
}
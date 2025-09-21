"use client";
const progress = 50; // 数値（%）
export default function () {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen w-full  relative bg-gray-100">
        {/* メインコンテンツ */}
          <div className="flex flex-col w-120 z-10 h-screen items-center bg-white">
          {/* 進捗 */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          {/* sign up */}
            <div className="flex flex-col items-center w-full ml-4">
              <span className="text-amber-500 font-semibold">Sign Up</span>
            </div>
          {/* メールアドレス */}
            <div className="flex flex-row items-start justify-start w-full">
              <span className="items-start">Email</span>
            </div>
            <div className="flex flex-col items-center w-full">
              <input
              type="Email"
              name="Email"
              placeholder="example@email.com"
              className="input input-bordered" />
            </div>
          {/* パスワード */}
            <div className="flex flex-col items-center w-full">
              <input
              type="password"
              name="Password"
              placeholder="example1234"
              className="input input-bordered" />
            </div>















          </div>
      </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
        )
}
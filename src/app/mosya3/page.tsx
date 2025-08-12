"use client";
import { FcGoogle } from "react-icons/fc";   // Google (カラー)
import { FaFacebook } from "react-icons/fa"; // Facebook (青)
import { FaTwitter } from "react-icons/fa";  // Twitter (青)


export default function () {
  return(
    <>
    <div className="flex flex-col items-center h-200 relative rounded-b-4xl">
      {/* メインコンテンツ */}
      <div className="flex flex-col items-center w-100 h-screen bg-gray-50 border-2 border-gray-100 rounded-t-3xl rounded-b-3xl">
        {/* タイトル */}
        <div className="flex flex-col items-start w-full h-40 justify-center bg-white border-2 border-gray-100 shadow-[0_8px_10px_rgba(1,1,1,0.1)] rounded-br-[30%] rounded-t-3xl">
          <span className="text-7xl mt-8 ml-8 tracking-wide text-indigo-400">ioFit</span>
          <span className="opacity-30 font-semibold ml-8 mt-4 mb-4 not-first:tracking-normal">It's good to see you again</span>
        </div>

        <div className="flex flex-col items-center s-justify-center w-full mt-8">
          {/* メールアドレス */}
          <div className="flex flex-col items-start w-85 p-4 rounded-lg">
            <span className="opacity-39 ml-4">Email</span>
            <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            className="rounded-[50px] h-12 w-full border-2 bg-white border-gray-200 shadow-md pl-6"
            />

          <div className="flex flex-col items-center justify-center w-full mt-4">
          {/* パスワード */}
          <div className="flex flex-col items-start w-full">
            <span className="opacity-39 ml-4">Password</span>
            <input
            type="password"
            name="password"
            placeholder="example1234"
            className="rounded-[50px] h-12 w-full border-2 bg-white border-gray-200 shadow-md pl-6"
            />
          </div>

          {/* サインイン */}
            <div className="flex flex-col items-center w-full">
              <button className="btn w-full h-13 border-2 mt-8 rounded-4xl bg-gradient-to-r from-indigo-400 to-indigo-600 text-white text-xlitems-center">Sign in</button>
            </div>
          </div>

        <div className="flex flex-col items-center justify-center w-full">
            {/* パスワードを忘れた */}
          <div className="flex flex-col items-center w-full">
              <span className="opacity-40 mt-4 mb-4">Forgot Passwprd</span>
            </div>

          {/* 他SNSアイコン */}
            <div className="grid grid-cols-3 w-60 h-16 border-gray-300 items-center">
          {/* 左端 Facebook */}
            <div className="flex justify-start pl-4">
              <button className="flex items-center justify-center w-12 h-12 box-border rounded-2xl bg-[#1877F2] text-white text-2xl hover:opacity-80">
                <FaFacebook />
              </button>
            </div>

          {/* 中央 Google */}
            <div className="flex justify-center">
              <button className="flex items-center justify-center w-12 h-12 box-border rounded-2xl bg-white border border-gray-300 text-2xl hover:opacity-80">
                <FcGoogle />
              </button>
            </div>

          {/* 右端 Twitter */}
            <div className="flex justify-end pr-4">
              <button className="flex items-center justify-center w-12 h-12 box-border rounded-2xl bg-[#1DA1F2] text-white text-2xl hover:opacity-80">
                <FaTwitter />
              </button>
            </div>
          </div>
        </div>

          {/* 新規登録 */}
            <div className="flex flex-col items-center w-full">
              <button className="btn w-full h-13 border-2 mt-12 rounded-4xl bg-gray-200 text-indigo-400 border-indigo-400 text-xlitems-center">
                <span>Sign Up</span>
              </button>
            </div>






          </div>
        </div>
        




















      </div>
    </div>
    </>
  )
}
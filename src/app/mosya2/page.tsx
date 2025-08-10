"use client";
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook} from 'react-icons/fa';

export default function () {
  return(
    <>
    <div className="flex flex-col items-center min-h-screen relative">
      {/* 背景レイヤー */}
      <div className="flex flex-col items-center w-full absolute inset-0 z-0 bg-white"></div>

     {/* メインコンテンツレイヤー */}
      <div className="flex flex-col items-center w-120 justify-center inset-0 z-10 md:justify-start bg-white border-2 border-gray-200 h-screen">
        <div className="flex flex-col items-center w-full p-4 ">
          {/* タイトル */}
          <div className="flex flex-col items-center w-full space-y-4 mt-20">
            <span className="text-black text-4xl font-bold">アカウントを新規作成</span>
            <div className="flex flex-col items-center w-full text-gray-300 text-2xlxl">
              <span>Fill your infortion below or register</span>
              <span>with your social account</span>
            </div>
          </div>

          <div className="flex flex-col items-center w-full">
          {/* メールアドレス */}
          <div className="flex flex-col items-start w-full">
            <span>Email</span>
            <input
            type="email"
            placeholder="example@gmail.com"
            className ="w-full border-2 input input-bordered mt-2" />
          </div>
          </div>

          <div className="flex flex-col items-center w-full">
          {/* パスワード */}
          <div className="flex flex-col items-start w-full mt-10">
            <span>Password</span>
            <input
            type="password"
            placeholder="example1234"
            className="input input-bordered w-full border-2  mt-2" />
          </div>
          </div>

          <div className="flex flex-row items-center w-full mt-2">
            {/* チェックボックス */}
            <div className="flex flex-row items-start w-full mt-3">
              <input type="checkbox" className="checkbox" /><p className="font-semibold"><span className="text-teal-500 underline mr-1 ml-2">利用規約</span>に同意する</p>
            </div>
          </div>

          <div className="flex flex-col items-center w-full">
            {/* 新規登録ボタン */}
            <div className="flex flex-col items-center w-full">
              <button className="border-2 rounded-4xl bg-teal-300 p-3 m-7 mt-10 mb-10 font-semibold w-80 text-white">新規登録</button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full">
            {/* 仕切り */}
            <div className="flex flex-row items-center w-full">
              <div className="flex-grow border-t border-gray-200 ml-10 mr-5"></div>
              <span className="opacity-30">Or sign in with</span>
              <div className="flex-grow border-t border-gray-200 mr-10 ml-5"></div>
            </div>
          </div>
          

        <div className="flex flex-row items-center justify-center w-full">
          {/* 他ログインアイコン */}
          <div className="flex flex-row items-center justify-center w-full mt-20 ">
            {/* Appleアイコン */}
            <button className="flex flex-row items-center border-2 border-gray-300  rounded-full p-3 mr-10"><FaApple size={40} className="flex flex-row items-center "/></button>
            {/* Googleアイコン */}
            <button className="flex flex-row items-center border-2 border-gray-300 rounded-full p-3"><FcGoogle size={40} className="flex flex-row items-center"/></button>
            {/* Facebookアイコン */}
            <button className="flex flex-row items-center border-2 border-gray-300 rounded-full p-3 ml-10"><FaFacebook size={40} className="flex flex-row items-center"/></button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center w-full mb-20">
          {/* ログイン促し */}
          <div className="flex flex-row items-center justify-center w-full mt-20">
            <p className="font-semibold">すでにアカウントを持っていますか？<span className="font-semibold text-teal-500 underline">ログイン</span></p>
          </div>
        </div>
        </div>
      </div>
    </div>
    
    </>
  )
}
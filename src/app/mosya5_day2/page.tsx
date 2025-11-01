"use client"

export default function () {
  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center  bg-slate-50 w-full p-6">
      <div className="flex flex-col items-center justify-center  w-full max-w-sm  bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h1 className="font-bold">Create account</h1>

        <span className="block w-full text-left text-sm text-slate-700">Email</span>
          <input type="email"
                  className="mt-1 w-full border rounded-xl px-3 py-2"
                  placeholder="example1234@gmail.com"/>

        <span className="block mt-1 text-left text-sm w-full text-slate-700">Password</span>
          <input type="password"
                  className="px-3 py-2 border rounded-xl mt-1 w-full"
                  placeholder="example1234" />
                  <span className="w-full block text-left text-sm text-slate-500 mt-1">Use at least 8 characters.</span>

                  <button className=" w-full text-white border rounded-xl py-2 px-3 my-3 bg-indigo-600 hover:bg-indigo-700 transition">Sign Up</button>

                  <span className="text-sm text-slate-400 w-full block text-left">Day 2</span>
      </div>
    </div>
  )
}
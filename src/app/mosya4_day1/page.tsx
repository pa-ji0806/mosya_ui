'use client'

export default function () {
  return(
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-5">
        <h1 className="text-lg font-medium text-slate-900">Sign In</h1>

        <form className="mt-4 space-y-3">
          <label className="block"><span className="text-sm text-slate-700">Email</span>
          <input type="email"
                  placeholder="you@axample.com"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:ring-indigo-200 focus:ring-2 focus:border-indigo-500"
                  />
                  </label>

                  <button
                  type="button"
                  className="w-full rounded-lg bg-indigo-600 py-2 text-white font-midium hover:bg-indigo-700 transition"
                  >Continue
                  </button>
                  
        </form>

        <p className="mt-4 text-xs text-slate-500">Day 1 mosya 10/16</p>
      </div>
    </div>
  )
      
}
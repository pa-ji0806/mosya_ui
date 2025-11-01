'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function Day3PasswordToggleIcon() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center bg-slate-50 w-full p-6">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-5 shadow-md">
        <h1 className="text-lg font-bold text-slate-900">Create account</h1>

        <form className="mt-4 space-y-3">
          {/* Email */}
          <label className="block">
            <span className="text-sm text-slate-700">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </label>

          {/* Password */}
          <label className="block">
            <span className="text-sm text-slate-700">Password</span>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full border rounded-lg px-3 py-2 pr-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-3 flex items-center text-slate-600 hover:text-indigo-600 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </label>

          <p className="text-xs text-slate-500">Use at least 8 characters.</p>

          <button
            type="button"
            className="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500">Day 3.5 — Password Toggle (DaisyUI + Eye Icon)</p>
      </div>
    </div>
  )
}

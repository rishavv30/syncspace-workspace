import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      await login(form)

      toast.success('Welcome to SyncSpace')

      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center px-4 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-400/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md animate-slide-up">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-[0_0_40px_rgba(0,255,255,0.25)]">
              S
            </div>

            <span className="font-display font-black text-4xl tracking-tight text-white">
              SyncSpace
            </span>
          </div>

          <p className="text-slate-400 text-sm tracking-wide">
            Smart collaboration workspace
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.45)]">

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Welcome back
            </h1>

            <p className="text-slate-400 text-sm mt-2">
              Access your projects and team workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300 mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
                placeholder="you@workspace.com"
                value={form.email}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
                autoFocus
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-300 mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
                placeholder="••••••••"
                value={form.password}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.01] hover:shadow-cyan-500/20 transition-all duration-300 disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                'Enter Workspace'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-slate-400">
            New to SyncSpace?{' '}

            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-5 text-center">
          <p className="text-xs text-slate-600 tracking-wide">
            Secure cloud workspace · Real-time collaboration · Team productivity
          </p>
        </div>
      </div>
    </div>
  )
}
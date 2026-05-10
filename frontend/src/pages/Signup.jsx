import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const AVATARS = [
  '👨🏻‍💻',
  '👩🏻‍💻',
  '🧑🏻‍🚀',
  '🧑🏻‍🎨',
  '👨🏻‍💼',
  '👩🏻‍💼',
  '🧑🏻‍🔬',
  '🦊',
  '🐼',
  '🦉',
  '🐯',
  '🐬',
  '🦋',
]

export default function Signup() {
  const { signup } = useAuth()

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
    avatar: '👨🏻‍💻',
  })

  const [loading, setLoading] = useState(false)
  const [showAvatars, setShowAvatars] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password.length < 6) {
      toast.error(
        'Password must contain at least 6 characters'
      )
      return
    }

    setLoading(true)

    try {
      await signup(form)

      toast.success('Workspace account created')

      navigate('/dashboard')
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          'Unable to create account'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center px-4 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-120px] right-[-100px] w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] left-[-80px] w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-400/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Main */}
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
            Create your collaborative workspace account
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.45)]">

          <div className="mb-8">

            <h1 className="text-3xl font-black text-white tracking-tight">
              Create Account
            </h1>

            <p className="text-slate-400 text-sm mt-2">
              Join your intelligent productivity workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Avatar */}
            <div>

              <label className="block text-sm text-slate-300 mb-3 font-medium">
                Choose Avatar
              </label>

              <div className="flex items-center gap-4 flex-wrap">

                <button
                  type="button"
                  onClick={() =>
                    setShowAvatars(!showAvatars)
                  }
                  className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-3xl hover:border-cyan-400/40 transition-all"
                >
                  {form.avatar}
                </button>

                {showAvatars && (
                  <div className="flex flex-wrap gap-2">

                    {AVATARS.map(av => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => {
                          setForm(prev => ({
                            ...prev,
                            avatar: av,
                          }))

                          setShowAvatars(false)
                        }}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                          form.avatar === av
                            ? 'bg-cyan-500/15 border border-cyan-400 scale-110'
                            : 'bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 hover:scale-105'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div>

              <label className="block text-sm text-slate-300 mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Alex Morgan"
                value={form.name}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>

              <label className="block text-sm text-slate-300 mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@workspace.com"
                value={form.email}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>

              <label className="block text-sm text-slate-300 mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
                required
              />
            </div>

            {/* Role */}
            <div>

              <label className="block text-sm text-slate-300 mb-2 font-medium">
                Workspace Role
              </label>

              <select
                value={form.role}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
              >
                <option
                  value="member"
                  className="bg-slate-900"
                >
                  Team Member
                </option>

                <option
                  value="admin"
                  className="bg-slate-900"
                >
                  Workspace Admin
                </option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.01] hover:shadow-cyan-500/20 transition-all duration-300 disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">

                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                  Creating Workspace...
                </div>
              ) : (
                'Create Workspace Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-slate-400">

            Already have an account?{' '}

            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-5 text-center">

          <p className="text-xs text-slate-600 tracking-wide">
            Cloud workspace · Team collaboration · Smart productivity
          </p>
        </div>
      </div>
    </div>
  )
}
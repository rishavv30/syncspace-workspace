import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { usersAPI } from '../services/api'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

const AVATARS = [
  '👨🏻‍💻',
  '👩🏻‍💻',
  '🧑🏻‍🚀',
  '🧑🏻‍🎨',
  '👨🏻‍💼',
  '👩🏻‍💼',
  '🧑🏻‍🔬',
  '👨🏻‍🚀',
  '🦊',
  '🐼',
  '🦉',
  '🐯',
  '🐬',
  '🦋',
  '🐺',
]

export default function Profile() {

  const { user, updateUser } =
    useAuth()

  const [form, setForm] =
    useState({
      name: user?.name || '',
      avatar:
        user?.avatar || '👨🏻‍💻',
    })

  const [loading, setLoading] =
    useState(false)

  const handleSave = async e => {

    e.preventDefault()

    setLoading(true)

    try {

      const { data } =
        await usersAPI.updateMe(
          form
        )

      updateUser(data)

      toast.success(
        'Workspace profile updated'
      )

    } catch (err) {

      toast.error(
        err.response?.data?.detail ||
          'Unable to update profile'
      )

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

      <div className="px-4 py-5 sm:px-6 lg:px-10 lg:py-10 max-w-3xl mx-auto animate-fade-in">

        {/* Header */}
        <div className="mb-8 sm:mb-10">

          <p className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-semibold mb-3">
            Account Settings
          </p>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight break-words">
            Profile Workspace
          </h1>

          <p className="text-slate-400 mt-3 max-w-xl leading-relaxed text-sm sm:text-base">
            Manage your personal workspace information,
            profile identity,
            and collaboration settings.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.35)] overflow-hidden">

          {/* Current User */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-8 border-b border-white/10 mb-8">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center text-5xl shadow-lg flex-shrink-0">
              {form.avatar}
            </div>

            {/* Info */}
            <div className="min-w-0">

              <h2 className="text-2xl font-bold text-white tracking-tight break-words">
                {user?.name}
              </h2>

              <p className="text-slate-400 text-sm mt-1 break-all">
                {user?.email}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                    user?.role ===
                    'admin'
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/20'
                      : 'bg-slate-700/40 text-slate-300 border border-slate-600/30'
                  }`}
                >
                  {user?.role ===
                  'admin'
                    ? 'Workspace Admin'
                    : 'Team Member'}
                </span>

                <span className="text-xs text-slate-500">
                  Joined{' '}
                  {user?.created_at
                    ? format(
                        new Date(
                          user.created_at
                        ),
                        'MMMM d, yyyy'
                      )
                    : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSave}
            className="space-y-8"
          >

            {/* Name */}
            <div>

              <label className="block text-sm text-slate-300 mb-3 font-medium">
                Display Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    name:
                      e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
                placeholder="Enter your display name"
                required
              />
            </div>

            {/* Avatar Grid */}
            <div>

              <label className="block text-sm text-slate-300 mb-4 font-medium">
                Choose Avatar
              </label>

              <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 gap-3">

                {AVATARS.map(av => (
                  <button
                    key={av}
                    type="button"
                    onClick={() =>
                      setForm(prev => ({
                        ...prev,
                        avatar: av,
                      }))
                    }
                    className={`aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
                      form.avatar ===
                      av
                        ? 'bg-cyan-500/15 border-2 border-cyan-400 scale-110 shadow-lg shadow-cyan-500/10'
                        : 'bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 hover:scale-105'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.02] hover:shadow-cyan-500/20 transition-all duration-300 disabled:opacity-70"
              >
                {loading ? (

                  <div className="flex items-center justify-center gap-3">

                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                    Saving Changes...
                  </div>

                ) : (
                  'Save Workspace Profile'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] backdrop-blur-xl p-5">

          <p className="text-sm text-slate-400 leading-relaxed">
            Workspace email address and permission roles
            are controlled by organization administrators
            and cannot be modified from personal settings.
          </p>
        </div>
      </div>
    </div>
  )
}
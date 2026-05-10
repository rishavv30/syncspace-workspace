import { useState, useEffect } from 'react'
import { usersAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function Team() {
  const { isAdmin, user: me } = useAuth()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')

  const load = () =>
    usersAPI
      .list()
      .then(r => setUsers(r.data))
      .finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  const handleRoleChange = async (
    userId,
    role
  ) => {
    try {
      await usersAPI.updateRole(userId, {
        role,
      })

      toast.success(
        'Workspace role updated'
      )

      load()
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          'Unable to update role'
      )
    }
  }

  const handleDeactivate = async (
    userId
  ) => {
    const confirmed = confirm(
      'Deactivate this workspace member?'
    )

    if (!confirmed) return

    try {
      await usersAPI.deactivate(userId)

      toast.success(
        'Workspace member deactivated'
      )

      load()
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          'Unable to deactivate user'
      )
    }
  }

  const filtered = users.filter(
    u =>
      u.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      u.email
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">

        <div className="flex items-center gap-3 text-cyan-300">

          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />

          Loading collaboration hub...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

      <div className="p-6 lg:p-10 max-w-6xl mx-auto animate-fade-in">

        {/* Header */}
        <div className="mb-8">

          <p className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-semibold mb-3">
            Collaboration Center
          </p>

          <h1 className="text-4xl font-black text-white tracking-tight">
            Team Workspace
          </h1>

          <p className="text-slate-400 mt-3">
            {users.length} active collaborator
            {users.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 mb-8 shadow-xl">

          <input
            type="text"
            placeholder="Search collaborators..."
            value={search}
            onChange={e =>
              setSearch(e.target.value)
            }
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
          />
        </div>

        {/* Users */}
        <div className="space-y-4">

          {filtered.map(u => (
            <div
              key={u.id}
              className={`group rounded-3xl border backdrop-blur-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                !u.is_active
                  ? 'opacity-40 border-red-400/20 bg-red-500/[0.03]'
                  : 'border-white/10 bg-white/[0.04] hover:border-cyan-400/30'
              }`}
            >

              <div className="flex items-center gap-5 flex-wrap">

                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                  {u.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-[220px]">

                  <div className="flex items-center flex-wrap gap-3">

                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {u.name}
                    </h3>

                    {u.id === me?.id && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                        You
                      </span>
                    )}

                    {!u.is_active && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-300 border border-red-400/20">
                        Inactive
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-400 mt-1">
                    {u.email}
                  </p>

                  <div className="flex items-center gap-4 mt-3 flex-wrap">

                    <span className="text-xs text-slate-500">
                      Joined{' '}
                      {format(
                        new Date(u.created_at),
                        'MMM d, yyyy'
                      )}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.role === 'admin'
                          ? 'bg-purple-500/10 text-purple-300 border border-purple-400/20'
                          : 'bg-slate-500/10 text-slate-300 border border-slate-400/20'
                      }`}
                    >
                      {u.role === 'admin'
                        ? 'Workspace Admin'
                        : 'Team Member'}
                    </span>
                  </div>
                </div>

                {/* Admin Controls */}
                <div className="flex items-center gap-3 flex-wrap">

                  {isAdmin &&
                  u.id !== me?.id ? (
                    <>
                      {/* Role */}
                      <select
                        value={u.role}
                        onChange={e =>
                          handleRoleChange(
                            u.id,
                            e.target.value
                          )
                        }
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 outline-none focus:border-cyan-400/40 transition-all"
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

                      {/* Deactivate */}
                      {u.is_active && (
                        <button
                          onClick={() =>
                            handleDeactivate(u.id)
                          }
                          className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20 transition-all"
                        >
                          Deactivate
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-sm text-slate-500">
                      Collaboration Member
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Non-admin Info */}
        {!isAdmin && (
          <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 text-center">

            <p className="text-sm text-slate-400 leading-relaxed">
              Workspace permissions and collaborator
              management are controlled by
              organization administrators.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
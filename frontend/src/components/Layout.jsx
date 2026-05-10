import {
  Outlet,
  NavLink,
  useNavigate,
} from 'react-router-dom'

import {
  useState,
  useEffect,
} from 'react'

import { useAuth } from '../context/AuthContext'

import toast from 'react-hot-toast'

const NAV = [
  {
    to: '/dashboard',
    icon: '⚡',
    label: 'Dashboard',
  },
  {
    to: '/projects',
    icon: '📁',
    label: 'Projects',
  },
  {
    to: '/tasks',
    icon: '✅',
    label: 'My Tasks',
  },
  {
    to: '/team',
    icon: '👥',
    label: 'Team',
  },
]

export default function Layout() {
  const {
    user,
    logout,
    isAdmin,
  } = useAuth()

  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const handleLogout = () => {
    logout()

    toast.success('Signed out')

    navigate('/login')
  }

  /* Auto close on resize */
  useEffect(() => {
    const closeSidebar = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener(
      'resize',
      closeSidebar
    )

    return () =>
      window.removeEventListener(
        'resize',
        closeSidebar
      )
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[270px] sm:w-72
          flex flex-col
          border-r border-white/10
          bg-slate-950/70
          backdrop-blur-2xl
          shadow-2xl
          transition-transform duration-300 ease-out
          ${
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >

        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black shadow-lg">
              S
            </div>

            <span className="font-display font-black text-2xl tracking-tight text-cyan-300">
              SyncSpace
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">

          <div className="space-y-1">

            {NAV.map(
              ({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={({
                    isActive,
                  }) =>
                    `
                    flex items-center gap-3
                    px-4 py-3
                    rounded-2xl
                    text-sm font-semibold
                    transition-all duration-300

                    ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/20 shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                    }
                  `
                  }
                >
                  <span className="text-lg">
                    {icon}
                  </span>

                  {label}
                </NavLink>
              )
            )}
          </div>

          {/* Admin */}
          {isAdmin && (
            <div className="mt-6 pt-5 border-t border-white/10">

              <p className="px-3 mb-3 text-[11px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
                Administration
              </p>

              <NavLink
                to="/team"
                onClick={() =>
                  setSidebarOpen(false)
                }
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-purple-300 hover:bg-purple-500/10 transition-all"
              >
                <span>
                  🛡️
                </span>

                Manage Team
              </NavLink>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10">

          <div
            onClick={() => {
              navigate('/profile')

              setSidebarOpen(false)
            }}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/[0.05] cursor-pointer transition-all"
          >

            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-lg flex-shrink-0">
              {user?.avatar || '👤'}
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-sm font-semibold text-white truncate">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500 capitalize">
                {user?.role}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-2xl border border-red-400/10 bg-red-500/5 px-4 py-3 text-sm font-medium text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <span>
              →
            </span>

            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="w-10 h-10 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white transition-all"
          >
            ☰
          </button>

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-sm font-black">
              S
            </div>

            <span className="font-display font-black text-lg text-cyan-300">
              SyncSpace
            </span>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
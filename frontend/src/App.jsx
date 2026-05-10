import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import {
  AuthProvider,
  useAuth,
} from './context/AuthContext'

import Layout from './components/Layout'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Tasks from './pages/Tasks'
import Team from './pages/Team'
import Profile from './pages/Profile'

function AppLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center overflow-hidden relative">

      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Loader */}
      <div className="relative flex flex-col items-center gap-6 animate-fade-in">

        <div className="relative">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,255,0.25)]">

            <span className="text-3xl font-black text-white">
              S
            </span>
          </div>

          <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-3xl animate-ping" />
        </div>

        <div className="text-center">

          <h1 className="text-3xl font-black tracking-tight text-white">
            SyncSpace
          </h1>

          <p className="text-slate-400 text-sm mt-2 tracking-wide">
            Initializing collaborative workspace...
          </p>
        </div>

        <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <AppLoader />
  }

  return user ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
  )
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <AppLoader />
  }

  return user ? (
    <Navigate
      to="/dashboard"
      replace
    />
  ) : (
    children
  )
}

function AppRoutes() {
  return (
    <Routes>

      {/* Root */}
      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      {/* Public */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetail />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/team"
          element={<Team />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
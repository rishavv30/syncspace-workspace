import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { tasksAPI, projectsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { format, isPast, isToday } from 'date-fns'

function StatCard({ label, value, color, icon }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 flex items-center gap-4 shadow-xl hover:scale-[1.02] transition-all duration-300">

      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0 ${color}`}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-3xl font-black text-white tracking-tight truncate">
          {value}
        </p>

        <p className="text-sm text-slate-400 mt-1">
          {label}
        </p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.03] to-transparent pointer-events-none" />
    </div>
  )
}

function priorityColor(p) {
  return {
    urgent:
      'text-red-400 bg-red-400/10 border border-red-400/20',

    high:
      'text-orange-400 bg-orange-400/10 border border-orange-400/20',

    medium:
      'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20',

    low:
      'text-slate-400 bg-slate-400/10 border border-slate-400/20',
  }[p] || ''
}

function statusColor(s) {
  return {
    todo:
      'text-slate-300 bg-slate-400/10',

    in_progress:
      'text-cyan-300 bg-cyan-400/10',

    in_review:
      'text-purple-300 bg-purple-400/10',

    done:
      'text-green-300 bg-green-400/10',
  }[s] || ''
}

function statusLabel(s) {
  return {
    todo: 'To Do',
    in_progress: 'In Progress',
    in_review: 'In Review',
    done: 'Done',
  }[s] || s
}

export default function Dashboard() {
  const { user } = useAuth()

  const [stats, setStats] = useState(null)

  const [myTasks, setMyTasks] = useState([])

  const [projects, setProjects] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    Promise.all([
      tasksAPI.dashboard(),
      tasksAPI.myTasks(),
      projectsAPI.list(),
    ])
      .then(([s, t, p]) => {

        setStats(s.data)

        setMyTasks(t.data.slice(0, 8))

        setProjects(p.data.slice(0, 4))
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

        <div className="flex items-center gap-3 text-cyan-300">

          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />

          <span className="tracking-wide">
            Loading workspace...
          </span>
        </div>
      </div>
    )
  }

  const hour = new Date().getHours()

  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour < 17
      ? 'Good Afternoon'
      : 'Good Evening'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

      <div className="px-4 py-5 sm:px-6 lg:px-10 lg:py-10 max-w-7xl mx-auto space-y-8 lg:space-y-10 animate-fade-in">

        {/* Header */}
        <div className="space-y-3">

          <p className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-semibold">
            {greeting}
          </p>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight break-words">
            {user?.avatar} {user?.name}
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Welcome to SyncSpace —
            your intelligent workspace
            for projects,
            collaboration, and
            productivity tracking.
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">

            <StatCard
              label="Projects"
              value={stats.total_projects}
              icon="◉"
              color="bg-cyan-500/10 text-cyan-300"
            />

            <StatCard
              label="Total Tasks"
              value={stats.total_tasks}
              icon="◈"
              color="bg-blue-500/10 text-blue-300"
            />

            <StatCard
              label="Completed"
              value={stats.completed_tasks}
              icon="▲"
              color="bg-green-500/10 text-green-300"
            />

            <StatCard
              label="In Progress"
              value={stats.in_progress_tasks}
              icon="✦"
              color="bg-yellow-500/10 text-yellow-300"
            />

            <StatCard
              label="To Do"
              value={stats.todo_tasks}
              icon="◆"
              color="bg-slate-500/10 text-slate-300"
            />

            <StatCard
              label="Overdue"
              value={stats.overdue_tasks}
              icon="⬤"
              color="bg-red-500/10 text-red-300"
            />
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Tasks */}
          <div className="xl:col-span-2">

            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">

              <h2 className="text-2xl font-bold text-white tracking-tight">
                My Tasks
              </h2>

              <Link
                to="/tasks"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-3">

              {myTasks.length === 0 ? (

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 text-center">

                  <p className="text-4xl mb-3">
                    ✦
                  </p>

                  <p className="text-slate-400">
                    No tasks assigned yet.
                  </p>
                </div>

              ) : (

                myTasks.map(task => {

                  const isOverdue =
                    task.due_date &&
                    isPast(
                      new Date(task.due_date)
                    ) &&
                    task.status !== 'done'

                  const isDueToday =
                    task.due_date &&
                    isToday(
                      new Date(task.due_date)
                    )

                  return (
                    <div
                      key={task.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-lg p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-cyan-400/30 hover:translate-x-1 transition-all duration-300 overflow-hidden"
                    >

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${statusColor(
                          task.status
                        )}`}
                      >
                        {statusLabel(
                          task.status
                        )}
                      </span>

                      <div className="flex-1 min-w-0">

                        <p
                          className={`text-sm font-medium break-words ${
                            task.status ===
                            'done'
                              ? 'line-through text-slate-500'
                              : 'text-white'
                          }`}
                        >
                          {task.title}
                        </p>

                        {task.project && (
                          <p className="text-xs text-slate-500 mt-1 truncate">
                            {
                              task.project.name
                            }
                          </p>
                        )}
                      </div>

                      <div className="flex items-center flex-wrap gap-2 sm:gap-3 flex-shrink-0">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>

                        {task.due_date && (
                          <span
                            className={`text-xs font-mono ${
                              isOverdue
                                ? 'text-red-400'
                                : isDueToday
                                ? 'text-yellow-400'
                                : 'text-slate-500'
                            }`}
                          >
                            {isOverdue
                              ? '⚠ '
                              : ''}

                            {format(
                              new Date(
                                task.due_date
                              ),
                              'MMM d'
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Projects */}
          <div>

            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">

              <h2 className="text-2xl font-bold text-white tracking-tight">
                Projects
              </h2>

              <Link
                to="/projects"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-4">

              {projects.length === 0 ? (

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 text-center">

                  <p className="text-4xl mb-3">
                    ◉
                  </p>

                  <p className="text-slate-400">
                    No projects available.
                  </p>
                </div>

              ) : (

                projects.map(p => {

                  const pct =
                    p.task_count > 0
                      ? Math.round(
                          (
                            p.completed_count /
                            p.task_count
                          ) *
                            100
                        )
                      : 0

                  return (
                    <Link
                      key={p.id}
                      to={`/projects/${p.id}`}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 block hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300"
                    >

                      <div className="flex items-center gap-3 mb-4">

                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{
                            background:
                              p.color,
                          }}
                        />

                        <p className="font-medium text-white truncate">
                          {p.name}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">

                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                            style={{
                              width: `${pct}%`,
                            }}
                          />
                        </div>

                        <span className="text-xs text-slate-400 font-mono flex-shrink-0">
                          {pct}%
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 mt-3 break-words">
                        {p.task_count} tasks ·{' '}
                        {p.members.length}{' '}
                        members
                      </p>
                    </Link>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
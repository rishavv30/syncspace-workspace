import { useState, useEffect } from 'react'
import { tasksAPI } from '../services/api'
import { format, isPast, isToday } from 'date-fns'
import toast from 'react-hot-toast'
import TaskModal from '../components/TaskModal'

const STATUS_OPTS = [
  'all',
  'todo',
  'in_progress',
  'in_review',
  'done',
]

const PRIORITY_OPTS = [
  'all',
  'urgent',
  'high',
  'medium',
  'low',
]

function statusLabel(s) {
  return {
    todo: 'Backlog',
    in_progress: 'Active',
    in_review: 'Review',
    done: 'Completed',
  }[s]
}

function statusColor(s) {
  return {
    todo:
      'text-slate-300 bg-slate-400/10 border border-slate-400/20',

    in_progress:
      'text-cyan-300 bg-cyan-400/10 border border-cyan-400/20',

    in_review:
      'text-purple-300 bg-purple-400/10 border border-purple-400/20',

    done:
      'text-green-300 bg-green-400/10 border border-green-400/20',
  }[s]
}

function priorityColor(p) {
  return {
    urgent:
      'text-red-300 bg-red-400/10 border border-red-400/20',

    high:
      'text-orange-300 bg-orange-400/10 border border-orange-400/20',

    medium:
      'text-yellow-300 bg-yellow-400/10 border border-yellow-400/20',

    low:
      'text-slate-300 bg-slate-400/10 border border-slate-400/20',
  }[p]
}

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [filtered, setFiltered] = useState([])

  const [loading, setLoading] = useState(true)

  const [statusFilter, setStatusFilter] =
    useState('all')

  const [priorityFilter, setPriorityFilter] =
    useState('all')

  const [search, setSearch] = useState('')

  const [editTask, setEditTask] = useState(null)

  const [showModal, setShowModal] =
    useState(false)

  const load = () =>
    tasksAPI
      .myTasks()
      .then(r => setTasks(r.data))
      .finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    let res = tasks

    if (statusFilter !== 'all') {
      res = res.filter(
        t => t.status === statusFilter
      )
    }

    if (priorityFilter !== 'all') {
      res = res.filter(
        t => t.priority === priorityFilter
      )
    }

    if (search) {
      res = res.filter(t =>
        t.title
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }

    setFiltered(res)
  }, [
    tasks,
    statusFilter,
    priorityFilter,
    search,
  ])

  const handleStatusChange = async (
    task,
    status
  ) => {
    try {
      await tasksAPI.update(task.id, {
        status,
      })

      load()
    } catch {
      toast.error(
        'Unable to update task status'
      )
    }
  }

  const handleDelete = async (id) => {
    const confirmed = confirm(
      'Delete this task permanently?'
    )

    if (!confirmed) return

    try {
      await tasksAPI.delete(id)

      toast.success('Task removed')

      load()
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          'Unable to delete task'
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">

        <div className="flex items-center gap-3 text-cyan-300">

          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />

          Loading workspace tasks...
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
            Productivity Center
          </p>

          <h1 className="text-4xl font-black text-white tracking-tight">
            My Tasks
          </h1>

          <p className="text-slate-400 mt-3">
            {filtered.length} active task
            {filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 mb-8 shadow-xl flex flex-wrap gap-4 items-center">

          {/* Search */}
          <input
            type="text"
            placeholder="Search workspace tasks..."
            value={search}
            onChange={e =>
              setSearch(e.target.value)
            }
            className="flex-1 min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
          />

          {/* Status */}
          <select
            value={statusFilter}
            onChange={e =>
              setStatusFilter(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-300 outline-none focus:border-cyan-400/40 transition-all"
          >
            {STATUS_OPTS.map(s => (
              <option
                key={s}
                value={s}
                className="bg-slate-900"
              >
                {s === 'all'
                  ? 'All Status'
                  : statusLabel(s)}
              </option>
            ))}
          </select>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={e =>
              setPriorityFilter(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-300 outline-none focus:border-cyan-400/40 transition-all"
          >
            {PRIORITY_OPTS.map(p => (
              <option
                key={p}
                value={p}
                className="bg-slate-900"
              >
                {p === 'all'
                  ? 'All Priorities'
                  : p.charAt(0).toUpperCase() +
                    p.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Empty */}
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-16 text-center shadow-xl">

            <p className="text-6xl mb-5">
              ◈
            </p>

            <h3 className="text-3xl font-black text-white tracking-tight mb-3">
              No tasks available
            </h3>

            <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
              Assigned tasks and collaboration
              activity will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {filtered.map(task => {

              const isOverdue =
                task.due_date &&
                isPast(new Date(task.due_date)) &&
                task.status !== 'done'

              const isDueToday =
                task.due_date &&
                isToday(new Date(task.due_date))

              return (
                <div
                  key={task.id}
                  className={`group rounded-3xl border backdrop-blur-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    isOverdue
                      ? 'border-red-400/30 bg-red-500/[0.03]'
                      : 'border-white/10 bg-white/[0.04] hover:border-cyan-400/30'
                  }`}
                >

                  <div className="flex items-start gap-5 flex-wrap">

                    {/* Status */}
                    <select
                      value={task.status}
                      onChange={e =>
                        handleStatusChange(
                          task,
                          e.target.value
                        )
                      }
                      className={`rounded-xl px-3 py-2 text-xs font-semibold outline-none appearance-none ${statusColor(
                        task.status
                      )}`}
                    >
                      <option value="todo">
                        Backlog
                      </option>

                      <option value="in_progress">
                        Active
                      </option>

                      <option value="in_review">
                        Review
                      </option>

                      <option value="done">
                        Completed
                      </option>
                    </select>

                    {/* Main */}
                    <div className="flex-1 min-w-[240px]">

                      <h3
                        className={`text-lg font-semibold tracking-tight ${
                          task.status === 'done'
                            ? 'line-through text-slate-500'
                            : 'text-white'
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.description && (
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 mt-4">

                        {task.project && (
                          <span className="text-xs text-slate-500">
                            ◉ {task.project.name}
                          </span>
                        )}

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
                              ? '⚠ Overdue · '
                              : isDueToday
                              ? '◈ Today · '
                              : '◌ '}

                            {format(
                              new Date(
                                task.due_date
                              ),
                              'MMM d, yyyy'
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">

                      {/* Priority */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>

                      {/* Buttons */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                        <button
                          onClick={() => {
                            setEditTask(task)
                            setShowModal(true)
                          }}
                          className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition-all"
                        >
                          ✎
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(task.id)
                          }
                          className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-400/30 transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <TaskModal
            task={editTask}
            projectId={editTask?.project_id}
            members={[]}
            onClose={() =>
              setShowModal(false)
            }
            onSaved={() => {
              setShowModal(false)
              load()
            }}
            editOnly
          />
        )}
      </div>
    </div>
  )
}
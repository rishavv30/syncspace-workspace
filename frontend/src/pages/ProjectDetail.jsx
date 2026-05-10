import { useState, useEffect } from 'react'

import {
  useParams,
  useNavigate,
} from 'react-router-dom'

import {
  projectsAPI,
  tasksAPI,
  usersAPI,
} from '../services/api'

import { useAuth } from '../context/AuthContext'

import toast from 'react-hot-toast'

import TaskModal from '../components/TaskModal'
import TaskCard from '../components/TaskCard'

const STATUSES = [
  {
    key: 'todo',
    label: 'Backlog',
    icon: '◉',
    color:
      'text-slate-300 bg-slate-400/10 border-slate-400/20',
  },

  {
    key: 'in_progress',
    label: 'Active',
    icon: '✦',
    color:
      'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
  },

  {
    key: 'in_review',
    label: 'Review',
    icon: '◈',
    color:
      'text-purple-300 bg-purple-400/10 border-purple-400/20',
  },

  {
    key: 'done',
    label: 'Completed',
    icon: '▲',
    color:
      'text-green-300 bg-green-400/10 border-green-400/20',
  },
]

export default function ProjectDetail() {

  const { id } = useParams()

  const navigate = useNavigate()

  const { user, isAdmin } =
    useAuth()

  const [project, setProject] =
    useState(null)

  const [tasks, setTasks] =
    useState([])

  const [allUsers, setAllUsers] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [showTaskModal, setShowTaskModal] =
    useState(false)

  const [editTask, setEditTask] =
    useState(null)

  const [activeStatus, setActiveStatus] =
    useState(null)

  const [showMemberPanel, setShowMemberPanel] =
    useState(false)

  const loadProject = () =>
    projectsAPI
      .get(id)
      .then(r => setProject(r.data))

  const loadTasks = () =>
    tasksAPI
      .list({ project_id: id })
      .then(r => setTasks(r.data))

  useEffect(() => {

    Promise.all([
      loadProject(),
      loadTasks(),
      usersAPI
        .list()
        .then(r =>
          setAllUsers(r.data)
        ),
    ])
      .catch(() => {

        toast.error(
          'Unable to load workspace'
        )

        navigate('/projects')
      })
      .finally(() => setLoading(false))

  }, [id])

  const handleAddMember = async (
    userId
  ) => {
    try {

      await projectsAPI.addMember(id, {
        user_id: userId,
      })

      toast.success(
        'Collaborator added'
      )

      loadProject()

    } catch (err) {

      toast.error(
        err.response?.data?.detail ||
          'Failed to add collaborator'
      )
    }
  }

  const handleRemoveMember = async (
    userId
  ) => {
    try {

      await projectsAPI.removeMember(
        id,
        userId
      )

      toast.success(
        'Collaborator removed'
      )

      loadProject()

    } catch (err) {

      toast.error(
        err.response?.data?.detail ||
          'Failed to remove collaborator'
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">

        <div className="flex items-center gap-3 text-cyan-300">

          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />

          Loading workspace...
        </div>
      </div>
    )
  }

  if (!project) return null

  const canManage =
    isAdmin ||
    project.owner_id === user?.id

  const tasksByStatus =
    STATUSES.reduce((acc, s) => {

      acc[s.key] = tasks.filter(
        t => t.status === s.key
      )

      return acc

    }, {})

  const nonMembers =
    allUsers.filter(
      u =>
        !project.members.find(
          m => m.id === u.id
        )
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

      <div className="px-4 py-5 sm:px-6 lg:px-10 lg:py-10 max-w-[1700px] mx-auto animate-fade-in">

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6 mb-10">

          {/* Left */}
          <div className="min-w-0">

            <button
              onClick={() =>
                navigate('/projects')
              }
              className="mb-5 text-sm text-slate-500 hover:text-cyan-300 transition-colors"
            >
              ← Back to workspace
            </button>

            <div className="flex items-start gap-4">

              <div
                className="w-5 h-5 rounded-full shadow-lg mt-2 flex-shrink-0"
                style={{
                  background:
                    project.color,
                }}
              />

              <div className="min-w-0">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight break-words">
                  {project.name}
                </h1>

                {project.description && (
                  <p className="text-slate-400 mt-4 max-w-3xl leading-relaxed text-sm sm:text-base break-words">
                    {
                      project.description
                    }
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">

            {canManage && (
              <button
                onClick={() =>
                  setShowMemberPanel(
                    !showMemberPanel
                  )
                }
                className="w-full sm:w-auto rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-slate-300 hover:border-cyan-400/30 hover:bg-white/[0.05] transition-all"
              >
                Collaborators (
                {project.members.length}
                )
              </button>
            )}

            <button
              onClick={() => {

                setEditTask(null)

                setActiveStatus('todo')

                setShowTaskModal(true)
              }}
              className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              + Create Task
            </button>
          </div>
        </div>

        {/* Members */}
        {showMemberPanel && (
          <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 sm:p-6 shadow-xl animate-slide-up overflow-hidden">

            <h3 className="text-xl font-bold text-white mb-5">
              Workspace Collaborators
            </h3>

            {/* Current */}
            <div className="flex flex-wrap gap-3 mb-6">

              {project.members.map(m => (
                <div
                  key={m.id}
                  className="max-w-full flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 overflow-hidden"
                >

                  <span className="text-xl flex-shrink-0">
                    {m.avatar}
                  </span>

                  <div className="min-w-0">

                    <p className="text-sm text-white font-medium truncate">
                      {m.name}
                    </p>

                    <p className="text-xs text-slate-500 capitalize">
                      {m.role}
                    </p>
                  </div>

                  {canManage &&
                    m.id !==
                      project.owner_id && (
                      <button
                        onClick={() =>
                          handleRemoveMember(
                            m.id
                          )
                        }
                        className="ml-2 text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        ✕
                      </button>
                    )}
                </div>
              ))}
            </div>

            {/* Add */}
            {nonMembers.length > 0 && (
              <div>

                <p className="text-sm text-slate-400 mb-3">
                  Add collaborators
                </p>

                <div className="flex flex-wrap gap-3">

                  {nonMembers.map(u => (
                    <button
                      key={u.id}
                      onClick={() =>
                        handleAddMember(
                          u.id
                        )
                      }
                      className="max-w-full flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 hover:border-cyan-400/30 hover:bg-white/[0.05] transition-all overflow-hidden"
                    >

                      <span className="flex-shrink-0">
                        {u.avatar}
                      </span>

                      <span className="truncate">
                        {u.name}
                      </span>

                      <span className="text-cyan-400 flex-shrink-0">
                        +
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Kanban */}
        <div className="overflow-x-auto pb-2">

          <div className="flex xl:grid xl:grid-cols-4 gap-6 min-w-max xl:min-w-0">

            {STATUSES.map(status => (
              <div
                key={status.key}
                className="w-[320px] sm:w-[360px] xl:w-auto flex flex-col"
              >

                {/* Header */}
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl mb-4 ${status.color}`}
                >

                  <span className="text-lg">
                    {status.icon}
                  </span>

                  <span className="font-semibold text-sm">
                    {status.label}
                  </span>

                  <span className="ml-auto text-xs opacity-70 font-mono">
                    {
                      tasksByStatus[
                        status.key
                      ].length
                    }
                  </span>
                </div>

                {/* Tasks */}
                <div className="space-y-3 flex-1">

                  {tasksByStatus[
                    status.key
                  ].map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={() => {

                        setEditTask(task)

                        setShowTaskModal(
                          true
                        )
                      }}
                      onDelete={() => {

                        tasksAPI
                          .delete(task.id)
                          .then(() => {

                            toast.success(
                              'Task deleted'
                            )

                            loadTasks()
                          })
                      }}
                      onStatusChange={newStatus => {

                        tasksAPI
                          .update(task.id, {
                            status:
                              newStatus,
                          })
                          .then(loadTasks)
                      }}
                      canManage={
                        canManage ||
                        task.creator_id ===
                          user?.id
                      }
                    />
                  ))}

                  {/* Add */}
                  <button
                    onClick={() => {

                      setEditTask(null)

                      setActiveStatus(
                        status.key
                      )

                      setShowTaskModal(
                        true
                      )
                    }}
                    className="w-full rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-3 text-sm text-slate-500 hover:border-cyan-400/30 hover:text-cyan-300 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    + Add task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showTaskModal && (
          <TaskModal
            task={editTask}
            projectId={id}
            defaultStatus={activeStatus}
            members={project.members}
            onClose={() =>
              setShowTaskModal(false)
            }
            onSaved={() => {

              setShowTaskModal(false)

              loadTasks()
            }}
          />
        )}
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import ProjectModal from '../components/ProjectModal'

export default function Projects() {
  const { isAdmin, user } = useAuth()

  const [projects, setProjects] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [showModal, setShowModal] =
    useState(false)

  const [editProject, setEditProject] =
    useState(null)

  const load = () =>
    projectsAPI
      .list()
      .then(r => setProjects(r.data))
      .finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async id => {

    const confirmed = confirm(
      'Delete this workspace and all related tasks?'
    )

    if (!confirmed) return

    try {

      await projectsAPI.delete(id)

      toast.success(
        'Workspace deleted'
      )

      load()

    } catch (err) {

      toast.error(
        err.response?.data?.detail ||
          'Unable to delete workspace'
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">

        <div className="flex items-center gap-3 text-cyan-300">

          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />

          Loading workspaces...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

      <div className="px-4 py-5 sm:px-6 lg:px-10 lg:py-10 max-w-7xl mx-auto animate-fade-in">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

          <div className="min-w-0">

            <p className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-semibold mb-2">
              Workspace Hub
            </p>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight break-words">
              Projects
            </h1>

            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              {projects.length} active workspace
              {projects.length !== 1
                ? 's'
                : ''}
            </p>
          </div>

          <button
            onClick={() => {
              setEditProject(null)
              setShowModal(true)
            }}
            className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.02] hover:shadow-cyan-500/20 transition-all duration-300"
          >
            + Create Workspace
          </button>
        </div>

        {/* Empty */}
        {projects.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-10 sm:p-16 text-center shadow-xl">

            <p className="text-5xl sm:text-6xl mb-5">
              ◉
            </p>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              No workspaces available
            </h3>

            <p className="text-slate-400 max-w-md mx-auto leading-relaxed mb-8 text-sm sm:text-base">
              Create your first collaborative workspace
              to organize tasks, teams,
              and productivity.
            </p>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
            >
              + Create Workspace
            </button>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 lg:gap-6">

            {projects.map(project => {

              const pct =
                project.task_count > 0
                  ? Math.round(
                      (
                        project.completed_count /
                        project.task_count
                      ) * 100
                    )
                  : 0

              const canEdit =
                isAdmin ||
                project.owner_id === user?.id

              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 sm:p-6 shadow-xl hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >

                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.03] to-transparent pointer-events-none" />

                  {/* Top */}
                  <div className="flex items-start justify-between gap-4 mb-5 relative z-10">

                    <div className="flex items-start gap-4 min-w-0">

                      <div
                        className="w-5 h-5 rounded-full shadow-lg flex-shrink-0 mt-1"
                        style={{
                          background:
                            project.color,
                        }}
                      />

                      <div className="min-w-0">

                        <h3 className="text-lg font-bold text-white break-words">
                          {project.name}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          Workspace Project
                        </p>
                      </div>
                    </div>

                    {canEdit && (
                      <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">

                        <button
                          onClick={() => {
                            setEditProject(
                              project
                            )

                            setShowModal(
                              true
                            )
                          }}
                          className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition-all"
                        >
                          ✎
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              project.id
                            )
                          }
                          className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-400/30 transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {project.description && (
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3 relative z-10 break-words">
                      {
                        project.description
                      }
                    </p>
                  )}

                  {/* Progress */}
                  <div className="mt-auto relative z-10">

                    <div className="flex items-center justify-between gap-3 text-sm text-slate-400 mb-3 flex-wrap">

                      <span>
                        {
                          project.completed_count
                        }
                        /
                        {
                          project.task_count
                        }{' '}
                        tasks
                      </span>

                      <span className="font-mono">
                        {pct}%
                      </span>
                    </div>

                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-6">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                        }}
                      />
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                      {/* Members */}
                      <div className="flex -space-x-3 overflow-hidden">

                        {project.members
                          .slice(0, 5)
                          .map(m => (
                            <div
                              key={m.id}
                              title={m.name}
                              className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-sm shadow-lg flex-shrink-0"
                            >
                              {m.avatar}
                            </div>
                          ))}

                        {project.members.length >
                          5 && (
                          <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs text-slate-300 flex-shrink-0">
                            +
                            {project.members
                              .length - 5}
                          </div>
                        )}
                      </div>

                      {/* Open */}
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors break-words"
                      >
                        Open Workspace →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <ProjectModal
            project={editProject}
            onClose={() =>
              setShowModal(false)
            }
            onSaved={() => {
              setShowModal(false)

              load()
            }}
          />
        )}
      </div>
    </div>
  )
}
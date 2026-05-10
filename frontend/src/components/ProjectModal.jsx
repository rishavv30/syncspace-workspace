import { useState, useEffect } from 'react'
import { projectsAPI } from '../services/api'
import toast from 'react-hot-toast'

const COLORS = ['#06b6d4', '#0ea5e9', '#14b8a6', '#2563eb', '#0891b2', '#0284c7']

export default function ProjectModal({ project, onClose, onSaved }) {
  const editing = !!project
  const [form, setForm] = useState({
    name: project?.name || '',
    description: project?.description || '',
    color: project?.color || '#7c6aff',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editing) {
        await projectsAPI.update(project.id, form)
        toast.success('Project updated')
      } else {
        await projectsAPI.create(form)
        toast.success('Project created')
      }
      onSaved()
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl p-6 shadow-[0_0_60px_rgba(0,255,255,0.08)] animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-lg text-white">
            {editing ? 'Edit Project' : 'New Project'}
          </h2>
          <button onClick={onClose} className="btn-ghost text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Project Name *</label>
            <input
              type="text"
              className="input"
              placeholder="My awesome project"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              required
              autoFocus
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              className="input resize-none"
              rows={3}
              placeholder="What is this project about?"
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            />
          </div>

          <div>
            <label className="label">Color</label>
            <div className="flex gap-2 flex-wrap mt-1">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm(p => ({ ...p, color: c }))}
                  className={`w-8 h-8 rounded-full transition-all ${form.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-surface-1 scale-110' : 'hover:scale-105'}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center" disabled={loading}>
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {editing ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

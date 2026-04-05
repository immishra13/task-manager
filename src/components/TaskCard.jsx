import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Clock, Trash2, CheckCircle2, Circle, MoreHorizontal } from 'lucide-react';

const TaskCard = ({ task, onDelete, onToggle }) => {
  const isCompleted = task.status === 'completed';

  const priorityStyles = {
    low: { color: '#059669', bg: '#ecfdf5', dot: '#10b981' },
    medium: { color: '#d97706', bg: '#fffbeb', dot: '#f59e0b' },
    high: { color: '#dc2626', bg: '#fef2f2', dot: '#ef4444' }
  };

  const style = priorityStyles[task.priority] || priorityStyles.medium;

  return (
    <Motion.div 
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`task-card-premium ${isCompleted ? 'is-completed' : ''}`}
    >
      <div className="card-top">
        <div className="priority-tag" style={{ color: style.color, background: style.bg }}>
          <span className="dot" style={{ background: style.dot }} />
          {task.priority}
        </div>
        <button className="more-btn"><MoreHorizontal size={16} /></button>
      </div>

      <div className="card-middle">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-desc">{task.description}</p>
      </div>

      <div className="card-bottom">
        <div className="deadline-box">
          <Clock size={14} />
          <span>{task.deadline || 'No deadline'}</span>
        </div>
        <div className="card-actions">
          <button className={`action-btn check-btn ${isCompleted ? 'active' : ''}`} onClick={() => onToggle(task)}>
            {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
          </button>
          <button className="action-btn delete-btn" onClick={() => onDelete(task.id)}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .task-card-premium {
          background: white;
          padding: 24px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -2px rgba(0,0,0,0.02);
        }

        .task-card-premium:hover {
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05);
          border-color: #cbd5e1;
        }

        .task-card-premium.is-completed {
          background: #f8fafc;
          border-color: #f1f5f9;
        }

        .task-card-premium.is-completed .card-middle { opacity: 0.5; }
        .task-card-premium.is-completed .task-title { text-decoration: line-through; }

        .card-top { display: flex; justify-content: space-between; align-items: center; }
        .priority-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .dot { width: 6px; height: 6px; border-radius: 50%; }

        .more-btn { color: #94a3b8; background: transparent; border: none; cursor: pointer; }

        .card-middle { flex: 1; }
        .task-title { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
        .task-desc { 
          color: #64748b; 
          font-size: 0.9rem; 
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .deadline-box {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #94a3b8;
        }

        .card-actions { display: flex; gap: 8px; }
        .action-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid transparent;
          background: #f8fafc;
          color: #64748b;
          cursor: pointer;
          transition: 0.2s;
        }

        .check-btn:hover { background: #ecfdf5; color: #10b981; border-color: #d1fae5; }
        .check-btn.active { background: #10b981; color: white; }
        
        .delete-btn:hover { background: #fef2f2; color: #ef4444; border-color: #fee2e2; }
      `}} />
    </Motion.div>
  );
};

export default TaskCard;

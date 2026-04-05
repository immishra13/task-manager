import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, AlignLeft, Sparkles, Plus } from 'lucide-react';

const TaskModal = ({ onClose, onSubmit }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
    onClose();
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="modal-content-premium"
      >
        <div className="modal-header">
          <div className="header-title">
            <div className="icon-box-purple">
              <Sparkles size={18} />
            </div>
            <div>
              <h2>Create New Task</h2>
              <p>Add the details of your next big achievement.</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-premium">
          <div className="form-group-premium">
            <label>Task Title</label>
            <input 
              name="title"
              placeholder="e.g., Design System Review" 
              required 
              onChange={handleChange}
              value={taskData.title}
              autoFocus
            />
          </div>

          <div className="form-group-premium">
            <label>Description</label>
            <textarea 
              name="description"
              placeholder="What needs to be done? Add extra context here..." 
              onChange={handleChange}
              value={taskData.description}
            />
          </div>

          <div className="form-row-premium">
            <div className="form-group-premium">
              <label>Deadline</label>
              <div className="input-icon-wrapper">
                <Calendar size={16} className="input-icon" />
                <input 
                  type="date" 
                  name="deadline"
                  onChange={handleChange}
                  value={taskData.deadline}
                />
              </div>
            </div>

            <div className="form-group-premium">
              <label>Priority</label>
              <div className="input-icon-wrapper">
                <Tag size={16} className="input-icon" />
                <select name="priority" onChange={handleChange} value={taskData.priority}>
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer-premium">
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-submit-premium">
              <Plus size={18} />
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content-premium {
          width: 100%;
          max-width: 540px;
          background: white;
          border-radius: 28px;
          padding: 40px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1);
          border: 1px solid #f1f5f9;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .header-title { display: flex; gap: 16px; }
        .icon-box-purple {
          width: 44px;
          height: 44px;
          background: #f5f3ff;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .header-title h2 { font-family: 'Outfit', sans-serif; font-size: 1.5rem; color: #0f172a; margin-bottom: 4px; }
        .header-title p { font-size: 0.9rem; color: #64748b; }

        .close-btn { color: #94a3b8; background: transparent; border: none; cursor: pointer; transition: 0.2s; }
        .close-btn:hover { color: #0f172a; transform: rotate(90deg); }

        .modal-form-premium { display: flex; flex-direction: column; gap: 24px; }
        .form-group-premium { display: flex; flex-direction: column; gap: 8px; }
        .form-group-premium label { font-size: 0.85rem; font-weight: 700; color: #475569; padding-left: 4px; }
        
        .form-group-premium input, 
        .form-group-premium textarea, 
        .form-group-premium select {
          padding: 12px 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.95rem;
          color: #0f172a;
          transition: 0.2s;
        }

        .form-group-premium input:focus, 
        .form-group-premium textarea:focus, 
        .form-group-premium select:focus {
          outline: none;
          background: white;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37,99,235,0.1);
        }

        .form-group-premium textarea { height: 120px; resize: none; }
        .form-row-premium { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .input-icon-wrapper { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 14px; color: #94a3b8; pointer-events: none; }
        .input-icon-wrapper input, .input-icon-wrapper select { padding-left: 44px; width: 100%; }

        .modal-footer-premium {
          margin-top: 12px;
          display: flex;
          justify-content: flex-end;
          gap: 16px;
        }

        .btn-cancel {
          padding: 12px 24px;
          background: #f1f5f9;
          color: #475569;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-cancel:hover { background: #e2e8f0; color: #0f172a; }

        .btn-submit-premium {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 4px 12px rgba(37,99,235,0.2);
        }
        .btn-submit-premium:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(37,99,235,0.3);
        }
      `}} />
    </div>
  );
};

export default TaskModal;

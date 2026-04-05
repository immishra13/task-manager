import React, { useState } from 'react';
import { Plus, Search, Filter, Inbox, Sparkles } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const TaskBoard = () => {
  const { tasks, loading, addTask, deleteTask, toggleComplete } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="board-wrapper">
      <div className="board-controls">
        <div className="search-wrapper glass-card">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for tasks, descriptions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-hint">⌘F</div>
        </div>
        
        <div className="action-group">
          <button className="btn-filter">
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <button className="btn-primary-premium" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="shimmer-card" />
          <div className="shimmer-card" />
          <div className="shimmer-card" />
        </div>
      ) : (
        <div className="main-board-area">
          {filteredTasks.length > 0 ? (
            <div className="task-masonry">
              {filteredTasks.map(task => (
                <TaskCard 
                   key={task.id} 
                   task={task} 
                   onDelete={deleteTask}
                   onToggle={toggleComplete}
                />
              ))}
            </div>
          ) : (
            <div className="premium-empty-state">
              <div className="empty-icon-wrapper">
                <Inbox size={48} />
                <div className="sparkles-decor">
                  <Sparkles size={20} className="s1" />
                  <Sparkles size={16} className="s2" />
                </div>
              </div>
              <h3>No tasks in sight</h3>
              <p>Your workspace is clear! Why not start by creating something amazing? Your future self will thank you.</p>
              <button className="btn-primary-premium" onClick={() => setIsModalOpen(true)}>
                <Plus size={18} />
                <span>Create your first task</span>
              </button>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <TaskModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={addTask} 
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .board-wrapper {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .board-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 20px;
          width: 400px;
          border-radius: 16px;
          background: white;
          border: 1px solid #e2e8f0;
          transition: 0.2s;
        }
        .search-wrapper:focus-within {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        .search-icon { color: #94a3b8; }
        .search-wrapper input {
          border: none;
          background: transparent;
          width: 100%;
          font-size: 0.95rem;
          color: #0f172a;
          font-weight: 500;
        }
        .search-wrapper input::placeholder { color: #94a3b8; }
        .search-wrapper input:focus { outline: none; }
        .search-hint {
          font-size: 0.7rem;
          font-weight: 700;
          color: #94a3b8;
          padding: 2px 6px;
          background: #f1f5f9;
          border-radius: 4px;
        }

        .action-group { display: flex; gap: 12px; }
        .btn-filter {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-filter:hover { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }

        .btn-primary-premium {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 4px 12px rgba(37,99,235,0.2);
        }
        .btn-primary-premium:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(37,99,235,0.3);
        }

        .task-masonry {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }

        .premium-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 100px 40px;
          background: white;
          border-radius: 32px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }

        .empty-icon-wrapper {
          position: relative;
          color: #e2e8f0;
          margin-bottom: 32px;
        }
        .sparkles-decor { position: absolute; top: -10px; right: -10px; color: #fbbf24; }
        .s1 { position: absolute; top: 0; right: 0; animation: bounce 2s infinite; }
        .s2 { position: absolute; top: 20px; left: -60px; color: #60a5fa; animation: bounce 2.5s infinite; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .premium-empty-state h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.75rem;
          color: #0f172a;
          margin-bottom: 12px;
        }
        .premium-empty-state p {
          color: #64748b;
          max-width: 440px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .loading-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .shimmer-card {
          height: 200px;
          background: linear-gradient(90deg, #f1f5f9 25%, #f8fafc 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 20px;
        }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        @media (max-width: 768px) {
          .board-controls { flex-direction: column; gap: 20px; }
          .search-wrapper { width: 100%; }
          .action-group { width: 100%; justify-content: space-between; }
        }
      `}} />
    </div>
  );
};

export default TaskBoard;

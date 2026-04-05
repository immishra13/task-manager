import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TaskBoard from '../components/TaskBoard';
import { auth } from '../firebase/config';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <span className="breadcrumb">Workspace / Overview</span>
              <h2>Good morning, {auth.currentUser?.displayName?.split(' ')[0] || 'Builder'}! 👋</h2>
              <p>You have 3 tasks to complete today. Keep up the momentum!</p>
            </div>
            <div className="header-right">
              <div className="status-pill glass-card">
                <span className="dot pulse" />
                <span>Sync Active</span>
              </div>
            </div>
          </div>
        </header>

        <section className="dashboard-view-container">
          <div className="view-inner">
            <Routes>
              <Route path="/" element={<TaskBoard />} />
              <Route path="/tasks" element={<PlaceholderView title="My Tasks" />} />
              <Route path="/completed" element={<PlaceholderView title="Completed" />} />
              <Route path="/profile" element={<PlaceholderView title="Profile Settings" />} />
              <Route path="/settings" element={<PlaceholderView title="App Settings" />} />
              <Route path="/notifications" element={<PlaceholderView title="Notifications" />} />
            </Routes>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
          overflow: hidden;
        }

        .dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow-y: auto;
          position: relative;
        }

        .dashboard-header {
          padding: 48px 48px 24px;
          background: transparent;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .breadcrumb {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          display: block;
          margin-bottom: 8px;
        }

        .header-left h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .header-left p {
          color: #64748b;
          font-size: 1rem;
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #1e40af;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 100px;
        }

        .dot { width: 8px; height: 8px; border-radius: 50%; background: #2563eb; }
        .dot.pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }

        .dashboard-view-container {
          padding: 24px 48px 48px;
          flex: 1;
        }

        .view-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .placeholder-container {
          padding: 80px 40px;
          text-align: center;
          background: white;
          border-radius: 24px;
          border: 1px dashed #e2e8f0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .placeholder-container h3 { font-size: 1.5rem; color: #0f172a; }
        .placeholder-container p { color: #64748b; max-width: 400px; }
      `}} />
    </div>
  );
};

const PlaceholderView = ({ title }) => (
  <div className="placeholder-container">
    <div className="placeholder-icon-box" style={{ width: 64, height: 64, background: '#f1f5f9', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: '3px solid #cbd5e1', borderRadius: 8 }} />
    </div>
    <h3>{title}</h3>
    <p>We're working hard on bringing this feature to live. Stay tuned for updates in the next release!</p>
  </div>
);

export default Dashboard;

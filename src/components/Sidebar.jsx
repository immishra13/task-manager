import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  User, 
  LogOut, 
  CheckCircle,
  Settings,
  Bell,
  Search
} from 'lucide-react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { name: 'My Tasks', icon: <Clock size={18} />, path: '/dashboard/tasks' },
    { name: 'Completed', icon: <CheckCircle2 size={18} />, path: '/dashboard/completed' },
    { name: 'Profile', icon: <User size={18} />, path: '/dashboard/profile' },
  ];

  return (
    <aside className="sidebar-container glass-card">
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-logo">
          <div className="logo-box">
            <CheckCircle size={18} />
          </div>
          <span>CloudTask</span>
        </Link>
      </div>

      <div className="sidebar-search">
        <div className="search-pill">
          <Search size={14} />
          <span>Search...</span>
          <kbd className="search-kbd">⌘K</kbd>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group">
          <span className="nav-label">Main Menu</span>
          {navItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path} 
              end={item.path === '/dashboard'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="nav-group">
          <span className="nav-label">Settings</span>
          <NavLink to="/dashboard/settings" className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/dashboard/notifications" className="nav-item">
            <Bell size={18} />
            <span>Notifications</span>
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile-small">
          <div className="avatar-sm">
            {auth.currentUser?.displayName?.[0] || 'U'}
          </div>
          <div className="user-details">
            <span className="user-name">{auth.currentUser?.displayName || 'User'}</span>
            <span className="user-email">{auth.currentUser?.email || 'user@example.com'}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={18} />
          <span>Sign out</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-container {
          width: 280px;
          height: calc(100vh - 48px);
          margin: 24px 0 24px 24px;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 24px;
          z-index: 50;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 0;
        }

        .sidebar-header { padding: 32px 24px; }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          color: #0f172a;
          text-decoration: none;
        }
        .logo-box {
          width: 32px;
          height: 32px;
          background: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .sidebar-search { padding: 0 16px 24px; }
        .search-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0,0,0,0.03);
          padding: 8px 12px;
          border-radius: 12px;
          color: #64748b;
          font-size: 0.85rem;
          cursor: pointer;
          border: 1px solid transparent;
          transition: 0.2s;
        }
        .search-pill:hover { border-color: rgba(0,0,0,0.05); background: rgba(0,0,0,0.05); }
        .search-kbd {
          margin-left: auto;
          font-family: inherit;
          font-size: 0.75rem;
          background: white;
          padding: 2px 6px;
          border-radius: 4px;
          color: #94a3b8;
          border: 1px solid #e2e8f0;
        }

        .sidebar-nav { flex: 1; padding: 0 16px; overflow-y: auto; }
        .nav-group { margin-bottom: 32px; }
        .nav-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #94a3b8;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
          padding-left: 12px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 12px;
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          transition: 0.2s;
          margin-bottom: 2px;
        }
        .nav-item:hover { background: rgba(37,99,235,0.05); color: #2563eb; }
        .nav-item.active { background: #2563eb; color: white; box-shadow: 0 4px 12px rgba(37,99,235,0.25); }

        .sidebar-footer { padding: 24px; border-top: 1px solid rgba(0,0,0,0.05); background: rgba(255,255,255,0.3); border-radius: 0 0 24px 24px; }
        .user-profile-small { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .avatar-sm { width: 36px; height: 36px; border-radius: 10px; background: #2563eb; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; }
        .user-details { display: flex; flex-direction: column; overflow: hidden; }
        .user-name { font-size: 0.85rem; font-weight: 700; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-email { font-size: 0.75rem; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .logout-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 12px;
          color: #ef4444;
          font-size: 0.85rem;
          font-weight: 600;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: 0.2s;
        }
        .logout-button:hover { background: #fef2f2; }
      `}} />
    </aside>
  );
};

export default Sidebar;

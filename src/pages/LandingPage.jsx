import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, ArrowRight, Code, Star, Layout, Users, Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <div className="mesh-gradient" />
      
      <nav className="landing-nav glass-card">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon-bg">
              <CheckCircle className="logo-icon" size={20} />
            </div>
            <span>CloudTask</span>
          </Link>
          <div className="nav-links">
            <Link to="/auth" className="nav-link">Features</Link>
            <Link to="/auth" className="nav-link">Pricing</Link>
            <div className="nav-divider" />
            <Link to="/auth" className="btn-ghost">Log in</Link>
            <Link to="/auth?mode=signup" className="btn-primary">
              Get Started <Sparkles size={16} />
            </Link>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-content"
          >
            <div className="badge">
              <Star size={14} fill="currentColor" />
              <span>Trusted by 10,000+ teams worldwide</span>
            </div>
            <h1>The ultimate space for your <span className="gradient-text">ambitious ideas</span></h1>
            <p>CloudTask combines tasks, collaboration, and powerful insights in one beautiful interface. Built for the modern workflow.</p>
            <div className="hero-actions">
              <Link to="/auth?mode=signup" className="btn-primary btn-lg">
                Start building for free <ArrowRight size={20} />
              </Link>
              <Link to="/auth" className="btn-secondary btn-lg">
                <Code size={20} /> View on GitHub
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="hero-visual"
          >
            <div className="preview-container glass-card">
              <div className="preview-header">
                <div className="window-controls">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="preview-search">
                  <div className="search-placeholder" />
                </div>
              </div>
              <div className="preview-layout">
                <div className="preview-sidebar">
                  {[1, 2, 3, 4].map(i => <div key={i} className="sidebar-line" />)}
                </div>
                <div className="preview-main">
                  <div className="preview-toolbar" />
                  <div className="preview-grid">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="preview-card">
                        <div className="card-line long" />
                        <div className="card-line short" />
                        <div className="card-footer-line" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="glow-effect" />
            </div>
          </motion.div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything you need to <span className="text-primary">scale</span></h2>
            <p className="section-desc">Powerful features designed to help you and your team perform at your absolute best.</p>
          </div>
          <div className="features-grid">
            <FeatureCard 
              icon={<Zap className="text-yellow" />}
              title="Real-time Sync"
              description="Changes reflect instantly across all your devices and team members."
            />
            <FeatureCard 
              icon={<Layout className="text-blue" />}
              title="Modular Board"
              description="Customize your workspace with drag-and-drop ease and flexible views."
            />
            <FeatureCard 
              icon={<Users className="text-purple" />}
              title="Team Powered"
              description="Built-in collaboration tools to keep everyone aligned and focused."
            />
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Link to="/" className="nav-logo">
                <CheckCircle size={20} />
                <span>CloudTask</span>
              </Link>
              <p>Making productivity beautiful since 2024.</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <Link to="#">Features</Link>
                <Link to="#">Pricing</Link>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <Link to="#">About</Link>
                <Link to="#">Terms</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 CloudTask Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary: 221 83% 53%;
          --text-primary: hsl(222.2 47.4% 11.2%);
          --text-muted: hsl(215.4 16.3% 46.9%);
        }
        
        .landing-wrapper {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
        }

        .mesh-gradient {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background-color: #f8fafc;
          background-image: 
            radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
          background-attachment: fixed;
          opacity: 0.05;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .landing-nav {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: 1100px;
          z-index: 100;
          padding: 12px 24px;
          border-radius: 20px;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--text-primary);
          text-decoration: none;
        }

        .logo-icon-bg {
          width: 32px;
          height: 32px;
          background: hsl(var(--primary));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: 0.2s;
        }

        .nav-link:hover { color: hsl(var(--primary)); }

        .nav-divider { width: 1px; height: 24px; background: #e2e8f0; }

        .btn-ghost {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .hero-section {
          padding-top: 180px;
          padding-bottom: 100px;
          text-align: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 24px;
          border: 1px solid #dbeafe;
        }

        .hero-content h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          color: #0f172a;
          letter-spacing: -0.03em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-content p {
          max-width: 600px;
          margin: 0 auto 40px;
          font-size: 1.25rem;
          color: #475569;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 80px;
        }

        .btn-lg {
          padding: 14px 32px;
          font-size: 1rem;
          border-radius: 12px;
        }

        .hero-visual {
          perspective: 1000px;
        }

        .preview-container {
          width: 100%;
          max-width: 1000px;
          height: 600px;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
          padding: 0;
          background: rgba(255, 255, 255, 0.4);
          transform: rotateX(5deg);
        }

        .preview-header {
          height: 50px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          padding: 0 20px;
          background: rgba(255,255,255,0.5);
        }

        .window-controls { display: flex; gap: 8px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }

        .preview-search {
          margin-left: 40px;
          width: 240px;
          height: 28px;
          background: rgba(0,0,0,0.03);
          border-radius: 6px;
        }

        .preview-layout { display: flex; height: calc(100% - 50px); }
        .preview-sidebar { width: 220px; border-right: 1px solid rgba(0,0,0,0.05); padding: 30px 20px; display: flex; flex-direction: column; gap: 20px; }
        .sidebar-line { height: 12px; background: rgba(0,0,0,0.03); border-radius: 4px; width: 80%; }
        
        .preview-main { flex: 1; padding: 40px; display: flex; flex-direction: column; gap: 30px; }
        .preview-toolbar { height: 40px; background: rgba(0,0,0,0.02); border-radius: 8px; width: 60%; }
        
        .preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .preview-card {
          padding: 20px;
          background: white;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card-line { height: 10px; background: #f1f5f9; border-radius: 4px; }
        .card-line.long { width: 80%; }
        .card-line.short { width: 50%; }
        .card-footer-line { margin-top: auto; height: 8px; background: #f8fafc; width: 30%; }

        .glow-effect {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%);
          top: -200px;
          right: -200px;
          pointer-events: none;
        }

        .features-section { padding: 120px 0; background: white; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-title { font-family: 'Outfit', sans-serif; font-size: 3rem; margin-bottom: 16px; }
        .section-desc { font-size: 1.125rem; color: #64748b; max-width: 600px; margin: 0 auto; }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .feature-card-ui {
          padding: 40px;
          border-radius: 24px;
          background: #f8fafc;
          transition: 0.3s;
          border: 1px solid #f1f5f9;
        }

        .feature-card-ui:hover {
          transform: translateY(-8px);
          background: white;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
          border-color: #e2e8f0;
        }

        .f-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .feature-card-ui h3 { font-size: 1.25rem; margin-bottom: 12px; color: #0f172a; }
        .feature-card-ui p { color: #64748b; line-height: 1.6; }

        .text-yellow { color: #f59e0b; }
        .text-blue { color: #3b82f6; }
        .text-purple { color: #8b5cf6; }

        .landing-footer { padding: 100px 0 40px; background: #0f172a; color: white; }
        .footer-content { display: flex; justify-content: space-between; margin-bottom: 80px; }
        .footer-brand { display: flex; flex-direction: column; gap: 20px; }
        .footer-brand .nav-logo { color: white; }
        .footer-brand p { color: #94a3b8; max-width: 300px; }
        
        .footer-links { display: flex; gap: 80px; }
        .link-group { display: flex; flex-direction: column; gap: 16px; }
        .link-group h4 { font-size: 0.875rem; color: #f8fafc; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .link-group a { color: #94a3b8; text-decoration: none; font-size: 0.95rem; transition: 0.2s; }
        .link-group a:hover { color: white; }
        
        .footer-bottom { border-top: 1px solid #1e293b; padding-top: 40px; text-align: center; color: #64748b; font-size: 0.875rem; }

        @media (max-width: 1024px) {
          .hero-content h1 { font-size: 3.5rem; }
          .features-grid { grid-template-columns: 1fr; }
          .footer-content { flex-direction: column; gap: 60px; }
        }

        @media (max-width: 768px) {
          .hero-content h1 { font-size: 2.5rem; }
          .landing-nav { display: none; }
          .hero-actions { flex-direction: column; }
          .preview-container { height: 400px; }
          .preview-sidebar { display: none; }
          .preview-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card-ui">
    <div className="f-icon-box">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default LandingPage;

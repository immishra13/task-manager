import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle, 
  Code, 
  Globe,
  LayoutDashboard,
  ShieldCheck,
  Zap 
} from 'lucide-react';
import { auth, db, googleProvider, githubProvider } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signInWithPopup 
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const isSignupInit = searchParams.get('mode') === 'signup';
  const [isLogin, setIsLogin] = useState(!isSignupInit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: formData.displayName });
        
        // Create user doc in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: formData.displayName,
          email: formData.email,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create user doc if it doesn't exist
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          provider: provider.providerId
        });
      } else {
        // Update last login
        await setDoc(userRef, { lastLogin: new Date().toISOString() }, { merge: true });
      }

      navigate('/dashboard');
    } catch (err) {
      console.error("Social Login Error:", err);
      // Detailed error messages for common social auth issues
      if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with the same email address but different sign-in credentials.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Login cancelled. Please try again.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-mesh-bg" />

      <div className="auth-content-box">
        <Motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="auth-sidebar-info"
        >
          <Link to="/" className="auth-logo">
            <div className="logo-box-white">
              <CheckCircle size={24} />
            </div>
            <span>CloudTask</span>
          </Link>

          <div className="auth-benefits">
            <div className="benefit-item">
              <div className="benefit-icon"><ShieldCheck size={20} /></div>
              <div>
                <h4>Enterprise Security</h4>
                <p>Your data is encrypted with bank-grade security protocols.</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><Zap size={20} /></div>
              <div>
                <h4>Real-time Sync</h4>
                <p>Collaborate across all your devices seamlessly in real-time.</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><LayoutDashboard size={20} /></div>
              <div>
                <h4>Visual Workflow</h4>
                <p>Organize your tasks with our intuitive Kanban-style boards.</p>
              </div>
            </div>
          </div>

          <div className="auth-footer-text">
            © 2024 CloudTask Inc. Trusted by 2M+ teams globally.
          </div>
        </Motion.div>

        <Motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="auth-form-card mask-card"
        >
          <div className="form-header">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLogin ? 'Enter your credentials to access your workspace.' : 'Start your journey towards peak productivity today.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form-premium">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <Motion.div 
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="input-group-premium"
                >
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      name="displayName"
                      placeholder="e.g. John Doe"
                      required
                      value={formData.displayName}
                      onChange={handleChange}
                    />
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>

            <div className="input-group-premium">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  name="email"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group-premium">
              <div className="label-row">
                <label>Password</label>
                {isLogin && <a href="#" className="forgot-link">Forgot?</a>}
              </div>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <div className="error-message-auth">{error}</div>}

            <button type="submit" disabled={loading} className="btn-auth-primary">
              {loading ? <div className="spinner-white" /> : (isLogin ? 'Sign In' : 'Create Account')}
              <ArrowRight size={18} />
            </button>

            <div className="auth-divider">
              <span>Or continue with</span>
            </div>

            <div className="social-auth-row">
              <button 
                type="button" 
                className="social-btn" 
                onClick={() => handleSocialLogin(githubProvider)}
                disabled={loading}
              >
                <Code size={18} />
                <span>GitHub</span>
              </button>
              <button 
                type="button" 
                className="social-btn" 
                onClick={() => handleSocialLogin(googleProvider)}
                disabled={loading}
              >
                <Globe size={18} />
                <span>Google</span>
              </button>
            </div>

            <p className="toggle-auth-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </form>
        </Motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-page-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
          padding: 24px;
        }

        .auth-mesh-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: 
            radial-gradient(at 0% 0%, hsla(221, 83%, 53%, 0.15) 0, transparent 50%),
            radial-gradient(at 100% 100%, hsla(262, 83%, 53%, 0.15) 0, transparent 50%);
          z-index: 0;
        }

        .auth-content-box {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1100px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: white;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.1);
          border: 1px solid #f1f5f9;
        }

        .auth-sidebar-info {
          padding: 64px;
          background: #2563eb;
          color: white;
          display: flex;
          flex-direction: column;
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: white;
          text-decoration: none;
          margin-bottom: 80px;
        }
        .logo-box-white {
          width: 40px;
          height: 40px;
          background: white;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }

        .auth-benefits { display: flex; flex-direction: column; gap: 40px; flex: 1; }
        .benefit-item { display: flex; gap: 20px; }
        .benefit-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .benefit-item h4 { font-family: 'Outfit', sans-serif; font-size: 1.1rem; margin-bottom: 4px; }
        .benefit-item p { font-size: 0.9rem; color: rgba(255,255,255,0.7); line-height: 1.5; }

        .auth-footer-text { font-size: 0.8rem; color: rgba(255,255,255,0.5); }

        .auth-form-card { padding: 64px; background: white; }
        .form-header { margin-bottom: 40px; }
        .form-header h2 { font-family: 'Outfit', sans-serif; font-size: 2rem; color: #0f172a; margin-bottom: 8px; }
        .form-header p { color: #64748b; font-size: 1rem; line-height: 1.6; }

        .auth-form-premium { display: flex; flex-direction: column; gap: 24px; }
        .input-group-premium { display: flex; flex-direction: column; gap: 8px; }
        .label-row { display: flex; justify-content: space-between; align-items: center; }
        .input-group-premium label { font-size: 0.85rem; font-weight: 700; color: #475569; }
        .forgot-link { font-size: 0.85rem; color: #2563eb; text-decoration: none; font-weight: 600; }
        
        .input-wrapper { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 16px; color: #94a3b8; }
        .input-wrapper input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: 0.2s;
        }
        .input-wrapper input:focus {
          outline: none;
          background: white;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37,99,235,0.1);
        }

        .btn-auth-primary {
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-auth-primary:hover { background: #1d4ed8; }
        .btn-auth-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-divider {
          position: relative;
          text-align: center;
          margin: 10px 0;
        }
        .auth-divider::before {
          content: "";
          position: absolute;
          top: 50%; left: 0; right: 0;
          height: 1px; background: #e2e8f0;
          z-index: 0;
        }
        .auth-divider span {
          position: relative;
          z-index: 1;
          background: white;
          padding: 0 16px;
          font-size: 0.85rem;
          color: #94a3b8;
        }

        .social-auth-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: 0.2s;
        }
        .social-btn:hover { background: #f8fafc; border-color: #cbd5e1; }

        .toggle-auth-text {
          text-align: center;
          font-size: 0.9rem;
          color: #64748b;
        }
        .toggle-auth-text button {
          background: transparent;
          border: none;
          color: #2563eb;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }

        .error-message-auth {
          padding: 12px;
          background: #fef2f2;
          color: #ef4444;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid #fee2e2;
        }

        .spinner-white {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 900px) {
          .auth-content-box { grid-template-columns: 1fr; max-width: 500px; }
          .auth-sidebar-info { display: none; }
          .auth-form-card { padding: 40px; }
        }
      `}} />
    </div>
  );
};

export default AuthPage;

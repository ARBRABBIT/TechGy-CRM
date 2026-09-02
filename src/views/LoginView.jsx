import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

const ROLES = [
  { id: 'admin', title: 'Sales Admin', email: 'admin@techgy.com', desc: 'Secure access for authorized Sales Admin. Please authenticate to continue.' },
  { id: 'rep', title: 'Sales Rep', email: 'rajesh@techgy.com', desc: 'Personalized workspace for Sales Representatives and deal tracking.' },
  { id: 'manager', title: 'Sales Manager', email: 'manager@techgy.com', desc: 'Executive dashboard, team activity tracking, and commercial pipeline access.' }
];

export default function LoginView({ onLoginSuccess }) {
  const [selectedRoleId, setSelectedRoleId] = useState('admin');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const currentRole = ROLES.find(r => r.id === selectedRoleId) || ROLES[0];

  const handleRoleSwitch = (role) => {
    setSelectedRoleId(role.id);
    setLoginId(role.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        role: currentRole.title,
        email: loginId,
        name: currentRole.id === 'admin' ? 'System Administrator' : (currentRole.id === 'rep' ? 'Rajesh Sharma' : 'Priya Patel')
      });
    }, 600);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetEmailSent(true);
  };

  return (
    <div className="techgy-login-wrapper">
      {/* Full Resolution Login Background Image */}
      <img src="/login-bg.png" alt="Login Background" className="login-full-bg-img" />

      {/* Bigger Logo SVG graphic starting from middle of screen */}
      <div className="login-bigger-logo-svg">
        <img src="/logo.svg" alt="TechGy Bigger Logo Graphic" />
      </div>

      {/* Top Header Logo */}
      <header className="login-header">
        <div className="brand-logo-container">
          <img src="/main-logo.png" alt="TechGy Link Logo" className="techgy-logo-img" />
        </div>
      </header>

      {/* Main Login Card Area */}
      <main className="login-content-container">
        <div className="login-card-box">
          <h1 className="login-title">{currentRole.title}</h1>
          <p className="login-subtitle">{currentRole.desc}</p>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Login ID Input */}
            <div className="form-group">
              <label className="form-label">Login ID</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon-left" />
                <input
                  type="text"
                  className="login-input"
                  placeholder="Enter your assigned ID"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password-row">
              <button
                type="button"
                className="forgot-link-btn"
                onClick={() => {
                  setResetEmail(loginId);
                  setResetEmailSent(false);
                  setShowForgotModal(true);
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Login Button */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading-text">Authenticating...</span>
              ) : (
                <>
                  <span>Login</span>
                </>
              )}
            </button>

            {/* Security Encrypted Footer Badge */}
            <div className="security-notice-footer">
              <ShieldCheck size={18} className="shield-icon" />
              <span>Secured by TechGy Link. End-to-end encrypted connection.</span>
            </div>
          </form>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-backdrop-overlay">
          <div className="forgot-password-modal">
            <div className="modal-icon-header">
              <KeyRound size={28} color="#063669" />
            </div>
            <h3>Reset Password</h3>
            <p className="modal-sub">
              Enter your registered TechGy Link Login ID to receive password reset instructions.
            </p>

            {!resetEmailSent ? (
              <form onSubmit={handleForgotSubmit}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Login ID / Email</label>
                  <input
                    type="email"
                    className="login-input"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    onClick={() => setShowForgotModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="login-submit-btn">
                    Send Reset Link
                  </button>
                </div>
              </form>
            ) : (
              <div className="reset-success-box">
                <CheckCircle2 size={40} color="#16A34A" />
                <h4>Reset Link Sent!</h4>
                <p>We have dispatched verification instructions to <strong>{resetEmail}</strong>.</p>
                <button
                  type="button"
                  className="login-submit-btn"
                  onClick={() => setShowForgotModal(false)}
                  style={{ marginTop: '1rem' }}
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

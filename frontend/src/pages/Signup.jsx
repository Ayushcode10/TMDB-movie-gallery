import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = existingUsers.find(u => u.email === email);
    if (userExists) {
      setError("An account with this email already exists");
      return;
    }

    // Create new user
    const newUser = { 
      id: Date.now(), // Simple ID generation
      email, 
      password,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setSuccess("Account created successfully! Redirecting to login...");
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us to start exploring movies</p>
        </div>
        
        <form onSubmit={handleSignup} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input"
            />
          </div>
          
          <button type="submit" className="auth-button">
            Create Account
          </button>
          
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
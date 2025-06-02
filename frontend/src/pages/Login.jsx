import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Auth.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find user with matching credentials
    const user = existingUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Store logged in user info
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
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
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>
          
          <button type="submit" className="auth-button">
            Sign In
          </button>
          
          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
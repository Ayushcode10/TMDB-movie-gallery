import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../src/css/Auth.css"; // Create this or style inline

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = existingUsers.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }
  localStorage.setItem("user", JSON.stringify(user));
  setIsLoggedIn(true);
  navigate("/");
  // const handleLogin = () => {
  // // logic to check credentials
  // localStorage.setItem("user", JSON.stringify({ username }));
  // setIsLoggedIn(true); // ✅ update app state
  // navigate("/"); // redirect after login
  
};

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const storedUser = JSON.parse(localStorage.getItem("user"));

  //   if (storedUser && storedUser.email === email && storedUser.password === password) {
  //     localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
  //     navigate("/");
  //   } else {
  //     alert("Invalid email or password");
  //   }
  // };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

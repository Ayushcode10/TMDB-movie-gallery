import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../src/css/Auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSignup = (e) => {
  //   e.preventDefault();

  //   const user = { email, password };
  //   localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("loggedInUser", JSON.stringify(user));
  //   navigate("/");
  // };
  const handleSignup = () => {
  const newUser = { username, password };
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if username already exists
  const alreadyExists = existingUsers.find(u => u.username === username);
  if (alreadyExists) {
    alert("Username already taken");
    return;
  }

  // Save the new user
  const updatedUsers = [...existingUsers, newUser];
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  navigate("/login");
};


  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

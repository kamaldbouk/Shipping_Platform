import { useState } from "react";
import { authAPI } from "../api/queries";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import Loading from "../components/Loading";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await authAPI.register(name, email, password);
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const formStyle = {
    width: "100%",
    maxWidth: "400px",
  };

  const errorStyle = {
    color: "red",
    marginBottom: "15px",
    padding: "10px",
    backgroundColor: "#ffebee",
    borderRadius: "5px",
  };

  const linkStyle = {
    textAlign: "center" as const,
    marginTop: "15px",
    fontSize: "14px",
  };

  return (
    <>
      {loading && <Loading />}
      <div style={containerStyle}>
        <div style={formStyle}>
          <Card title="Register">
            {error && <div style={errorStyle}>{error}</div>}

          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

            <Button
              text={loading ? "Registering..." : "Register"}
              onClick={handleRegister}
            />

            <div style={linkStyle}>
              Already have an account? <a href="/login">Login here</a>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;

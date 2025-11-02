import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext";


export default function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
 const {setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9090/api/users/login",
        login
      );

      if (response.status === 200) {
        
        const user = response.data;
      
         setUser(user)
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "ADMIN") {
          navigate("/admin");
        } else if (user.role === "CLIENT") {
          navigate("/Home");
        } else if (user.role === "BIBLIOTHECAIRE") {
          navigate("/Books");
        } else {
          navigate("/Home"); 
        }
      }
    } catch (error) {
      console.error(error);
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Connexion</h2>
      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={login.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={login.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Se connecter
        </button>
      </form>
      <p className="mt-3 text-center">
        <Link to="/Register">Register</Link>
      </p>
    </div>
  );
}

import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Register() {
  const [Users, Setusers] = useState({ fullName: '', email: '', password: '' })

  const handelChange = (e) => {
    Setusers({ ...Users, [e.target.name]: e.target.value })
  }

  const handeladduser = async (e) => {
    e.preventDefault()
    await axios.post(
      "http://localhost:9090/api/users",
      Users,
    )
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Créer un compte</h2>
      <form className="card p-4 shadow" onSubmit={handeladduser}>
        <div className="mb-3">
          <label className="form-label">Nom complet</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            required
            value={Users.fullName}
            onChange={handelChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={Users.email}
            onChange={handelChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            name="password"
            className="form-control"
            required
            value={Users.password}
            onChange={handelChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          S'inscrire
        </button>
      </form>
        <p className="mt-3 text-center">
        Vous avez déjà un compte? <Link to="/Login">Connectez-vous</Link>
        </p>
    </div>
  )
}

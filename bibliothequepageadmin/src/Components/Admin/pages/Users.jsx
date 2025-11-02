import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Erreur API:", err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    
      await axios.delete(`http://localhost:9090/api/users/${id}`);
      getUsers(); 
    
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>id</th>
            <th>fullName</th>
            <th>email</th>
            <th>createdAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

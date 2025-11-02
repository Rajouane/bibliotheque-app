import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Table, Container } from 'react-bootstrap';

export default function ManageBooks() {
  const [books, setBooks] = useState([]);

  const getAllBooks = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/Books');
      setBooks(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des livres:", err);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const deletbook = async (id) => {
    await axios.delete(`http://localhost:9090/api/Books/${id}`);
    getAllBooks();
  };

  return (
    <Container fluid className="p-5" style={{ backgroundColor: '#f4f7fa', minHeight: '100vh' }}>
      <Card className="shadow-lg mb-4" style={{ borderRadius: '15px', padding: '20px', backgroundColor: '#fff' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 style={{ color: '#34495e', fontWeight: '700' }}>📚 Gestion des Livres</h2>
          <Link to="/AddBook">
            <Button variant="success" className="fw-semibold">
              + Ajouter Livre
            </Button>
          </Link>
        </div>

        <Table hover responsive bordered className="text-center align-middle">
          <thead style={{ backgroundColor: '#dfe6e9', fontWeight: '600' }}>
            <tr>
              <th>Title</th>
              <th>Publisher</th>
              <th>Year Published</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.publisher}</td>
                <td>{new Date(book.yearPublished).toLocaleDateString()}</td>
                <td>{book.isbn}</td>
                <td>{book.category?.name}</td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => deletbook(book.id)}
                    className="me-2"
                  >
                    Delete
                  </Button>
                  <Button variant="warning" size="sm">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

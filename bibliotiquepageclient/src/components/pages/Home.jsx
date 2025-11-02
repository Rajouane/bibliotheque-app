import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import Navebar from "../Navebar";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:9090/api/Books");
        setBooks(res.data.slice(0, 6)); // نعرض فقط آخر 6 كتب
      } catch (err) {
        console.error("Erreur API:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <Navebar />
      <Container className="py-5 text-center">
        <h1 className="mb-4 display-4 fw-bold text-primary">
          Bienvenue dans la Bibliothèque 📚
        </h1>
        <p className="lead mb-5">
          Explorez des milliers de livres, ajoutez vos avis et profitez d’une
          expérience de lecture unique.
        </p>

        {/* Statistiques simples */}
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <Card className="shadow-sm py-3">
              <h2 className="text-primary">{books.length}</h2>
              <p>Livres disponibles</p>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="shadow-sm py-3">
              <h2 className="text-success">⭐⭐⭐</h2>
              <p>Meilleurs avis</p>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="shadow-sm py-3">
              <h2 className="text-warning">📅</h2>
              <p>Réservations récentes</p>
            </Card>
          </Col>
        </Row>

        {/* Livres récents */}
        <h3 className="mb-4 text-start">Derniers livres ajoutés</h3>
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row className="g-4">
            {books.map((book) => (
              <Col md={4} key={book.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold">{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author} – {book.publisher}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Année:</strong> {book.yearPublished} <br />
                      <strong>Catégorie:</strong> {book.category?.name} <br />
                      <strong>ISBN:</strong> {book.isbn}
                    </Card.Text>
                    <Button variant="primary" href="/Books">
                      Voir plus
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Section Footer simple */}
      <footer className="bg-dark text-light py-4 mt-5 text-center">
        &copy; {new Date().getFullYear()} Bibliothèque. Tous droits réservés.
      </footer>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Spinner, Form } from "react-bootstrap";
import Navebar from "../Navebar";
import {useUser} from "../../context/UserContext"
export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showDatePicker, setShowDatePicker] = useState({}); 
  const [selectedDate, setSelectedDate] = useState({}); 
   const {user } = useUser();
  const userId = 1; 

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:9090/api/Books");
        setBooks(res.data);
      } catch (err) {
        console.error("Erreur API:", err.message);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  const handleShowDatePicker = (bookId) => {
    setShowDatePicker({ ...showDatePicker, [bookId]: true });
  };

const handleReservation = async (bookId) => {
  try {
    await axios.post("http://localhost:9090/api/reservations", {
      user: { id: user.id },          
      book: { id: bookId },           
      dateReservation: selectedDate[bookId], 
    });
    alert("Réservation confirmée !");
  } catch (error) {
    console.error("Erreur lors de la réservation :", error);
    alert("Erreur lors de la réservation !");
  }
};


  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );
console.log(user);

  return (
    <div>
      <Navebar />
      <Container className="py-5">
        <h2 className="text-center mb-4">📚 Catalogue des Livres</h2>

        <Form.Control
          type="text"
          placeholder="Rechercher un livre..."
          className="mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : filteredBooks.length === 0 ? (
          <p className="text-center">Aucun livre trouvé.</p>
        ) : (
          <Row className="g-4">
            {filteredBooks.map((book) => (
              <Col md={4} key={book.id}>
                <Card className="shadow h-100">
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.author} – {book.publisher}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Année:</strong> {book.yearPublished} <br />
                      <strong>ISBN:</strong> {book.isbn} <br />
                      <strong>Catégorie:</strong> {book.category?.name}
                    </Card.Text>

                    {!showDatePicker[book.id] ? (
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={() => handleShowDatePicker(book.id)}
                      >
                        Réserver
                      </Button>
                    ) : (
                      <>
                        <Form.Control
                          type="date"
                          className="mb-2"
                          value={selectedDate[book.id] || ""}
                          onChange={(e) =>
                            setSelectedDate({ ...selectedDate, [book.id]: e.target.value })
                          }
                        />
                    <Button
                      variant="success"
                      className="w-100"
                      onClick={() => handleReservation(book.id)}
                    >
                      Confirmer Réservation
                    </Button>

                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

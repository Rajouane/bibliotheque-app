import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";

export default function ManagementPanel() {
  const [stats, setStats] = useState({ books: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    try {
      const booksRes = await axios.get("http://localhost:9090/api/Books");
      const usersRes = await axios.get("http://localhost:9090/api/users");
      setStats({ books: booksRes.data.length, users: usersRes.data.length });
    } catch (err) {
      console.error("Erreur lors du chargement des stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <Container fluid className="p-5" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)" }}>
      <h1 className="text-center mb-5" style={{ fontWeight: "700", fontSize: "2.5rem", color: "#1f3c88" }}>
        📊 Tableau de Bord
      </h1>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* البطاقات الإحصائية */}
          <Row className="g-4 mb-5 justify-content-center">
            <Col md={4}>
              <Card className="shadow-lg text-center h-100 hover-card" style={{ borderRadius: "20px", background: "linear-gradient(135deg, #00b894, #55efc4)", color: "#fff", transition: "all 0.3s" }}>
                <Card.Body>
                  <Icon.BookFill size={40} className="mb-3" />
                  <Card.Title style={{ fontSize: "1.5rem", fontWeight: "600" }}>Total Livres</Card.Title>
                  <h2 style={{ fontSize: "2.5rem", margin: "20px 0" }}>{stats.books}</h2>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-lg text-center h-100 hover-card" style={{ borderRadius: "20px", background: "linear-gradient(135deg, #6c5ce7, #a29bfe)", color: "#fff", transition: "all 0.3s" }}>
                <Card.Body>
                  <Icon.PeopleFill size={40} className="mb-3" />
                  <Card.Title style={{ fontSize: "1.5rem", fontWeight: "600" }}>Total Utilisateurs</Card.Title>
                  <h2 style={{ fontSize: "2.5rem", margin: "20px 0" }}>{stats.users}</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          
        
        </>
      )}

      {/* CSS Hover */}
      <style>
        {`
          .hover-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 30px rgba(0,0,0,0.2);
          }
          button:hover {
            transform: translateY(-3px);
          }
        `}
      </style>
    </Container>
  );
}

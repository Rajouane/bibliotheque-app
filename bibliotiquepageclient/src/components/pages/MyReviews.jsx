import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup, Spinner, Badge } from "react-bootstrap";
import Navebar from "../Navebar";
import { useUser } from "../../context/UserContext";

export default function MyReviews() {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      if (!user) return; // ⚠️ لا تفعل شيء إذا المستخدم غير موجود بعد
      try {
        const res = await axios.get(`http://localhost:9090/api/reservations/user/${user.id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Erreur API:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [user]); // ⚠️ أضف user كاعتماد

  const getStatusVariant = (status) => {
    switch (status) {
      case "ACCEPTEE": return "success";
      case "REFUSEE": return "danger";
      default: return "warning";
    }
  };

  if (!user) {
    return <p className="text-center py-5">Veuillez vous connecter pour voir vos réservations.</p>;
  }

  return (
    <div>
      <Navebar />
      <Container className="py-5">
        <h2 className="text-center mb-4">📋 Mes Réservations</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center">Vous n’avez encore fait aucune réservation.</p>
        ) : (
          <ListGroup>
            {reviews.map((r) => (
              <ListGroup.Item key={r.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{r.book?.title}</strong> — {r.dateReservation}
                </div>
                <Badge bg={getStatusVariant(r.status)}>
                  {r.status || "EN_ATTENTE"}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    </div>
  );
}

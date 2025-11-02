import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup, Spinner, Button } from "react-bootstrap";
import Navebar from "../Navebar";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/reservations");
      setReservations(res.data);
    } catch (err) {
      console.error("Erreur API:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const acceptReservation = async (id) => {
    await axios.put(`http://localhost:9090/api/reservations/${id}/accept`);
    fetchReservations();
  };

  const refuseReservation = async (id) => {
    await axios.put(`http://localhost:9090/api/reservations/${id}/refuse`);
    fetchReservations();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTEE":
        return "green";
      case "REFUSEE":
        return "red";
      default:
        return "orange";
    }
  };

  return (
    <div>
      <Container className="py-5">
        <h2 className="text-center mb-4">📅 Toutes les Réservations</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : reservations.length === 0 ? (
          <p className="text-center">Aucune réservation pour le moment.</p>
        ) : (
          <ListGroup>
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>Full Name</th>
                  <th>Book</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id}>
                    <td>{r.user?.fullName}</td>
                    <td>{r.book?.title}</td>
                    <td>{r.dateReservation}</td>
                    <td style={{ color: getStatusColor(r.status), fontWeight: "bold" }}>
                      {r.status || "EN_ATTENTE"}
                    </td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => acceptReservation(r.id)}
                      >
                        Accepter
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => refuseReservation(r.id)}
                      >
                        Refuser
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ListGroup>
        )}
      </Container>
    </div>
  );
}

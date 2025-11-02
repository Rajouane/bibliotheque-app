import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function Navebar() {
  return (
    <Navbar 
      expand="lg" 
      style={{ backgroundColor: '#009879' }} 
      variant="dark" 
      className="shadow-lg py-3 px-4 rounded-4"
    >
      <Container fluid className="d-flex align-items-center justify-content-between">

        <div className="d-flex align-items-center">
          <Icon.Speedometer2 size={30} className="me-3 text-white" />
          <span className="fw-bold fs-4 text-white">Dashboard</span>
        </div>

        <div className="text-white fw-semibold">
          Bienvenue 👋
        </div>

      </Container>
    </Navbar>
  );
}

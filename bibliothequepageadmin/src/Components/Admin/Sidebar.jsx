import React from 'react';
import Nav from 'react-bootstrap/Nav';
import * as Icon from 'react-bootstrap-icons'; // Import all icons

export default function Sidebar() {
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)' }}>
      <Nav 
        className="flex-column bg-white shadow-sm p-3 border-end" 
        style={{ width: '250px' }}
      >
        <Nav.Link 
          href="/Management_Panel" 
          className="mb-2 d-flex align-items-center text-dark rounded p-2 sidebar-link"
        >
          <Icon.Speedometer2 className="me-2" /> Management Panel
        </Nav.Link>

        <Nav.Link 
          href="/Users" 
          className="mb-2 d-flex align-items-center text-dark rounded p-2 sidebar-link"
        >
          <Icon.PeopleFill className="me-2" /> Users
        </Nav.Link>

        <Nav.Link 
          href="/ManageBooks" 
          className="mb-2 d-flex align-items-center text-dark rounded p-2 sidebar-link"
        >
          <Icon.BookFill className="me-2" /> Manage Books
        </Nav.Link>

        <Nav.Link 
          href="/Manage_Categories" 
          className="mb-2 d-flex align-items-center text-dark rounded p-2 sidebar-link"
        >
          <Icon.TagsFill className="me-2" /> Categories
        </Nav.Link>
        
        <Nav.Link 
          href="/Borrowing_Reports" 
          className="mb-2 d-flex align-items-center text-dark rounded p-2 sidebar-link"
        >
          <Icon.JournalText className="me-2" /> Réservations
        </Nav.Link>

        <Nav.Link 
          href="/Reviews" 
          className="mb-2 d-flex align-items-center text-dark rounded p-2 sidebar-link"
        >
          <Icon.StarFill className="me-2" /> Reviews
        </Nav.Link>

        <Nav.Link 
          href="/SystemSettings" 
          className="mt-auto mb-2 d-flex align-items-center text-dark rounded p-2 sidebar-link"
        >
          <Icon.GearFill className="me-2" /> System Settings
        </Nav.Link>
      </Nav>

      <style>
        {`
          .sidebar-link:hover {
            background-color: #00987933; /* نفس لون Navbar مع شفافية */
            color: #009879 !important;
            transition: all 0.2s ease;
            font-weight: 500;
          }
        `}
      </style>
    </div>
  );
}

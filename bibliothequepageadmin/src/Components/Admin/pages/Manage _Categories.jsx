import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form, Modal, Spinner } from "react-bootstrap";
import Navebar from "../Navebar";

export default function Manage_Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur API:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!newCategory) return;
    try {
      if (editingCategory) {
        // Edit category
        await axios.put(`http://localhost:9090/api/categories/${editingCategory.id}`, { name: newCategory });
      } else {
        // Add new category
        await axios.post("http://localhost:9090/api/categories", { name: newCategory });
      }
      setShowModal(false);
      setNewCategory("");
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      console.error("Erreur API:", err.message);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      try {
        await axios.delete(`http://localhost:9090/api/categories/${id}`);
        fetchCategories();
      } catch (err) {
        console.error("Erreur API:", err.message);
      }
    }
  };

  return (
    <div>
      <Container className="py-5">
        <h2 className="text-center mb-4">📂 Gestion des Catégories</h2>

        <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
          Ajouter une catégorie
        </Button>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(cat)}>
                      Modifier
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(cat.id)}>
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal pour ajouter/modifier */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingCategory ? "Modifier Catégorie" : "Ajouter Catégorie"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nom de la catégorie</Form.Label>
                <Form.Control
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Entrez le nom"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {editingCategory ? "Enregistrer" : "Ajouter"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddBook() {
  const { id } = useParams();
  const [Book, setBook] = useState({
    title: '',
    author: '',
    publisher: '',
    yearPublished: '',
    isbn: '',
    category: { id: '' },
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/Books/${id}`).then(res => setBook(res.data));
    }
  }, [id]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoryId') {
      setBook(prevBook => ({
        ...prevBook,
        category: { ...prevBook.category, id: parseInt(value) },
      }));
    } else {
      setBook(prevBook => ({ ...prevBook, [name]: value }));
    }
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:9090/api/Books/${id}`, Book).then(() => alert('Book updated successfully'));
    } else {
      axios.post('http://localhost:9090/api/Books', Book).then(() => alert('Book added successfully'));
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">{id ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handelsubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={Book.title} onChange={handelChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input type="text" className="form-control" id="author" name="author" value={Book.author} onChange={handelChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="publisher" className="form-label">Publisher</label>
          <input type="text" className="form-control" id="publisher" name="publisher" value={Book.publisher} onChange={handelChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="yearPublished" className="form-label">Publication Date</label>
          <input type="date" className="form-control" id="yearPublished" name="yearPublished" value={Book.yearPublished} onChange={handelChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">ISBN</label>
          <input type="number" className="form-control" id="isbn" name="isbn" value={Book.isbn} onChange={handelChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" name="categoryId" id="category" value={Book.category?.id || ''} onChange={handelChange} required>
            <option value="">Choose a category</option>
            <option value="1">Roman</option>
            <option value="2">Science</option>
            <option value="3">Histoire</option>
          </select>
        </div>
        <button type="submit" className={`btn ${id ? 'btn-warning' : 'btn-primary'} w-100`}>
          {id ? 'Save Changes' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}

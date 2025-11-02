import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import Books from './components/pages/Books';
import MyReviews from './components/pages/MyReviews';
import Contact from './components/pages/Contact';
import Login from './components/login/Login';
import Register from './components/login/Register';
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <div className="App">
      <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path="/Register" element={<Register />} />

          {/* Pages existantes */}
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Books' element={<Books/>}/>
          <Route path='/MyReviews' element={<MyReviews/>}/>
          <Route path='/Contact' element={<Contact/>}/>

          {/* Pages spécifiques للأدوار */}
          <Route path='/admin' element={<h2 className="text-center mt-5">👨‍💼 Espace Admin</h2>} />
          <Route path='/client' element={<h2 className="text-center mt-5">👤 Espace Client</h2>} />
          <Route path='/bibliothecaire' element={<h2 className="text-center mt-5">📚 Espace Bibliothécaire</h2>} />

          <Route path='*' element={<h2 className="text-center mt-5">❌ Page introuvable</h2>} />
        </Routes>
      </Router></UserProvider>
    </div>
  );
}

export default App;

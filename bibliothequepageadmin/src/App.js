import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Management_Panel from './Components/Admin/pages/Management_Panel';
import Manage_Users from './Components/Admin/pages/Manage_Users';
import Manage_Categories from './Components/Admin/pages/Manage _Categories';
import Borrowing_Reports from './Components/Admin/pages/Borrowing_Reports';
import Logout from './Components/Admin/pages/Logout';
import ManageBooks from './Components/Admin/pages/ManageBooks';
import Reviews from './Components/Admin/pages/Reviews';
import SystemSettings from './Components/Admin/pages/SystemSettings';
import Users from './Components/Admin/pages/Users';
import Sidebar from './Components/Admin/Sidebar';
import AddBook from './Components/Admin/pages/AddBook';
import Navebar from './Components/Admin/Navebar';

function App() {
  return (
  <div className="App">
      <Router>
        
        <Navebar />
        
        <div style={{ display: 'flex' }}>
          <Sidebar />
          
          <div style={{ flex: 1, padding: '1rem' }}>
            <Routes>

              <Route path="/" element={<Management_Panel />} />
              <Route path="/Management_Panel" element={<Management_Panel />} />
              <Route path="/Manage_Users" element={<Manage_Users />} />
              <Route path="/Manage_Categories" element={<Manage_Categories />} />
              <Route path="/Borrowing_Reports" element={<Borrowing_Reports />} />
              <Route path="/Logout" element={<Logout />} />
              <Route path="/ManageBooks" element={<ManageBooks />} />
              <Route path="/Reviews" element={<Reviews />} />
              <Route path="/SystemSettings" element={<SystemSettings />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/AddBook" element={<AddBook />} />
              <Route path="/addBook/:id" element={<AddBook />} /> 
            </Routes>
          </div>
        </div>

      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserPage from './user/UserPage';
import AdminPage from './admin/AdminPage'; 
import AdminLogin from './admin/AdminLogin';

function App() {
  return (
    <Router>   
      <Navbar />
      <Routes>
        <Route path="/" element={<UserPage />} /> 
        <Route path="/login" element={<AdminLogin />} />  
        <Route path="/admin" element={<AdminPage />} />  
      </Routes>
    </Router>
  );
}

export default App;

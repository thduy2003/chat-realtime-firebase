
import './App.css';
import './style.scss'
import Register from './page/Register';
import Home from './page/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
  const { currentUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes path='/'>
        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

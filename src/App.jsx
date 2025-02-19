import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UserDataForm from './pages/UserDataForm';
import RichTextEditor from './pages/RichTextEditor';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route  path="/" element={<Home/>} />
       <Route path="/form" element={<UserDataForm/>} />
       <Route path="/editor" element={<RichTextEditor/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import UserView from './pages/UserView';
import AddUser from './pages/AddUser';
import AdminLogin from './pages/AdminLogin'; // Corrected import name

import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <PrivateRoute>
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewmore/:userId" element={<UserView />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </PrivateRoute>

        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

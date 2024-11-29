import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";0
import UserView from "./pages/UserView";
import AddUser from "./pages/AddUser";

import PrivateRoute from "./components/PrivateRouts";
import Adminlogin from "./pages/Adminlogin";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateAdmin from "./components/PrivateAdmin";

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin-login" element={<Adminlogin />}></Route>

        <Route element={<PrivateAdmin/>}>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/adduser" element={<AddUser/>}></Route>
        <Route path="/viewmore/:userId" element={<UserView />} />
        </Route>
       

 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

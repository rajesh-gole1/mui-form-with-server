import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import CustomizedDialogs from "../components/Dialog";
import Error from "../components/Error";
import ShowUsers from "../components/ShowUsers";
import BasicTabs from "../components/Tabs";
import AddUser from "../components/User";
import EditUser from "../components/User/EditUser";
import Login from "../components/Login/Login";
import LoginForm from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import ProtectedRoutes from "../protectedRoute/ProtectedRoutes";
// import Signup from "../components/Signup/Signup";
const Index = () => {
  // const [auth, setAuth] = useState(false);
  // const location = useLocation();
  return (
    <BrowserRouter>
      <Routes>
        {/* c
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
        <Route
          path="/"
          element={
            auth ? (
              <CustomizedDialogs />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<CustomizedDialogs />} />
          <Route path="/all-users" element={<ShowUsers />} />
          <Route path="/user/:id" element={<BasicTabs />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Index;

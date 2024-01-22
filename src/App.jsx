import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/login/LoginPage";
import StudentPage from "./pages/student/StudentPage";
import LandingPage from "./pages/landingpage/LandingPage";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import Signup from "./pages/signup/Signup";
import ManagerPage from "./pages/manager/ManagerPage";
import Guard from "./pages/guard/Guard";
import AdminPage from "./pages/admin/AdminPage";
import Test from "./pages/admin/user/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="student/*" element={<StudentPage />} />
        <Route path="manager/*" element={<ManagerPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/guard/*" element={<Guard />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;

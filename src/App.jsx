import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup";
import UserDashboard from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import UploadForm from "./Pages/UplaodForm";
import ProtectedRoute from "./Pages/ProtectedRoutes";
import ResetPassword from "./Pages/ResetPassword";
// import LoginPage from './Auth/LoginPage'
// import SignUpPage from './Auth/SignUpPage'

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> */}

          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected User Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadForm />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

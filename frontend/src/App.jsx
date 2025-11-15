import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ProblemPage from "./pages/ProblemPage";
import { checkAuth } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminCreate from "./components/AdminCreate";
import AdminUpdate from "./components/AdminUpdate";
import AdminDelete from "./components/AdminDelete";
import AdminUpdateForm from "./components/AdminUpdateForm";

const App = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // console.log("Is Authenticated:", isAuthenticated);
  // console.log(user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <HomePage></HomePage> : <Navigate to="/login" />
        }
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route path="/problem/:problemid" element={<ProblemPage />} />
      <Route
        path="/admin"
        element={
          isAuthenticated && user?.role === "admin" ? 
            <Admin /> : 
            <Navigate to="/" />
        }
      />
      <Route path="/admin/create-problem" element={
        isAuthenticated && user?.role === "admin" ? <AdminCreate /> : <Navigate to="/" />
      } />
      <Route path="/admin/update-problem" element={
        isAuthenticated && user?.role === "admin" ? <AdminUpdate /> : <Navigate to="/" />
      } />
      <Route path="/admin/delete-problem" element={
        isAuthenticated && user?.role === "admin" ? <AdminDelete /> : <Navigate to="/" />
      } />
      <Route path="/admin/update/:id" 
        element={isAuthenticated && user?.role === "admin" ? <AdminUpdateForm /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;

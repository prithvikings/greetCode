import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import {checkAuth} from "./authSlice";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {Navigate} from "react-router-dom";

const App=()=>{

  const {isAuthenticated,user,loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  console.log("Is Authenticated:", isAuthenticated);
  console.log(user?.role);

  if(loading){
    return <div className="min-h-screen flex items-center justify-cneter ">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }


  return(
    <Routes>
      <Route path="/" element={isAuthenticated?<HomePage></HomePage>:<Navigate to="/login" />} />
      <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<SignupPage />} />
      <Route path="/login" element={isAuthenticated?<Navigate to="/"/>:<LoginPage />} />
      <Route
          path="/admin"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <AdminPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}
export default App;
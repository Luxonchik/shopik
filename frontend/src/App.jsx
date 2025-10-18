import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import TestPage from "./pages/TestPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return null;

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route path="/test" element={<TestPage />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        {/* <Route
          path="/admin"
          element={!authUser.role === "ADMIN" ? <AdminPage /> : <Navigate to={"/"} />}
        /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

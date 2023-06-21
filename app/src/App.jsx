import "./App.css";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage";
import Home from "./pages/Home";
import { useState } from "react";
import { useSelector } from "react-redux";

const Container = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

function App() {
  // const [user, setUser] = useState(0);

  const { username } = useSelector((state) => state.users);

  return (
    <Container>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={username ? <Navigate to="/" /> : <AuthorizationPage />}
          />
          <Route
            path="/login"
            element={username ? <Navigate to="/" /> : <AuthorizationPage />}
          />
          <Route
            path="/forgot-password"
            element={username ? <Navigate to="/" /> : <AuthorizationPage />}
          />
          <Route
            path="/reset-password"
            element={username ? <Navigate to="/" /> : <AuthorizationPage />}
          />
          <Route
            path="/"
            element={!username ? <Navigate to="/register" /> : <Home />}
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

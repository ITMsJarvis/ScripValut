import "./App.css";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stocks from "./components/Stocks";
import Investment from "./components/Investment";
import StockHome from "./components/StockHome";
import MutulaFundHome from "./components/MutulaFundHome";
import MutualFund from "./components/MutualFund";
import IndicesTable from "./components/IndicesTable";
import TableComponent from "./components/TableComponent";
import StockPage from "./pages/StockPage";
import ProfilePage from "./pages/ProfilePage";
import Introduction from "./pages/Introduction";
import MutualFundPage from "./pages/MutualFundPage";
import { GetMutualFund } from "./apicalls/MutualFundCalls";
import { isAfter, subMinutes } from "date-fns";

const Container = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

function App() {
  // const [user, setUser] = useState(0);

  const { username } = useSelector((state) => state.users);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let idleTimer;
    const idleTimeout = 5 * 60 * 1000; // 5 minutes (in milliseconds)

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), idleTimeout);
    };

    const handleUserActivity = () => {
      setIsIdle(false);
      resetIdleTimer();
    };

    // Attach event listeners to detect user activity
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("mousedown", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);

    // Start the idle timer when the component mounts
    resetIdleTimer();

    // Clean up event listeners when the component unmounts
    return () => {
      clearTimeout(idleTimer);
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener("mousedown", handleUserActivity);
      document.removeEventListener("touchstart", handleUserActivity);
    };
  }, []);

  if (isIdle) {
    localStorage.clear();
    window.location.reload();
  }

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
          >
            <Route path="/" element={<Introduction />} />
            <Route path="/explore" element={<Stocks />}>
              <Route path="/explore/stocks" element={<StockHome />} />
            </Route>
            <Route path="/explore" element={<MutualFund />}>
              <Route path="/explore/mutualfund" element={<MutulaFundHome />} />
            </Route>
            <Route path="/indices" element={<IndicesTable />} />
            <Route path="/market/:status" element={<TableComponent />} />

            <Route path="/investment" element={<Investment />} />

            <Route path="/stock/:name" element={<StockPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/mutualfund/:name/:code"
              element={<MutualFundPage />}
            />
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

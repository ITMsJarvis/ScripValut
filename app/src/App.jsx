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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

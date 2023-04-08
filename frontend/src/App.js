// eslint-disable-next-line
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import PlayerSearchPage from "./pages/PlayerSearchPage";
import Home from "./pages/Home"

import { UserStore } from "./context/UserStore";


function App() {
  const { userData } = UserStore()
  return (
    <Router>
      <Routes forceRefresh={true}>
        <Route path="/" element={userData === null ? <Navigate to="/login" />  : <Home />} />
        <Route path="/login" element={userData !== null ? <Navigate to="/" />  : <Login />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/player-search" element={userData === null ? <Navigate to="/login" />  : <PlayerSearchPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        {/* 👇️ only match this when no other routes match */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
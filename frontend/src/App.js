// eslint-disable-next-line
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import PlayerSearchPage from "./pages/PlayerSearchPage";
import Home from "./pages/Home"
import PlayerPage from "./pages/PlayerPage";

import { UserStore } from "./context/UserStore";
import TeamSearchPage from "./pages/TeamSearchPage";
import TeamPage from "./pages/TeamPage";
import Profile from "./pages/Profile";


function App() {
  const { userData } = UserStore()
  return (
    <Router>
      <Routes forceRefresh={true}>
        <Route path="/" element={userData === null ? <Navigate to="/login" />  : <Home />} />
        <Route path="/login" element={userData !== null ? <Navigate to="/" />  : <Login />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/player-search" element={userData === null ? <Navigate to="/login" />  : <PlayerSearchPage />} />
        <Route path="/player-search" element={<PlayerSearchPage />} />
        <Route path="/team-search" element={<TeamSearchPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route exact path="/player/:player_name/:player_api_id" element = {<PlayerPage />} />
        <Route exact path="/team/:team_name/:team_api_id" element = {<TeamPage />} />
        {/* 👇️ only match this when no other routes match */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
// eslint-disable-next-line
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes forceRefresh={true}>
        {/* <Route path="/" element={userData === null ? <Navigate to="/login" />  : <Home />} />
          <Route path="/login" element={userData !== null ? <Navigate to="/" />  : <Login />}  /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* 👇️ only match this when no other routes match */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Success from "./components/Success";
import Tracking from "./components/Tracking";
import Home from "./components/Home";
import "./App.css";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setUser(u);
    });
  });
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route
            exact
            index
            path="/login/:slideval"
            element={user ? <Navigate to="/tracking/:slideval" /> : <Login />}
          />
          <Route exact path="/register/:slideval" element={<Register />} />
          <Route exact path="/success/:slideval" element={<Success />} />
          <Route exact path="/tracking/:slideval" element={user?<Tracking />:<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

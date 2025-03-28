import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../src/components/Register";
import Login from "../src/components/Login";
import Dashboard from "../src/components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

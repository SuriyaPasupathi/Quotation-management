import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../src/components/Login";
import Dashboard from "../src/components/Dashboard";
import BulkUpload from "./components/Bulkupload";

function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Bulkupload" element={<BulkUpload />} />

      </Routes>
    </Router>
  );
}

export default App;


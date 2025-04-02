import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../src/components/Login";
import Dashboard from "../src/components/Dashboard";
import BulkUpload from "./components/Bulkupload";
import EnquiryForm from "./components/Enquiry";

function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Bulkupload" element={<BulkUpload />} />
        <Route path="/Enquiry" element={<EnquiryForm />} />
      </Routes>
    </Router>
  );
}

export default App;


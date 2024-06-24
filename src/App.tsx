import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParticipantPage from "./pages/ParticipantPage";
import ResultPage from "./pages/ResultPage";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import DisciplinePage from "./pages/DisciplinePage";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ParticipantPage />} />
            <Route path="/participants" element={<ParticipantPage />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/disciplines" element={<DisciplinePage />} />
            <Route path="/*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

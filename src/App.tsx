import { Routes, Route } from "react-router-dom";
import NavHeader from "./NavHeader";
import ParticipantPage from "./components/ParticipantPage";

function App() {

  return (
    <div>
      <NavHeader />
      <Routes>
        <Route path="/" element={<ParticipantPage />} />
        <Route path="/participants" element={<ParticipantPage />} />
        <Route path="/*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;

import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { CharactersOverview } from "./routes/CharactersOverview";
import { CharacterDetailPage } from "./routes/CharacterDetailPage";

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<CharactersOverview />} />
        <Route
          path="character/:characterId"
          element={<CharacterDetailPage />}
        />
      </Routes>
    </div>
  );
}

export default App;

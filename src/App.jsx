import { allCharacters } from "../data/data";
import { character } from "../data/data";
import { episodes } from "../data/data";

import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList characters={allCharacters} />
        <CharacterDetails character={character} episodes={episodes} />
      </div>
    </div>
  );
}

export default App;

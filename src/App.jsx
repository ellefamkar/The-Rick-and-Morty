import { useState } from "react";
import { allCharacters } from "../data/data";
import { character } from "../data/data";
import { episodes } from "../data/data";

import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResults } from "./components/Navbar";

function App() {
  const [characters, setCharacters] = useState(allCharacters);

  return (
    <div className="app">
      <Navbar>
        <SearchResults searchResultNum={characters.length} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} />
        <CharacterDetails character={character} episodes={episodes} />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children} </div>;
}

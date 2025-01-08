import { useEffect, useState } from "react";
// import { allCharacters } from "../data/data";
import { character } from "../data/data";
import { episodes } from "../data/data";

import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResults } from "./components/Navbar";

function App() {
  const [characters, setCharacters] = useState([]);

  // using fetch
  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((response) => response.json())
  //     .then((data) => setCharacters(data.results.slice(0,6)));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setCharacters(data.results.slice(0, 6));
    }
    fetchData();
  }, []);

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

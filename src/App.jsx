import { useEffect, useState } from "react";
// import { allCharacters } from "../data/data";

import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResults } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useLocalStorage("FAVOURTIES", []);

  // using fetch - catch-then
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((response) => {
  //       if (!response.ok) throw new Error("Something went wrong.");
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setCharacters(data.results.slice(0, 6));
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  // using fetch- async-await
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(
  //         "https://rickandmortyapi.com/api/character"
  //       );

  //       if (!response.ok) throw new Error("Something went wrong.");

  //       const data = await response.json();
  //       setCharacters(data.results.slice(0, 6));
  //     } catch (err) {
  //       toast.error(err.message);
  //       // for rl data project
  //       // err.response.data.message
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // axios

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get("https://rickandmortyapi.com/api/character")
  //     .then(({ data }) => {
  //       setCharacters(data.results.slice(0, 6));
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.message.error);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  const handleSelectCharacter = (id) => {
    setSelectedId(id);
  };

  const handleAddFavourites = (character) => {
    setFavourites((prevFav) => [...prevFav, character]);
  };

  const isAddToFavourites = favourites
    .map((fav) => fav.id)
    .includes(selectedId);

  const handleDeleteFavourites = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults searchResultNum={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavourites}
        />
      </Navbar>
      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          selectedId={selectedId}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetails
          selectedId={selectedId}
          onAddFavourite={handleAddFavourites}
          isAddToFavourites={isAddToFavourites}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children} </div>;
}

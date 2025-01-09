import { useEffect, useState } from "react";
// import { allCharacters } from "../data/data";
import { character } from "../data/data";
import { episodes } from "../data/data";

import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, SearchResults } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacters(data.results.slice(0, 6));
      } catch (err) {
        // console.log(err.response.data.error);
        setCharacters([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }

    fetchData();
  }, [query]);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults searchResultNum={characters.length} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetails character={character} episodes={episodes} />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children} </div>;
}

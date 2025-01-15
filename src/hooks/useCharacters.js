import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useCharacters(url, query){
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
        
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${url}=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 6));
      } catch (err) {
        // console.log(err.response.data.error);
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return {isLoading, characters}
}
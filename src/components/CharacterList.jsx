import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";

function CharacterList({
  selectedId,
  characters,
  isLoading,
  onSelectCharacter,
}) {
  return (
    <div className="characters-list">
      {isLoading ? (
        <Loading />
      ) : (
        characters.map((item) => (
          <Character key={item.id} character={item}>
            <button
              className="icon red"
              onClick={() => onSelectCharacter(item.id)}
            >
              {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </Character>
        ))
      )}
    </div>
  );
}

export default CharacterList;

export function Character({ children, character }) {
  return (
    <div className="list__item">
      <img src={character.image} alt={character.name} />
      <h3 className="name">
        <span>{character.gender === "Male" ? "👨" : "👩"}</span>
        <span>{character.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${character.status === "Dead" ? "red" : ""}`}
        ></span>
        <span> {character.status}</span>
        <span> - {character.species}</span>
      </div>
      {children}
    </div>
  );
}

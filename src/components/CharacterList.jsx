import { EyeIcon } from "@heroicons/react/24/outline";

function CharacterList({ characters }) {
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} character={item} />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ character }) {
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
      <button className="icon red">
        <EyeIcon />
      </button>
    </div>
  );
}

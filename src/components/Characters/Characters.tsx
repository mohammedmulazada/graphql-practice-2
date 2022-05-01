import { Link } from "react-router-dom";
import { GetCharactersQuery } from "../../generated/graphql";
import { Character } from "../Character/Character";

type Props = {
  characters: GetCharactersQuery["characters"];
};

export const Characters = (props: Props) => {
  const { characters } = props;

  if (!characters?.results?.length) {
    return null;
  }

  return (
    <ul>
      {characters.results.map((character) => {
        if (!character) {
          return null;
        }
        return (
          <div key={character.id}>
            <Character character={character} />
            <Link to={`/character/${character.id}`}>To {character.name}</Link>
          </div>
        );
      })}
    </ul>
  );
};

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
        return (
          !!character && <Character key={character.id} character={character} />
        );
      })}
    </ul>
  );
};

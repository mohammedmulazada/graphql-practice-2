import { GetCharactersQuery } from "../../generated/graphql";

type AllCharacterResults = NonNullable<GetCharactersQuery["characters"]>;
type AllCharacters = NonNullable<AllCharacterResults["results"]>;
type CharacterType = AllCharacters[number];

type Props = {
  character: CharacterType;
};

export const Character = (props: Props) => {
  const { character } = props;

  if (!character) {
    return null;
  }

  return (
    <li>
      {character.name}{" "}
      {character.image && (
        <img alt={`${character?.name}`} src={character.image} />
      )}
    </li>
  );
};

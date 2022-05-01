import { GetCharactersQuery } from "../../generated/graphql";

type Test = NonNullable<GetCharactersQuery["characters"]>;
type Wep = NonNullable<Test["results"]>;
type TT = Wep[number];

type Props = {
  character: TT;
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

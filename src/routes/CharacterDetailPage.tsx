import { useParams } from "react-router-dom";
import { Character } from "../components/Character/Character";
import { useGetCharacterQuery } from "../generated/graphql";

export const CharacterDetailPage = () => {
  const { characterId } = useParams();
  const { data, loading, error } = useGetCharacterQuery({
    variables: {
      id: characterId || "1",
    },
    skip: !characterId,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.character || error) {
    return null;
  }

  const { character } = data;

  return <Character character={character} />;
};

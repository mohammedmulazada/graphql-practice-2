import { useGetCharactersQuery } from "../../generated/graphql";
import { Characters } from "./Characters";

export const CharactersContainer = () => {
  const { data, loading, error } = useGetCharactersQuery();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data || !data.characters || !data.characters.results) {
    return null;
  }

  return <Characters characters={data.characters} />;
};

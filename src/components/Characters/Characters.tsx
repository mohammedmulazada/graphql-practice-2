import { useGetCharactersQuery } from "../../generated/graphql";

export const Characters = () => {
  const { data, loading, error } = useGetCharactersQuery();

  if (loading) {
    return <p>loading</p>;
  }

  if (error || !data || !data.characters || !data.characters.results) {
    return null;
  }

  const { results } = data.characters;

  return (
    <ul>
      {results.map((character) => {
        return !!character && <li key={character.id}>{character.name}</li>;
      })}
    </ul>
  );
};

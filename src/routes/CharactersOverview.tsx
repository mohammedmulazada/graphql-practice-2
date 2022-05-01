import { useGetCharactersQuery } from "../generated/graphql";
import { Characters } from "../components/Characters/Characters";
import { useState } from "react";

export const CharactersOverview = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error, fetchMore } = useGetCharactersQuery();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data || !data.characters || !data.characters.results) {
    return null;
  }

  const handleFetchMore = () => {
    fetchMore({
      variables: { page: page + 1 },
      updateQuery: (prev, { fetchMoreResult, variables }) => {
        setPage(variables.page);

        if (!prev.characters?.results || !fetchMoreResult.characters?.results) {
          return prev;
        }

        return {
          ...prev,
          characters: {
            ...prev.characters,
            results: [
              ...prev.characters?.results,
              ...fetchMoreResult.characters.results,
            ],
          },
        };
      },
    });
  };

  return (
    <>
      <Characters characters={data.characters} />
      <button type="button" onClick={handleFetchMore}>
        Load more
      </button>
    </>
  );
};

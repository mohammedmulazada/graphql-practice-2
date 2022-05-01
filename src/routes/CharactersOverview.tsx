import { useGetCharactersQuery } from "../generated/graphql";
import { Characters } from "../components/Characters/Characters";
import { useEffect, useRef, useState } from "react";

export const CharactersOverview = () => {
  const [page, setPage] = useState(1);

  const loadRef = useRef<HTMLDivElement>(null);
  const { data, loading, error, fetchMore } = useGetCharactersQuery();

  useEffect(() => {
    if (!data?.characters) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (
        entry.isIntersecting &&
        data?.characters?.info?.pages &&
        page < data.characters.info.pages
      ) {
        fetchMore({
          variables: { page: page + 1 },
          updateQuery: (prev, { fetchMoreResult, variables }) => {
            setPage(variables.page);

            if (
              !prev.characters?.results ||
              !fetchMoreResult.characters?.results
            ) {
              return prev;
            }

            return {
              ...prev,
              characters: {
                ...prev.characters,
                results: [
                  ...prev.characters.results,
                  ...fetchMoreResult.characters.results,
                ],
              },
            };
          },
        });
      }
    });

    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchMore, page, data?.characters]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data || !data.characters || !data.characters.results) {
    return null;
  }

  return (
    <>
      <Characters characters={data.characters} />
      <div ref={loadRef}>Infinite Scroll Trigger</div>
    </>
  );
};

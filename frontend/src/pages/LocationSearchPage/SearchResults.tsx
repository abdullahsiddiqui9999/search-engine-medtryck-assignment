import { LocationSearchResult } from "./";

const SearchResults = ({
  locationsSearchResult,
}: {
  locationsSearchResult: {
    loaded: boolean;
    loading: boolean;
    data?: LocationSearchResult;
  };
}) => {
  if (!locationsSearchResult.loaded && !locationsSearchResult.loading)
    return <p className="text-center">No data available</p>;

  if (locationsSearchResult.loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!locationsSearchResult.data?.results.length) {
    return <p className="text-center">No locations found</p>;
  }

  return (
    <>
      <div className="py-2 space-y-1">
        <div className="flex">
          <p className="w-1/2">
            <span className="font-semibold">Total Hits: </span>{" "}
            {locationsSearchResult.data.totalHits}
          </p>
          <p className="w-1/2">
            <span className="font-semibold">Total Documents: </span>{" "}
            {locationsSearchResult.data.totalDocuments}
          </p>
        </div>

        <hr />
        {locationsSearchResult.data?.results.map((location) => (
          <div className="bg-slate-400 border rounded p-3" key={location.id}>
            <h3 className="text-xl">{location.name}</h3>
            <div className="flex flex-wrap mt-1">
              <p className="w-1/2">
                <span className="font-semibold">Latitude: </span>{" "}
                {location.position.lat}
              </p>
              <p className="w-1/2">
                <span className="font-semibold">Longitude: </span>{" "}
                {location.position.lng}
              </p>
              <p className="w-1/2">
                <span className="font-semibold">Distance: </span>{" "}
                {location.distance}
              </p>
              <p className="w-1/2">
                <span className="font-semibold">Score: </span> {location.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;

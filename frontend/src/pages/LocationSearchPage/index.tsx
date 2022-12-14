import { useState } from "react";
import SearchResults from "./SearchResults";
import SearchForm from "./SearchForm";

interface GeoLocation {
  lat: number;
  lng: number;
}

interface Location {
  id: number;
  name: string;
  position: GeoLocation;
  distance: string;
  score: number;
}

export interface LocationSearchResult {
  totalHits: number;
  totalDocuments: number;
  results: Location[];
}

const LocationSearchPage = () => {
  const [locations, setLocations] = useState<{
    loaded: boolean;
    loading: boolean;
    data?: LocationSearchResult;
  }>({
    loaded: false,
    loading: false,
  });

  const locationFormSubmitHandler = (
    setSubmitting: (isSubmitting: boolean) => void,
    searchString: string,
    latitude: number,
    longitude: number
  ) => {
    fetchLocations(searchString, latitude, longitude, () =>
      setSubmitting(false)
    );
  };

  const fetchLocations = (
    searchString: string,
    latitude: number,
    longitude: number,
    onComplete: () => void
  ) => {
    setLocations({ loaded: false, loading: true, data: undefined });
    fetch(
      `http://localhost:8080/locations/search.json?text=${searchString}&latitude=${latitude}&longitude=${longitude}`
    )
      .then((res) => res.json())
      .then(
        (result: LocationSearchResult) => {
          setLocations({ loaded: true, loading: false, data: result });
          onComplete();
        },
        (error) => {
          console.error(error);
          setLocations({ loaded: false, loading: false, data: undefined });
          onComplete();
        }
      );
  };

  return (
    <div className="h-[100vh] w-full">
      <div className="flex h-full items-center justify-center">
        <div className="border rounded py-2 px-10">
          <h1 className="text-4xl mt-4">Location Search</h1>
          <hr />

          <SearchForm onFormSubmit={locationFormSubmitHandler} />

          <div className="mt-2">
            <SearchResults locationsSearchResult={locations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearchPage;

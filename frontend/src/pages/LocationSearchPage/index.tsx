import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import SearchResults from "./SearchResults";

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
  const [Locations, setLocations] = useState<{
    loaded: boolean;
    loading: boolean;
    data?: LocationSearchResult;
  }>({
    loaded: false,
    loading: false,
  });

  const LocationFormSchema = Yup.object().shape({
    searchString: Yup.string().min(1, "Too Short!").required("Required"),
    latitude: Yup.number()
      .min(1, "Must be greater than 0")
      .required("Required"),
    longitude: Yup.number()
      .min(1, "Must be greater than 0")
      .required("Required"),
  });

  const inputFieldStyles =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const errorStyles = "text-red-500 text-sm";

  const fetchLocations = (
    searchString: string,
    latitude: number,
    longitude: number,
    onComplete: (isSubmitting: boolean) => void
  ) => {
    setLocations({ loaded: false, loading: true, data: undefined });
    fetch(
      `http://localhost:8080/locations/search.json?text=${searchString}&latitude=${latitude}&longitude=${longitude}`
    )
      .then((res) => res.json())
      .then(
        (result: LocationSearchResult) => {
          setLocations({ loaded: true, loading: false, data: result });
          onComplete(false);
        },
        (error) => {
          console.error(error);
          setLocations({ loaded: false, loading: false, data: undefined });
          onComplete(false);
        }
      );
  };

  return (
    <div className="h-[100vh] w-full">
      <div className="flex h-full items-center justify-center">
        <div className="border rounded py-2 px-10">
          <h1 className="text-4xl mt-4">Location Search</h1>
          <hr />

          <Formik
            initialValues={{ searchString: "", latitude: 0, longitude: 0 }}
            validationSchema={LocationFormSchema}
            onSubmit={(values, { setSubmitting }) => {
              fetchLocations(
                values.searchString,
                values.latitude,
                values.longitude,
                setSubmitting
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex flex-col mt-3">
                  <Field
                    type="text"
                    name="searchString"
                    className={inputFieldStyles}
                    placeholder="Search Locations"
                  />
                  <ErrorMessage
                    name="searchString"
                    component="div"
                    className={errorStyles}
                  />

                  <div className="flex mt-2 space-x-2">
                    <div className="w-1/2">
                      <Field
                        type="number"
                        name="latitude"
                        className={inputFieldStyles}
                        placeholder="Latitude"
                      />
                      <ErrorMessage
                        name="latitude"
                        component="div"
                        className={errorStyles}
                      />
                    </div>
                    <div className="w-1/2">
                      <Field
                        type="number"
                        name="longitude"
                        className={inputFieldStyles}
                        placeholder="longitude"
                      />
                      <ErrorMessage
                        name="longitude"
                        component="div"
                        className={errorStyles}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Fetch
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <SearchResults locationsSearchResult={Locations} />
        </div>
      </div>
    </div>
  );
};

export default LocationSearchPage;

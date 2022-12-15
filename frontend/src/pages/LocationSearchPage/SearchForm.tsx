import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const SearchForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (
    setSubmitting: (isSubmitting: boolean) => void,
    searchString: string,
    latitude: number,
    longitude: number
  ) => void;
}) => {
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

  return (
    <Formik
      initialValues={{ searchString: "", latitude: 0, longitude: 0 }}
      validationSchema={LocationFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit(
          setSubmitting,
          values.searchString,
          values.latitude,
          values.longitude
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
                <label className=" text-sm font-bold">Latitude</label>
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
                <label className=" text-sm font-bold">Longitude</label>
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
  );
};

export default SearchForm;

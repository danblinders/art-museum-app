import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import MuseumApi from '../../service/MuseumApi';
import './SearchForms.scss';

const SearchForms = () => {
  return (
    <section className="search-forms">
      <div className="container">
        <div className="search-forms__wrapper">
          <SearchFormByTitle/>
          <SearchFormByArtist/>
        </div>
      </div>
    </section>
  );
};

const SearchFormByTitle = () => {
  const navigate = useNavigate();

  return (
    <div className="title-form">
      <h3 className="label-cta-text title-form__name">Search for Artwork!</h3>
      <Formik
        initialValues={{term: '', medium: '', date: '', geoLocation: ''}}
        validate={values => {
          const errors = {};

          if (!values.term) {
            errors.term = 'Required';
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          const {term, ...filters} = values;
          let queryString = `/artworks?q=${term}&title=true`;

          Object.entries(filters)?.forEach(([key, value]) => queryString += value ? `&${key}=${value}` : '');

          resetForm();

          navigate(queryString);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form action="#" method="get" className="title-form__wrapper" onSubmit={handleSubmit}>
            <label htmlFor="" className="title-form__field">
              <span className="title-form__label">Title</span>
              <input type="text" className="title-form__input" name="term" value={values.term} onChange={handleChange}/>
              {errors.term && touched.term && errors.term}
            </label>
            <label htmlFor="" className="title-form__field">
              <span className="title-form__label">Type of artwork</span>
              <input type="text" className="title-form__input" name="medium" value={values.medium} onChange={handleChange}/>
              {errors.medium && touched.medium && errors.medium}
            </label>
            <label htmlFor="" className="title-form__field">
              <span className="title-form__label">Date Range</span>
              <input type="text" className="title-form__input" name="date" value={values.date} onChange={handleChange}/>
              {errors.date && touched.date && errors.date}
            </label>
            <label htmlFor="" className="title-form__field">
              <span className="title-form__label">Geolocation</span>
              <input type="text" className="title-form__input" name="geoLocation" value={values.geoLocation} onChange={handleChange}/>
              {errors.geoLocation && touched.geoLocation && errors.geoLocation}
            </label>
            <button type="submit" className="title-form__submit" disabled={isSubmitting}>Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

const SearchFormByArtist = () => {
  const MuseumServiceApi = new MuseumApi();

  return (
    <div className="artist-form">
      <h3 className="label-cta-text artist-form__name">Search for Artist's collection!</h3>
      <Formik
        initialValues={{term: ''}}
        validate={values => {
          const errors = {};
          if (!values.term) {
            errors.term = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          MuseumServiceApi.getArtworksWithFilters(values.term).then(result => {
            console.log(result);
            resetForm();
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form action="#" method="get" className="artist-form__wrapper" onSubmit={handleSubmit}>
            <input type="text" className="artist-form__input" name="term" value={values.term} onChange={handleChange}/>
            {errors.term && touched.term && errors.term}
            <button type="submit" className="artist-form__submit" disabled={isSubmitting}>Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForms;
import { useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@mui/material';
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
  const
    rangeSliderLabelRef = useRef(),
    rangeSliderRef = useRef();

  const yearMin = -10000, yearMax = new Date().getFullYear();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {term: '', medium: '', dateBegin: yearMin, dateEnd: yearMax, geoLocation: ''},
    validate: values => {
      const errors = {};

      if (!values.term) {
        errors.term = 'Required';
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      const {term, ...filters} = values;

      let queryString = '/search?title=true';

      Object.entries(filters)?.forEach(([key, value]) => queryString += value ? `&${key}=${value}` : '');

      queryString += `&q=${term}`;

      resetForm();

      navigate(queryString);
    }
  });

  const formYearRangeString = (...years) => {
    const formattedYears = years.map(year => {
      return +year >= 0 ? year + ' A.D' : year.toString().replace(/-/, '') + ' B.C';
    });
    return `${formattedYears[0]} - ${formattedYears[1]}`;
  };

  return (
    <div className="title-form">
      <h3 className="label-cta-text title-form__name">Search for Artwork!</h3>
      <form action="#" method="get" className="title-form__wrapper" onSubmit={formik.handleSubmit}>
        <label className="title-form__field">
          <span className="title-form__label">Title</span>
          <input
            type="text"
            className="title-form__input"
            name="term"
            value={formik.values.term}
            onChange={formik.handleChange}/>
          {formik.errors.term && formik.touched.term && formik.errors.term}
        </label>
        <label className="title-form__field">
          <span className="title-form__label">Type of artwork</span>
          <input
            type="text"
            className="title-form__input"
            name="medium" value={formik.values.medium}
            onChange={formik.handleChange}/>
          {formik.errors.medium && formik.touched.medium && formik.errors.medium}
        </label>
        <div className="title-form__range-field">
          <span className="title-form__range-label">{'Release years: '}
            <span ref={rangeSliderLabelRef}>
              {formYearRangeString(formik.values.dateBegin, formik.values.dateEnd)}
            </span>
          </span>
          <Slider
            ref={rangeSliderRef}
            getAriaLabel={() => 'Artworks\' release date range'}
            min={yearMin}
            step={1}
            max={yearMax}
            defaultValue={[yearMin, yearMax]}
            valueLabelDisplay="auto"
            onChange={(e, dates) => {
              formik.setFieldValue('dateBegin', dates[0]);
              formik.setFieldValue('dateEnd', dates[1]);

              rangeSliderLabelRef.current.textContent = formYearRangeString(...dates);
            }}
          />
        </div>
        <label className="title-form__field">
          <span className="title-form__label">Geolocation</span>
          <input
            type="text"
            className="title-form__input"
            name="geoLocation"
            value={formik.values.geoLocation}
            onChange={formik.handleChange}/>
          {formik.errors.geoLocation && formik.touched.geoLocation && formik.errors.geoLocation}
        </label>
        <button type="submit" className="title-form__submit" disabled={formik.isSubmitting}>Submit</button>
      </form>
    </div>
  );
};

const SearchFormByArtist = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {term: ''},
    validate: values => {
      const errors = {};
      if (!values.term) {
        errors.term = 'Required';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      let queryString = `/search?artistOrCulture=true&q=${values.term}`;
      resetForm();
      navigate(queryString);
    }
  });

  return (
    <div className="artist-form">
      <h3 className="label-cta-text artist-form__name">Search for Artist's collection!</h3>
      <form action="#" method="get" className="artist-form__wrapper" onSubmit={formik.handleSubmit}>
        <input type="text" className="artist-form__input" name="term" value={formik.values.term} onChange={formik.handleChange}/>
        {formik.errors.term && formik.touched.term && formik.errors.term}
        <button type="submit" className="artist-form__submit" disabled={formik.isSubmitting}>Submit</button>
      </form>
    </div>
  );
};

export default SearchForms;
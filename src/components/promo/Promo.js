import heroImage from './img/hero-image.jpg';
import './Promo.scss';

const Promo = () => {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo__content">
          <div className="promo__info">
            <h1 className="title promo__title">The Metropolitan Museum of Art</h1>
            <div className="promo__description">
              The Metropolitan Museum of Art of New York City, colloquially
              "the Met", is the largest art museum in the Western Hemisphere.
              Its permanent collection contains over two million works,
              divided among 17 curatorial departments.
            </div>
            <div className="promo__add-info">
              <a href="https://www.metmuseum.org/" className="link link promo__link">Read more</a>
            </div>
          </div>
          <div className="promo__hero">
            <img src={heroImage} alt="#" className="promo__hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;

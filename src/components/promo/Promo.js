import heroImage from './img/hero-image.jpg';
import './Promo.scss';

const Promo = () => {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo__content">
          <div className="promo__info">
            <h1 className="title promo__title">Text</h1>
            <div className="promo__description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, tenetur?
            </div>
            <a href="https://www.metmuseum.org/" className="link promo__link">Read more</a>
          </div>
          <div className="promo__hero">
            <img src={heroImage} alt="#" className="promo__her-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;

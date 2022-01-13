import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <a href="#" className="header__logo">
            <img src="#" alt="logo" className="header__logo-image" />
          </a>
          <div className="header__contacts">
            <div className="header__phone">Tel: <span>88000553535</span> </div>
            <div className="header__email">Email: <span>email@gmail.com</span> </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
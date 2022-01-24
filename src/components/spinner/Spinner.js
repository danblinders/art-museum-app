import spinner from './spinner.svg';
import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinner} alt="spinner" className="spinner__image" />
    </div>
  );
};

export default Spinner;

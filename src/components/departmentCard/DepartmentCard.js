import { useNavigate } from 'react-router-dom';
import './DepartmentCard.scss';

const DepartmentCard = ({departmentInfo}) => {
  const {departmentId, departmentImageURL, displayName} = departmentInfo;

  const navigate = useNavigate();
  
  return (
    <div
      key={departmentId}
      className="departments-card"
      style={{background: `url(${departmentImageURL}) center center / cover no-repeat, hsla(0, 0%, 0%, 0.4)`}}
      onClick={() => navigate(`/departments/${departmentId}`)}>
      <div className="departments-card__name">{displayName}</div>
    </div>
  );
};

export default DepartmentCard;

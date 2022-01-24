import DepartmentsList from '../../departmentsList/DepartmentsList';
import SearchForms from '../../searchForms/SearchForms';
import ErrorBdoundary from '../../errorBoundary/ErrorBoundary';

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <ErrorBdoundary>
        <DepartmentsList/>
      </ErrorBdoundary>
      <SearchForms/>
    </>
  );
};

export default HomePage;
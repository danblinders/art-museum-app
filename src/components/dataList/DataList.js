import { useEffect, useState, useRef } from 'react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import './DataList.scss';

const DataList = ({
  dataIds,
  changeOffset,
  noFutureDataToLoad,
  transformation: [transformFunc, ...transformFuncArgs]
}) => {
  const [dataList, setDataList] = useState(null);
  
  const buttonRef = useRef();
  
  useEffect(() => {
    transformFunc(dataIds, ...transformFuncArgs)
      .then(result => {
        if (buttonRef.current) {
          buttonRef.current.disabled = false;
        }
        setDataList(currentData => currentData ? [...currentData, ...result] : result);
      });
  }, [dataIds, transformFunc]);

  return (
    <ErrorBoundary>
      <div className="data__wrapper">
        <div className="data__list">
          {dataList}
        </div>
        {
          noFutureDataToLoad ?
            null
            :
            <button
              ref={buttonRef}
              className={`data__load-btn btn ${!dataList ? 'btn_hidden' : ''}`}
              onClick={() => {
                buttonRef.current.disabled = true;
                changeOffset();
              }}>
              Load More
            </button>
        }
      </div>
    </ErrorBoundary>
  );;
};

export default DataList;

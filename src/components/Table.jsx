import React from 'react';
import Row from './Row';

import './Table.scss';

const Table = ({ timers, updateTimer, createTimer, deleteTimer }) => {
  return (
    <div className='table'>
      <div className='rows'>
        {timers.map((timer, index) => {
          return (
            <Row
              key={index}
              index={index}
              timer={timer}
              updateTimer={updateTimer}
              deleteTimer={deleteTimer}
            />
          );
        })}
      </div>
      <button
        className='btn-create'
        onClick={() => {
          createTimer();
        }}>
        New Timer
      </button>
    </div>
  );
};

export default Table;

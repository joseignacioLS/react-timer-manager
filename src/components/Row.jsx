import React, { useEffect, useState } from 'react';
import { formatDate, milisecondsToSize, milisecondsToTime } from '../utils/utils';

import './Row.scss';

const Row = ({ timer, index, updateTimer, deleteTimer }) => {
  const calculateWorkTime = () => {
    const timers = [...timer.workTime];
    if (timers.length % 2 !== 0) {
      timers.push(new Date());
    }

    const workTime = timers.reduce(
      (acc, curr) => {
        if (!acc.prev) return { ...acc, prev: curr };
        return {
          total: (acc.total += curr.getTime() - acc.prev.getTime()),
          prev: undefined,
        };
      },
      { total: 0, prev: undefined }
    ).total;

    return [milisecondsToTime(workTime), milisecondsToSize(workTime)];
  };

  const [workTime, setWorkTime] = useState(calculateWorkTime(timer.workTime));

  const handleUpdateTimer = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    updateTimer(index, key, value);
  };

  const handleToggleTimer = (e) => {
    updateTimer(index, 'workTime', [...timer.workTime, new Date()]);
    updateTimer(index, 'status', 'ON');
  };

  useEffect(() => {
    if (timer.workTime.length % 2 === 0) return;
    const interval = setInterval(() => {
      setWorkTime(calculateWorkTime());
    }, 500);

    return () => clearInterval(interval);
  }, [timer.workTime.length]);

  return (
    <div className='row'>
      <span className='size'>{workTime[1]}</span>
      <div className='inputs'>
        <input
          className='timer-name'
          key='name'
          name='name'
          onInput={(e) => {
            handleUpdateTimer(e);
          }}
          value={timer.name}
          autoComplete='off'
        />
        <input
          className='timer-project'
          key='project'
          name='project'
          onInput={(e) => {
            handleUpdateTimer(e);
          }}
          value={timer.project}
          autoComplete='off'
        />
      </div>
      <span className='dates'>
        {timer.workTime.length && formatDate(timer.workTime[0])}{' '}
        {timer.workTime.length && timer.workTime.length % 2 === 0
          ? formatDate(timer.workTime[timer.workTime.length - 1])
          : ''}
      </span>
      <span className='time'>{workTime[0]}</span>
      <div className='actions'>
        <button onClick={(e) => handleToggleTimer(e)}>
          {timer.workTime.length % 2 === 0 ? '▶' : '⏹'}
        </button>
        <button onClick={(e) => deleteTimer(index)}>❌</button>
      </div>
    </div>
  );
};

export default Row;

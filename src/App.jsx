import { useEffect, useState } from 'react';
import { Timer } from './classes/Timer';
import Table from './components/Table';

import './App.scss';

const updateLocalStorage = (value) => {
  localStorage.setItem('timers', JSON.stringify(value));
};

function App() {
  const [timers, setTimers] = useState([]);

  const updateTimer = (index, key, value) => {
    setTimers((oldValue) => {
      const newValue = oldValue.map((timer) => Object.assign({}, timer));
      newValue[index][key] = value;
      updateLocalStorage(newValue);
      return newValue;
    });
  };

  const createTimer = () => {
    setTimers((oldValue) => {
      const newValue = [
        ...oldValue.map((timer) => Object.assign({}, timer)),
        new Timer(),
      ];
      updateLocalStorage(newValue);
      return newValue;
    });
    updateLocalStorage();
  };

  const deleteTimer = (index) => {
    setTimers((oldValue) => {
      const newValue = oldValue.map((timer) => Object.assign({}, timer));
      newValue.splice(index, 1);
      updateLocalStorage(newValue);
      return newValue;
    });
  };

  useEffect(() => {
    setTimers(() => {
      const storage = localStorage.getItem('timers');
      if (!storage) return [];

      return JSON.parse(storage).map((timer) => {
        timer.workTime = timer.workTime.map((str) => new Date(str));
        return timer;
      });
    });
  }, []);

  return (
    <div className='App'>
      <header>Timer App</header>
      <main>
        <Table
          timers={timers}
          updateTimer={updateTimer}
          createTimer={createTimer}
          deleteTimer={deleteTimer}
        />
      </main>
    </div>
  );
}

export default App;

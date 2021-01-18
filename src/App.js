/*global chrome*/

import React, { useState } from 'react'
import './App.css';

function App() {

  const [needAlarm, setNeedAlarm ] = useState(true)
  const [workTime, setWorkTime] = useState(0.05)
  const [breakTime, setBreakTime] = useState(0.05)
  
  const createAlarm = () => {
    if (needAlarm) {
      chrome.alarms.create('workEnd', {
        delayInMinutes: workTime, periodInMinutes: workTime
      })
      chrome.alarms.create('workStart', {
        delayInMinutes: (workTime + breakTime), periodInMinutes: (workTime + breakTime)
      })
    }
    setNeedAlarm(false)
  }

  const cancelAlarm = () => {
    chrome.alarms.clearAll(() => {
      alert('Work Session ended')
    })
  }

  return (
    <div className="App">
      <h1>Pomodoro</h1>
      <p>An effective Way of working</p>
      <button onClick={() => setWorkTime(1)}>1</button>
      <button onClick={() => setBreakTime(1)}>2</button>
      <p>Work for {workTime} minutes, then take break for {breakTime} minutes</p>
      <button id='App__toggleAlarm' onClick={createAlarm} >Create Alarm</button>
      <button id='App__toggleAlarm' onClick={cancelAlarm} >Remove Alarm</button>
    </div>
  );
}

export default App;

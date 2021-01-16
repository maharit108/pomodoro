/*global chrome*/

import React, { useState } from 'react'
import './App.css';

function App() {

  const [needAlarm, setNeedAlarm ] = useState(true)
  const [workTime, setWorkTime] = useState(0)
  const [breakTime, setBreakTime] = useState(0)
  
  const createAlarm = () => {
    if (needAlarm) {
      chrome.alarms.create('workEnd', {
        delayInMinutes: workTime, periodInMinutes: workTime
      })
      chrome.alarms.create('workStart', {
        delayInMinutes: (workTime+breakTime), periodInMinutes: (workTime+breakTime)
      })
    }
    setNeedAlarm(false)
  }

  const cancelAlarm = () => {
    chrome.alarms.clearAll(() => {
      alert('Work Session ended')
      console.log('All alarms removed')
    })
  }

  return (
    <div className="App">
      <h1>Pomodoro</h1>
      <p>An effective Way of working</p>
      <input name='workTime' value={workTime} type='text' placeholder='25-35 mins is most effective' onChange={e => setWorkTime(e.target.value)}>Work Time Duration</input>
      <input name='breakTime' value={breakTime} type='text' placeholder='5-10 mins is most effective' onChange={e => setBreakTime(e.target.value)}>Break Time Duration</input>
      <button id='App__toggleAlarm' onClick={createAlarm} >Create Alarm</button>
      <button id='App__toggleAlarm' onClick={cancelAlarm} >Remove Alarm</button>
    </div>
  );
}

export default App;

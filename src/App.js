/*global chrome*/

import React, { useState } from 'react'
import './App.css';

import ModalAlert from './ModalAlert.jsx'

function App() {

  const [workTime, setWorkTime] = useState(0.05)
  const [breakTime, setBreakTime] = useState(0.05)
  
  const createAlarm = () => {
    chrome.alarms.create('breakStart', {
      delayInMinutes: workTime
    })
    window.close()
  }

  const cancelAlarm = () => {
    chrome.alarms.clearAll(() => {
      <ModalAlert title='Work End' body='All Alarms Removed. Pomodoro Work Sessions End.' />
      window.close()
    })
  }

  return (
    <div className="App">
      <h1>Pomodoro</h1>
      <p>An effective Way of working</p>
      <h2>Work Session Duration</h2>
      <button onClick={setWorkTime(2)}>2 Mins</button>
      <button onClick={setWorkTime(25)}>25 Mins</button>
      <button onClick={setWorkTime(30)}>30 Mins</button>
      <button onClick={setWorkTime(35)}>35 Mins</button>
      <button onClick={setWorkTime(40)}>40 Mins</button>
      <h2>Break Duration</h2>
      <button onClick={setBreakTime(1)}>1 Mins</button>
      <button onClick={setBreakTime(5)}>5 Mins</button>
      <button onClick={setBreakTime(10)}>10 Mins</button>
      <button onClick={setBreakTime(15)}>15 Mins</button>
      <p>Work for {workTime} minutes, then take break for {breakTime} minutes</p>
      <button id='App__toggleAlarm' onClick={createAlarm} >Create Alarm</button>
      <button id='App__toggleAlarm' onClick={cancelAlarm} >Remove Alarm</button>
    </div>
  );
}

export default App;

/*global chrome*/

import React, { useState } from 'react'
import './App.css';

import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import pomodoro from './pomodoro.jpg'

function App() {

  const [workTime, setWorkTime] = useState(0.1)
  const [breakTime, setBreakTime] = useState(0.1)

  const createAlarm = () => {
    chrome.browserAction.setBadgeText({ text: 'ON'})
    chrome.alarms.create('breakStart', {
      delayInMinutes: workTime, periodInMinutes: (workTime + breakTime)
    })
    chrome.alarms.create('workStart', {
      delayInMinutes: (workTime + breakTime), periodInMinutes: (workTime + breakTime)
    })
    window.close()
  }

  const cancelAlarm = () => {
    chrome.alarms.clearAll(() => {
      chrome.browserAction.setBadgeText({ text: 'OFF'})
      alert('Pomodoro Work Sessions End!!! \n \n All Alarms have been removed')
      window.close()
    })
  }

  return (
    <div className="App">
      <h1>Pomodoro</h1>
      <p>An effective way of working/learning.</p>
      <div className='tomatoImg'><img src={pomodoro} alt='tomato' /></div>
      
      <h2>Work Session Duration</h2>
      
      <div className='workTime'>
        <AccessAlarmsIcon />
        <div>
          <button onClick={() => setWorkTime(25)}>25</button>
          <button onClick={() => setWorkTime(30)}>30</button>
          <button onClick={() => setWorkTime(35)}>35</button>
          <button onClick={() => setWorkTime(40)}>40</button>
          <button onClick={() => setWorkTime(40)}>50</button>
        </div>
        <p>minutes</p>
      </div>
      
      <h2>Break Duration</h2>
      <div className='breakTime'>
        <AccessAlarmsIcon /> 
        <div>
         <button onClick={() => setBreakTime(5)}>5</button>
         <button onClick={() => setBreakTime(10)}>10</button>
         <button onClick={() => setBreakTime(15)}>15</button>
        </div>
        <p>minutes</p>
      </div>
      <br />
      <p className='summary'>Work for <span>{workTime}</span> minutes, then take break for <span>{breakTime}</span> minutes</p>
      <br />
      <div className='foot'>
        <button className='alarmBtn' id='alarmBtn_create' onClick={createAlarm}>Create Alarm</button>
        <button className='alarmBtn' id='alarmBtn_remove' onClick={cancelAlarm}>Remove Alarm</button>
      </div>
    </div>
  );
}

export default App;

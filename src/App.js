/*global chrome*/

import React, { useState, useEffect } from 'react'
import './App.css'

import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms'
import pomodoro from './pomodoro.jpg'

function App() {

  const [workTime, setWorkTime] = useState(0)
  const [breakTime, setBreakTime] = useState(0)

  const createAlarm = () => {
    if (workTime && breakTime) {
      // set badge to 'ON' when there is an alarm
      chrome.browserAction.setBadgeText({ text: 'ON'})
      // 1st alarm to start break
      chrome.alarms.create('breakStart', {
        delayInMinutes: workTime, periodInMinutes: (workTime + breakTime)
      })
      // 2nd alarm to end break
      chrome.alarms.create('workStart', {
        delayInMinutes: (workTime + breakTime), periodInMinutes: (workTime + breakTime)
      })
      // store work and breaktime in local storage
      chrome.storage.local.set({'workT': workTime})
      chrome.storage.local.set({'breakT': breakTime})
      // close window after alarms created
      window.close()
    } else {
      // if no durations selected
      alert('Please Select Work and Break Sessions Duration')
    }
  }

  // when all alarms removed.
  const cancelAlarm = () => {
    // remove work and breaktime from local storage
    chrome.storage.local.clear(function() {
      let error = chrome.runtime.lastError
      if (error) {
        console.log(error)
      }
    })
    // remove all alarms
    chrome.alarms.clearAll(() => {
      chrome.browserAction.setBadgeText({ text: 'OFF'})
      alert('Pomodoro Work Sessions End!!! \n \n All Alarms have been removed')
      window.close()
    })
  }

  //on component mount
  useEffect(() => {
    // disable/enable create and remove alarm button based of if there aleardy are alarms or not
    chrome.alarms.getAll((alarmsArr) => {
      if(alarmsArr.length === 0) {
        document.getElementById('alarmBtn_remove').disabled = true
        document.getElementById('timeSelect').style.display = 'block'
      } else {
        document.getElementById('alarmBtn_create').disabled = true
        document.getElementById('timeSelect').style.display = 'none'
        // check work and break time in local storage, if present set state to that value
        chrome.storage.local.get(null, function(data) {
          if (data['workT']) {
            setWorkTime(data['workT'])
          }
          if (data['breakT']) {
            setBreakTime(data['breakT'])
          }
        })
      }
    })
  },[])

  return (
    <div className="App">
      <h1>Pomodoro</h1>
      <p>An effective way of working/learning.</p>
      <div className='tomatoImg'><img src={pomodoro} alt='tomato' /></div>
      <div className='timeSelect' id='timeSelect'>
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
      </div>
      <br />

      <p className='summary'>Work for <span>{workTime}</span> minutes, then take break for <span>{breakTime}</span> minutes</p>
      <br />

      <div className='foot'>
        <button className='alarmBtn' id='alarmBtn_create' onClick={createAlarm}>Create Alarm</button>
        <button className='alarmBtn' id='alarmBtn_remove' onClick={cancelAlarm}>Remove Alarm</button>
      </div>
    </div>
  )
}

export default App

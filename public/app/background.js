/*global chrome*/

  chrome.alarms.onAlarm.addListener(alarm => {
    console.log(alarm, alarm.name)
    if (alarm.name === 'breakStart') {
      alert('---Break Time!!!--- \n Take a break!!! \n \n To End Alarms, Click on the Pomodoro Extension and Remove Alarm')
    }
    if (alarm.name === 'workStart') {
      alert('---Work Time!!!--- \n Time to go back to Work!!!  \n \n To End Alarms, Click on the Pomodoro Extension and Remove Alarm')
    }
  });
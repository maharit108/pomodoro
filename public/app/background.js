/*global chrome*/
  let audioPlay = new Audio(chrome.runtime.getURL('./../audio.mp3'))

  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === 'breakStart') {
      audioPlay.play()
      setTimeout(function(){alert('---Break Time!!!--- \n Take a break!!! \n \n To End Alarms, Click on the Pomodoro Extension and Remove Alarm')},1000)
    }
    if (alarm.name === 'workStart') {
      audioPlay.play()
      setTimeout(function(){alert('---Work Time!!!--- \n Time to go back to Work!!!  \n \n To End Alarms, Click on the Pomodoro Extension and Remove Alarm')},1000)
    }
  });
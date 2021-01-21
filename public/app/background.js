/*global chrome*/
let work = true

  chrome.alarms.onAlarm.addListener(alarm => {
    alert("Break Time!")
    chrome.notifications.create(message);
    //communicate to content.js:
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {message: "alarm"});
    });
  });
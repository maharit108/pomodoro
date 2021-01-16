/*global chrome*/

chrome.alarms.onAlarm.addListener(function( alarm ) {
    alert('hi, alarm fired')
})

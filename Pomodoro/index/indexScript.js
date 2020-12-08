alarm = document.getElementById('btnNewAlarm')
clearAlarm = document.getElementById('btnClearAlarm')


clearAlarm.addEventListener('click', clearAlrm)
alarm.addEventListener('click', newAlarm)


document.addEventListener('DOMContentLoaded', function() {
    
    chrome.storage.sync.get('myTime', function(data){
        var time = data.myTime[0] * 60 + data.myTime[1]
        
        chrome.storage.sync.get('myMinutes', function(aaaa){
            var minutes = aaaa.myMinutes

           
           var min = (280/minutes)*time

           document.documentElement.style
                .setProperty('--my-end-width', `${min}px`);

            getComputedStyle(document.documentElement)
                .getPropertyValue('--my-end-width'); //return
        })
    })      
}, false);

function newAlarm(){
    chrome.storage.sync.clear()
    chrome.alarms.clearAll()
    chrome.browserAction.setBadgeText({text: ''})

}

function clearAlrm(){
    chrome.storage.sync.clear()
    chrome.alarms.clearAll()
    chrome.browserAction.setBadgeText({text: ''})
    window.close()

}






    
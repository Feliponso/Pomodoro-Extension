chrome.alarms.onAlarm.addListener(function(alarm) {
    if(alarm.name == 'alarm'){
        chrome.alarms.clearAll()
        chrome.storage.sync.clear(function(){
            chrome.browserAction.setBadgeText({text: ''})
        })
               
        var beep = new Audio('button-35.mp3')
        beep.play();
        beep.volume = 0.2
        
    }else{
        chrome.storage.sync.get('myTime', function(data){
            var hh = data.myTime[0]
            var mm = data.myTime[1]
            
            if(hh > 0 && mm == 0){
                hh--
                mm = 59
            }else{
                mm--
                
            }

            chrome.browserAction.setBadgeText({
                text: (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm)
            })
            var tempo = [hh, mm]
            chrome.storage.sync.set({
                'myTime': tempo 
            })
        })   
    }
});

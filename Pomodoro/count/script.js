mmIn = document.getElementById('inptMM');
hhIn = document.getElementById('inptHH');
btnStart = document.getElementById('btnStart')


hhIn.addEventListener('keypress', checkKey)
mmIn.addEventListener('keypress', checkKey);

hhIn.addEventListener('keypress', interHH)
mmIn.addEventListener('keypress', interMM)

btnStart.addEventListener('click', countConfig)


var verify;
var minutes;
var time
var alarm = 'alarm'


function count(){
        
    minutes = Number(hhIn.value) * 60 + Number(mmIn.value);

    time = [Number(hhIn.value), Number(mmIn.value)];

    chrome.alarms.create('alarm', {delayInMinutes: minutes})

    chrome.storage.sync.clear()

    chrome.storage.sync.set({
        'myMinutes': minutes
    })

    chrome.storage.sync.set({
        'myTime': time

    })

    chrome.alarms.create('countDown', {periodInMinutes: 1})

    chrome.runtime.sendMessage({
        msg: "Start", 
        function (response) {
            console.log(response);

        }
    });
    window.close()
  
}
function countConfig(){
    if(hhIn.value == '' && mmIn.value == ''){

    }else{
        count()

        if(hhIn.value > 0 && mmIn.value == 0){
            chrome.browserAction.setBadgeText({
                text: hhIn.value + ':' + '00'
            })
        }else{
            chrome.browserAction.setBadgeText({
                text: (hhIn.value == 0 ? '00' + hhIn.value : hhIn.value) + ':' + (mmIn.value == 0 ? '0' + mmIn.value : mmIn.value)
            })
        }   
    }  
}

function reset(){
    hhIn.value = ''
    mmIn.value = ''
    StorageArea.clear()
    
}

function checkKey(evt){
    if(evt.keyCode == 13){
        count()
    }
    if (evt.keyCode >= 58 || evt.keyCode <= 47){
        evt.preventDefault()
        verify = false
    }else{
        verify = true
    }   
}

function interHH(){
    numView(hhIn)

}

function interMM(){
    numView(mmIn)

}

function numView(inpt){
    if(verify == true){
        if(inpt.value == ''){
            inpt.value = "0" + inpt.value

        }
        if(inpt.value.length == 2){
            inpt.value = inpt.value.replace('0', '')

        }
    }
}



let isTyping = false;
let timer;              // Timer identifier
const waitTime = 1000;   // Wait time in milliseconds 
let problemName


// Adds "str" to the log of "problemName"
async function addLogEntry(str){
    const {[problemName]: log} = await chrome.storage.local.get({[problemName]: []})
    log.push(str)
    await chrome.storage.local.set({[problemName]: log})
}

async function startedSolvingHandler(){
    isTyping = false;
    const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true})
    const url = tabs[0].url
    problemName = url.split("/")[4]
    addLogEntry(`startedSolving ${Date.now()}`)
}
function startedTypingHandler(){
    console.log("Started typing")
    addLogEntry(`startedTyping ${Date.now()}`)
    isTyping = true;
}
function stoppedTypingHandler(){
    console.log("Stopped typing")
    addLogEntry(`stoppedTyping ${Date.now()}`)
    isTyping = false;
}

function keyDownHandler(){
    if (!isTyping){
        startedTypingHandler()
    }

    // Clear timer
    clearTimeout(timer)
    timer = setTimeout(() => {
        console.log("Timeout")
        stoppedTypingHandler();
    }, waitTime);
}

function submitHandler(){
    // Clear timer
    clearTimeout(timer)
    addLogEntry(`submit ${Date.now()}`)
}

function submissionResultHandler(result){
    addLogEntry(`${result} ${Date.now()}`)
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    // Notification handlers
    if (request.type == "start-notification"){
      chrome.notifications.create(request.options, function() { });
      startedSolvingHandler()
    }
    
    if (request.type == "keydown"){
        keyDownHandler()
    }

    if (request.type == "submit"){
        submitHandler()
    }

    if (request.type == "submissionResult"){
        submissionResultHandler(request.options.result)
    }
  
});
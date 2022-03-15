function notifyStart() {
    chrome.runtime.sendMessage({
        type: "start-notification", options: {
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "Timer Started",
            message: "Test"
        }
    });
}

function sendKeyDownMessage() {
    chrome.runtime.sendMessage({
        type: "keydown", 
    });
}

function sendSubmitMessage(){
    chrome.runtime.sendMessage({
        type: "submit", 
    });
}

function sendSubmissionResultMessage(result){
    chrome.runtime.sendMessage({
        type: "submissionResult",
        options: {result} 
    });
}

function getButton() {
    const startButton = document.createElement("button")
    startButton.innerHTML = "Start Solving"
    startButton.id = "start-button"
    startButton.onclick = () => {
        startButton.remove()
        notifyStart()
    }
    return startButton
}

function infiniteScroll() {
    setTimeout(() => {
        if (document.getElementById("start-button")) {
            document.getElementById("start-button").scrollIntoView(true);
            infiniteScroll()
        }
    }, 100)
}

infiniteScroll()
document.getElementById("app").appendChild(getButton())




// Wait for the code input area to arrive,
// and attach a keydown event listener to send a message
// to background.js at every keydown 
document.arrive(".react-codemirror2", function() {
    this.addEventListener('keydown', (e) => sendKeyDownMessage());
    document.unbindArrive(".react-codemirror2");
});

// Wait for the submit button to arrive
// and add its event listener
document.arrive('[data-cy="submit-code-btn"]', function() {
    this.addEventListener('click', (e) => {
        sendSubmitMessage()

        // Wait for arriving result
        // Check result of sumbissions
        document.arrive('.ant-table-row', function() {
            const result = this.children[1].textContent
            sendSubmissionResultMessage(result)
            document.unbindArrive('.ant-table-row');
        });
    });

    
});



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




// Wait for the code input area to appear,
// and attach a keydown event listener to send a message
// to background.js at every keydown               
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (!mutation.addedNodes) return

        
        for (let i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].classList && 
                mutation.addedNodes[i].classList.contains("CodeMirror") &&
                mutation.addedNodes[i].classList.contains("cm-s-textmate") 
                ){

                mutation.addedNodes[i].addEventListener('keydown', (e) => sendKeyDownMessage());
                return
            }
        }
    })
})
observer.observe(document.body, {
    childList: true
    , subtree: true
    , attributes: false
    , characterData: false
})



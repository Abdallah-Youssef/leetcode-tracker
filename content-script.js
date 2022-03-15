function startTimer() {
    chrome.runtime.sendMessage({type: "start-notification", options: { 
        type: "basic", 
        iconUrl: "icons/icon128.png",
        title: "Timer Started",
        message: "Test"
    }});
}

function getButton() {
    const startButton = document.createElement("button")
    startButton.innerHTML = "Start Solving"
    startButton.id = "start-button"
    startButton.onclick = () => {
        startButton.remove()
        startTimer()
    }
    return startButton
}

function infiniteScroll() {
    setTimeout(() => {
        if (document.getElementById("start-button")){
            document.getElementById("start-button").scrollIntoView(true);
            infiniteScroll()
        }
    }, 100)
}

infiniteScroll()
document.getElementById("app").appendChild(getButton())


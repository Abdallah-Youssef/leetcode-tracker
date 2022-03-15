
chrome.storage.local.get(null, data => {
    document.getElementById("data").innerHTML = JSON.stringify(data)
})

document.getElementById("clear-btn")
    .addEventListener("click",async () => {
       await chrome.storage.local.clear()
       location.reload();
    })


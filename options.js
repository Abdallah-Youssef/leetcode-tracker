
chrome.storage.local.get(null, 
data => {
    document.body.innerHTML = JSON.stringify(data)
})
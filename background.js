chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "start-notification"){
      chrome.notifications.create(request.options, function() { });
    }

    sendResponse();
});
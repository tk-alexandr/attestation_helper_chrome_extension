// Called when the user clicks on the browser action.
chrome.tabs.executeScript(null, {file: "content_script.js"});
var btn = document.createElement("BUTTON")
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    //Appending to DOM 
    document.body.appendChild(btn);

$('#hint_checkbox').click(function(){

    chrome.storage.sync.set({hint_checkbox_state: this.checked}, function() {});
});

chrome.storage.sync.get(['hint_checkbox_state'], function(result) {
    var res = result.hint_checkbox_state;
    if(res == undefined){
        chrome.storage.sync.set({hint_checkbox_state: true}, function() {});
        res = true;
    }
    $('#hint_checkbox').prop('checked', res);
});

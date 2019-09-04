
$('#hint_checkbox').click(function(){
    console.log(localStorage['hint_checkbox_state']);
    localStorage['hint_checkbox_state'] = this.checked;
});

console.log(localStorage['hint_checkbox_state']);

$('#hint_checkbox').prop('checked', localStorage['hint_checkbox_state'] == 'true');
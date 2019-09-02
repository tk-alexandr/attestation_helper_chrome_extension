
//================================================== CHECKING IF CONNECTED ===========================


// document.body.style.backgroundColor = "yellow";
// var titles = document.querySelectorAll("h2");

// titles.forEach(function(item, i, arr){
    
//     item.style.color = "red";
// })

// $(".records-history").click(function(){
//     $(this).slideUp();
// });

// ============================================================== PARSING ===========================================

console.log("=======");

var subject = document.querySelector(".testing-heading > div > span > b").innerHTML;

console.log(subject);

console.log("=======");

var questionType = document.querySelectorAll("[name=answer_value]")[0].getAttribute("type");
console.log("Тип вопроса: " + questionType);

console.log("=======");

var question = document.querySelector(".question > div > p").innerHTML;



console.log("=======");

console.log("Вопрос: " + question);

var questionId = document.querySelector("input[name=question_id]").value;

console.log("ID вопроса: " + questionId);
console.log("=======");
console.log("=======");

var answersLabels = document.querySelectorAll(".answer-text");



var object_info = {
    subject: subject,
    type: questionType,
    question_id: questionId,
    question_text: question,
    answers: {

    }
}


answersLabels.forEach(function(item, index, arr){
    var answer_id = item.getAttribute("for").slice(5);
    var answer_text = item.innerHTML.replace(/\s+/g,' ').trim();;
    console.log("ID ответа: " + answer_id);
    console.log(answer_text);
    console.log("=======");
    object_info.answers[answer_id] = answer_text;
});


// ============================================================== AJAX ===========================================
    $.ajax({
        url: 'http://localhost:1111',
        data: object_info,
        type: 'post',
        datatype: 'json',

        success: function (html) {
            
            
            if(html != "new"){
                document.querySelectorAll(".answers > div > input").forEach(function(item, i, arr){
                    if(item.value == html){
                         item.parentNode.style.backgroundColor = "lightgreen";
                     }
                });
             }
            
            // html = JSON.parse(html);
            // if(html.errors)
            // {
            //     $('.showRegError').html('');
            //     i = 0;
            //     for (i = 0; i < html.errors.length; i++) {
            //         $('.showRegError').append('<li>' + html.errors[i] + '</li>');
            //     }
            // }
            // else if(html.success)
            // {
            //     $('.showSuccess').html('html.success');
            // }
        }
    })


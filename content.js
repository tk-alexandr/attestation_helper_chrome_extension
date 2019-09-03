
// ============================================================== PARSING ===========================================

console.log("=======");

var subject = document.querySelector(".testing-heading > div > span > b").innerHTML;

console.log(subject);

console.log("=======");

try {
    var questionType = document.querySelectorAll("[name=answer_value]")[0].getAttribute("type");
    console.log("Тип вопроса: " + questionType);
} catch (error) {
    console.error(error);
}

console.log("=======");

var question = document.querySelector(".question > div > p").innerHTML;



console.log("=======");

console.log("Вопрос: " + question);

var questionId = document.querySelector("input[name=question_id]").value;

console.log("ID вопроса: " + questionId);
console.log("=======");
console.log("=======");



//======================================================= GENERATING JS OBJECT FOR CONVERTING TO JSON =============================

var object_info = {
    subject: subject,
    type: questionType,
    question_id: questionId,
    question_text: question,
    answers: {

    }
}

try {
    var answersLabels = document.querySelectorAll(".answer-text");

    answersLabels.forEach(function (item, index, arr) {
        var answer_id = item.getAttribute("for").slice(5);
        var answer_text = item.innerHTML.replace(/\s+/g, ' ').trim();;
        console.log("ID ответа: " + answer_id);
        console.log(answer_text);
        console.log("=======");
        object_info.answers[answer_id] = answer_text;
    });
} catch (error) {
    console.error(error);
}

// ============================================================== AJAX ===========================================
    $.ajax({
        url: 'http://localhost:1111',
        data: object_info,
        type: 'post',
        datatype: 'json',

        success: function (answer_info) {
            
            //for debug
            //alert(answer_info);

            answer_info = JSON.parse(answer_info);

            if(answer_info.error !== undefined){
                console.error(answer_info.error);
            } else if (!answer_info.already_contains){
                console.success("Вопрос добавлен в базу");
            } else {                

                document.querySelectorAll(".answers > div > input").forEach(function(item, i, arr){
                    if(answer_info.answer_ids.includes(item.value)){
                         item.parentNode.style.backgroundColor = "lightgreen";
                     }
                });


            }
            
        }
    })


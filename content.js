;
var target_address = 'http://localhost:1111/';


if (document.querySelector('.records-history > h2') != null) {

    console.log("=======");
    console.log('Вы на странице записи на аттестацию');
    console.log("=======");

    comp_info = {
        competencies: {}
    }
    // ============================================================ READ FROM Previous Attempts ==============================

    try {
        document.querySelectorAll(".table-user-history > a").forEach(function (item, i, arr) {
            var link = item.getAttribute('href');
            link = new URL(link, window.location.href).href;
            var target = "/attempt/";
            var start_id_index = link.indexOf(target) + target.length;
            var len_id = link.slice(start_id_index).indexOf('/');

            var compet_id = link.substr(start_id_index, len_id);

            var compet_name = item.getElementsByTagName('div')[1].innerHTML;

            console.log("=======");
            console.log('Компетенция: ' + compet_name);
            console.log('Id компетенции: ' + compet_id);
            console.log("=======");

            comp_info.competencies[compet_id] = compet_name;
        });
    } catch (error) {
        console.error(error);
    }

    // ============================================================== AJAX ===========================================
    $.ajax({
        url: target_address + "add_competence.php",
        data: comp_info,
        type: 'post',
        datatype: 'jsonp'
    });


} else if (document.querySelector('.skip-question') != null) {

    console.log("=======");
    console.log('Вы на странице вопроса');
    console.log("=======");

    // ============================================================== PARSING ===========================================


    var link = document.querySelector('#test-question').getAttribute('action');
    link = new URL(link, window.location.href).href;
    var target = "/testing/";
    var start_id_index = link.indexOf(target) + target.length;
    var len_id = link.slice(start_id_index).indexOf('/');

    var test_id = link.substr(start_id_index, len_id);
    console.log("Id компетенции: " + test_id);

    console.log("=======");

    var subject = document.querySelector(".testing-heading > div > span > b").innerHTML;

    console.log(subject);

    console.log("=======");

    try {
        var questionType = document.querySelectorAll("[name=answer_value]")[0].getAttribute("type");
    } catch (error) {
        var questionType = document.querySelectorAll("[name='answer_value[]']")[0].getAttribute("type");
    }

    questionType = questionType == null ? "textarea" : questionType;
    console.log("Тип вопроса: " + questionType);


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
        test: test_id,
        subject: subject,
        type: questionType,
        question_id: questionId,
        question_text: question,
        answers: {}
    }

    try {
        var answersLabels = document.querySelectorAll(".answer-text");

        answersLabels.forEach(function (item, index, arr) {
            var answer_id = item.getAttribute("for").slice(questionType.length);
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
        url: target_address,
        data: object_info,
        type: 'post',
        datatype: 'json',

        success: function (answer_info) {

            answer_info = JSON.parse(answer_info);

            if (answer_info.error !== undefined) {
                console.error(answer_info.error);
            } else if (!answer_info.already_contains) {
                console.success("Вопрос добавлен в базу");
            } else {

                chrome.storage.sync.get(['hint_checkbox_state'], function (result) {
                    var res = result.hint_checkbox_state;
                    if (res) {
                        document.querySelectorAll(".answers > div > input").forEach(function (item, i, arr) {
                            if (answer_info.answer_ids.includes(item.value)) {
                                item.parentNode.style.backgroundColor = "lightgreen";
                            }
                        });
                        if(answer_info.comment != "" && answer_info.comment != null)
                            createPopup(answer_info.comment);
                    }
                });
            }
        }
    });
}

function createPopup(text){

    var container = document.createElement("div");  
    var header = document.createElement("div");
    var closeButton = document.createElement("a");   
    var popupBody = document.createElement("div");
    var textNode = document.createTextNode(text);

    closeButton.href = "#";
    closeButton.innerHTML = "Закрыть";
    closeButton.onclick = function(){
        container.style.display = "none";
        return false;
    }
    
    container.style.position = "fixed";
    container.style.right = "3%";
    container.style.bottom = "5%";
    container.style.width = "500px";
    container.style.border = "1px solid black";
    container.style.background = "white";
    
    header.style.textAlign = "right";
    header.style.padding = "10px";
    header.style.borderBottom = "1px solid grey";

    popupBody.style.padding = "10px";
    popupBody.style.width = "100%";
    popupBody.style.height = "100px";
    popupBody.style.overflowY = "auto";


    header.appendChild(closeButton);
    popupBody.appendChild(textNode)
    container.appendChild(header);
    container.appendChild(popupBody);    

    document.body.appendChild(container);
}

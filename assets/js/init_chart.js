var exp_best_answer;
var stock = [];
var company_name = [];
var DAYNUMBER;
var COMPANYNUMBER;
var myDiv;
var div_inner;
function start(){       
    myDiv = document.getElementById("myDiv");
    ctx = document.getElementById("canvas").getContext("2d");
    myChart = new Chart(ctx,{});

    if(window.localStorage){
        exp_best_answer = JSON.parse(localStorage["exp_best_answer"]);
        var stock_length = parseInt(localStorage["stock_length"]);
        for(var j = 0; j < stock_length; j++){
            var temp = "stock" + j;
            stock[j] = JSON.parse(localStorage[temp]);
        }
        var company_name_length = parseInt(localStorage["company_name_length"]);
        for(var j = 0; j < company_name_length; j++){
            var temp = "company_name" + j;
            company_name[j] = JSON.parse(localStorage[temp]);
        }
        DAYNUMBER = exp_best_answer.day;
        COMPANYNUMBER = company_name.length;
    }else{
        console.log("NOT SUPPORT");
    }


    var temp = "";
    for(var j = 0; j < exp_best_answer.counter; j++){
        temp += "<img width = 50 height = 50 src = 'img/" + company_name[exp_best_answer.locate[j]] + ".png' />\n";
    }
    myDiv.innerHTML = temp;
    console.log(myDiv.innerHTML);
}

window.addEventListener("load", start, false);
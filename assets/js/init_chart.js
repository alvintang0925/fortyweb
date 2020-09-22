var exp_best_answer;
var stock = [];
var company_name = [];
var DAYNUMBER;
var COMPANYNUMBER;
var myDiv;
var myDiv2;
var div_inner;
var mode;
var game_stock;
var myButton ;
function start(){       
    myDiv = document.getElementById("myDiv");
    myDiv2 = document.getElementById("myDiv2");
    ctx = document.getElementById("canvas").getContext("2d");
    myChart = new Chart(ctx,{});

    if(window.localStorage){
        mode = localStorage.mode;
        game_stock = JSON.parse(localStorage["game_stock"]);
        console.log(game_stock);
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
    myDiv.innerHTML = "<label>Best Portfolio</label>" + temp;

    if(mode == "game"){
        var temp = "";
        for(var j = 0; j < game_stock[0].counter; j++){
            temp += "<img width = 50 height = 50 src = 'img/" + company_name[game_stock[0].locate[j]] + ".png' />\n";
        }
        myDiv2.innerHTML = "<label>Your Portfolio</label>" + temp;
    }
    myButton = document.getElementsByName("button");
    
    if(mode == "game"){
        myButton[myButton.length-1].setAttribute("style", "");
    }

    document.getElementById("download").addEventListener('click', function(){
        /*Get image of canvas element*/
        var url_base64jp = document.getElementById("canvas").toDataURL("image/jpg");
        /*get download button (tag: <a></a>) */
        var a =  document.getElementById("download");
        /*insert chart image url to download button (tag: <a></a>) */
        a.href = url_base64jp;
    });
    
}

window.addEventListener("load", start, false);
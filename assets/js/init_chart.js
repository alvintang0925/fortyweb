var exp_best_answer;
var stock = [];
var company_name = [];
var DAYNUMBER;
var COMPANYNUMBER;
function start(){       
    ctx = document.getElementById("canvas").getContext("2d");
    myChart = new Chart(ctx,{});
}

window.addEventListener("load", start, false);
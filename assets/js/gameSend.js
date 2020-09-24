

var company_box = [];
var select_box = [];
function send(){
    
    mode = "game";
    countFunds("GNQTS", 0.0004, 10000, 10, 1);
}

function sortSelect(a, b){
    var tempA = a;
    var tempB = b;
    if(tempA < tempB) return -1;
    if(tempA > tempB) return 1;
    if(tempA == tempB) return 0;
}

function select(t){
    company_box = document.getElementsByName("company_box");
    var temp = parseInt(t.getAttribute("value"));
    if(!company_box[temp].checked){
        select_box.push(parseInt(company_box[temp].value));
    }else{
        for(var j = 0; j < select_box.length; j++){
            if(select_box[j] == temp){
                select_box.splice(j,1);
            }
        }
    }

    
    if(select_box.length != 0){
        myChart.destroy();
        var c = document.getElementById("canvas0");
        c.setAttribute("style", "background-color: white;");
        select_box.sort(sortSelect);

        var temp = [];
        temp[0] =  new STOCK();
        for(var j = 0; j < select_box.length; j++){
            if(temp[0].counter != 0){
                temp[0].company_name += ", ";
            }
            temp[0].data[j] = 1;
            temp[0].company_name += company_name[j];
            temp[0].locate[temp[0].counter] = select_box[j];
            temp[0].counter++;

        }
        temp[0].init();
        temp = countTrend(temp);

        var day_label = [];
        for(var j = 0; j < DAYNUMBER; j++){
            day_label.push("day "+(j+1));
        }

        var dataset0 = [];
        dataset0.push({
            label : "你的投資組合",
            lineTension : 0.4,
            backgroundColor : "#FFD9EC",
            borderColor : "#FF0000",
            borderWidth : 1,
            pointRadius : 0.2,
            data: temp[0].totalMoney,
            fill : false,
            yAxisID: 'y-axis-1',
        });


        
        var bestLineChartData = {
            labels: day_label,
            datasets: dataset0,
        };
        
        
        myChart = new Chart(ctx0,{
            type: 'line',
            data: bestLineChartData,
            options: {
                responsive: true,
                legend:{
                    display: true,
                },
                tooltips: {
                    enabled: true
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        // type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                    }, 
                    ]
                },
            }
        });
    }else{
        var c = document.getElementById("canvas0");
        myChart.destroy();
        c.setAttribute("style", "background-color: white; display: none;")
    }


}
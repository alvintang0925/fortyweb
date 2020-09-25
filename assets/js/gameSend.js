

var company_box = [];
var select_box = [];
function send(){
    $('#loading').show();
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
        var s = document.getElementById("show_data");
        s.setAttribute("style", "");
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
                responsive: false,
                legend:{
                    display: false,
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        // type: 'linear',
                        display: false,
                        position: 'left',
                        id: 'y-axis-1',
                    }, 
                    ]
                },
            }
        });

        var myData = [];
        myData = document.getElementsByName("myData");
        myData[0].value = temp[0].trend;
        myData[1].value = temp[0].daily_risk;
        
    }else{
        myChart.destroy();
        var c = document.getElementById("canvas0");
        c.setAttribute("style", "background-color: white; display: none;")
        var s = document.getElementById("show_data");
        s.setAttribute("style", "display: none;");
    }


}
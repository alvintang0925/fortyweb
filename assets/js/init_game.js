var DAYNUMBER;
var price = [];
var company_name = [];
function getData(){
    d3.csv("DJI_30/M2M/train_2019_06(2019 Q1).csv", function(d){
        data = d
        DAYNUMBER = data.length;
        for(var j in data[0]){
            company_name.push(j);
        }
        for(var j = 0; j < 5; j++){
            price[j] = [];
            for(var k = 0; k < DAYNUMBER; k++){
                price[j].push(data[k][company_name[j]]);
            }
        }
        start();
    });
}

var ctx = [];
var myChart;
var dataset = [];
function start(){
    for(var j = 0; j < 5; j++){
        var temp = "canvas" + (j+1);
        ctx[j] = document.getElementById(temp).getContext("2d");
    }

    var day_label = [];
    for(var j = 0; j < DAYNUMBER; j++){
        day_label.push("day "+(j+1));
    }

    for(var j = 0; j < 5; j++){
        dataset = [];
        dataset.push({
            label : company_name[j],
            lineTension : 0.4,
            backgroundColor : "#FFD9EC",
            borderColor : "#FF0000",
            borderWidth : 1,
            pointRadius : 0.2,
            data: price[j],
            fill : false,
            yAxisID: 'y-axis-1',
        });


        
        var bestLineChartData = {
            labels: day_label,
            datasets: dataset,
        };

        myChart = new Chart(ctx[j],{
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
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                    }, 
                    ]
                },
            }
        });

    }
    
}

window.addEventListener("load", getData, false);
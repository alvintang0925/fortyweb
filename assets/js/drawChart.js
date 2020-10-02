var myChart;
var ctx;
var company_color = {
    AAPL: "#4F4F4F",
    AXP: "#8ecae6", 
    BA: "#90f1ef",
    CAT: "#7bf1a8",
    CVX: "#1982c4",
    DD: "#ff595e",
    DIS: "#8093f1",
    WBA: "#6a4c93",
    HD: "#8ac926",
    IBM: "#fdb833",
    INTC: "#797893",
    JNJ: "#FFF7CF",
    MCD: "#ffdc5e",
    KO: "#ce4257",
    MMM: "#720026",
    MRK: "#07beb8",
    NKE: "#a1c181",
    PFE: "#81b29A",
    PG: "#606c38",
    TRV: "#005757",
    UTX: "#ffd6e0",
    V: "#f26845",
    VZ: "#ef476f",
    WMT: "#e500a4",
    CSCO: "#a100f2",
    GS: "#9c89b8",
    JPM: "#f0a6ca",
    MSFT: "#efc3e6",
    UNH: "#ffac81",
    XOM: "#cdeac0"
};
var myColor = [];

var timeFormat = 'MM/DD/YYYY;' //'MM/DD/YYYY HH:mm';

function newDate(days) {
    return moment().add(days, 'd').toDate();
}

function newDateString(days) {
    return moment().add(days, 'd').format(timeFormat);
}
        
function selectButton(e){
    // myDiv.innerHTML = "";
    document.getElementById("download_img").style = "float: right;";
    if(mode == "game"){
        for(var j = 0; j < myButton.length ; j++){
            myButton[j].setAttribute("style", "");
        }
    }else{
        for(var j = 0; j < myButton.length-1 ; j++){
            myButton[j].setAttribute("style", "");
        }
    }
    e.setAttribute("style", "background:#3bb4f2;");
    // <canvas id = "canvas" style = "background-color:white;" width="1600" height="600"></canvas>
    var myCanvas = document.getElementById("canvas");
    myCanvas.setAttribute("style", "background-color:white;")
    var show_data = document.getElementsByName("show_data");
    show_data[0].style = "display: none";
    show_data[1].style = "display: none";

    var myData = [];
    myData = document.getElementsByName("myData");





    myChart.destroy();
    var best_name = "";
    for(var j = 0; j < exp_best_answer.counter; j++){
        best_name += company_name[exp_best_answer.locate[j]];
        best_name += ", ";
    }
    
    var day_label = [];
    for(var j = 0; j < DAYNUMBER; j++){
        //day_label.push("day "+(j+1));
        day_label.push(newDateString(j - DAYNUMBER));
    }

    var color = getRandomColor();

    var dataset = [];

    switch(e.value){
        case "PORTFOLIO":
            exp_best_answer.chart_totalMoney = [];
            exp_best_answer.chart_y_line = [];

            for(var j = 0 ; j < DAYNUMBER; j++){
                exp_best_answer.chart_totalMoney.push({
                    x: newDateString(j - DAYNUMBER),
                    y: exp_best_answer.totalMoney[j]
                });
                exp_best_answer.chart_y_line.push({
                    x: newDateString(j - DAYNUMBER),
                    y: exp_best_answer.y_line[j]
                });

            }

            for(var j = 0; j < exp_best_answer.counter; j++){
                exp_best_answer.chart_fs[j] = [];
                for(var k = 0; k < DAYNUMBER; k++){
                    exp_best_answer.chart_fs[j].push({
                        x: newDateString(k - DAYNUMBER),
                        y: exp_best_answer.fs[j][k]
                    });
                }
            }
            color = getRandomColor();
            dataset.push({
                    label : "best : " + exp_best_answer.company_name,
                    lineTension : 0.4,
                    backgroundColor : "#FFD9EC",
                    borderColor : "#FF0000",
                    borderWidth : 3,
                    data: exp_best_answer.chart_totalMoney,
                    fill : "1",
                    yAxisID: 'y-axis-2',
                });
            dataset.push({
                label : "trend",
                    lineTension : 0,
                    backgroundColor : "#000000",
                    borderColor : "#000000",
                    borderWidth : 1,
                    data: exp_best_answer.chart_y_line,
                    fill : false,
                    pointRadius : 0,
                    yAxisID: 'y-axis-2',
            });
            for(var j = 0; j < exp_best_answer.counter; j++){
                var myIcon = [];
                var myImage = new Image(15,15);
                myImage.src = "img/" + company_name[exp_best_answer.locate[j]] + ".png";
                color = getRandomColor();
                dataset.push({
                    label : company_name[exp_best_answer.locate[j]],
                    borderDash: [5, 5],
                    lineTension : 0,
                    backgroundColor : company_color[company_name[exp_best_answer.locate[j]]],
                    borderColor : company_color[company_name[exp_best_answer.locate[j]]],
                    borderWidth : 1,
                    data: exp_best_answer.chart_fs[j],
                    fill : false,
                    pointRadius: 1,
                    yAxisID: 'y-axis-1',
                    pointStyle: myImage,
                });
            } 

            
            var bestLineChartData = {
                labels: day_label,
                datasets: dataset,
            }
            myChart = new Chart(ctx,{
                type: 'line',
                data: bestLineChartData,
                legend: {
                    legendItems: {
                        sizes: 200,
                    },
                },
                options: {
                    responsive: true,
                    legend:{
                        display: true,
                        labels:{
                            usePointStyle : true,
                        },
                    },
                    tooltips: {
                        enabled: true
                    },
                    scales: {
                        xAxes: {
                            display: true,
                            type: 'time',
                            time: {
                                parser: timeFormat,
                                // round: 'day'
                                tooltipFormat: 'll HH:mm'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                            // type: 'time',
                            // distribution: 'series',
                            // offset: true,
                            // ticks: {
                            //     major: {
                            //         enabled: true,
                            //         fontStyle: 'bold'
                            //     },
                            //     source: 'data',
                            //     autoSkip: true,
                            //     autoSkipPadding: 75,
                            //     maxRotation: 0,
                            //     sampleSize: 100
                            // },
                        },
                        yAxes: [{
                            type: 'linear',
                            display: true,
                            position: 'left',
                            id: 'y-axis-1',
                            scaleLabel: {
                                display: true,
                                labelString: 'Stock',
                            },
                            ticks: {
                                min: parseInt(exp_best_answer.dMoney) ,
                                max: exp_best_answer.dMoney * 1.5,
                            },
                            
                        }, {
                            type: 'linear', 
                            display: true,
                            position: 'right',
                            id: 'y-axis-2',
                            scaleLabel: {
                                display: true,
                                labelString: 'Portfolio',
                            },
                            // ticks: {
                            //     min: parseInt(FUNDS) ,
                            //     max: exp_best_answer.totalMoney[exp_best_answer.totalMoney.length-1],
                            // },
                            // grid line settings
                            gridLines: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                        }]
                    },

                },
            });
            break;
        case "FUND":
            
            dataset.push({
                label : "趨勢線",
                    lineTension : 0,
                    backgroundColor : "#000000",
                    borderColor : "#000000",
                    borderWidth : 1,
                    data: exp_best_answer.y_line,
                    fill : false,
                    yAxisID: 'y-axis-1',
            });

            dataset.push({
                label : "best : " + exp_best_answer.company_name,
                    backgroundColor : "#FFD9EC",
                    borderColor : "#FF0000",
                    borderWidth : 3,
                    data: exp_best_answer.totalMoney,
                    fill : "-1",
                    yAxisID: 'y-axis-1',
            });
            
            for(var j = 0; j < COMPANYNUMBER; j++){
                color = getRandomColor();
                dataset.push({
                    label : stock[j].company_name,
                    borderDash: [5, 5],
                    lineTension : 0,
                    backgroundColor : company_color[stock[j].company_name],
                    borderColor : company_color[stock[j].company_name],
                    borderWidth : 1,
                    data: stock[j].totalMoney,
                    fill : false,
                    pointRadius: 1,
                    yAxisID: 'y-axis-1',
                });
            } 

            var lineChartData = {
                labels: day_label,
                datasets: dataset,
            }

            myChart = new Chart(ctx,{
                type: 'line',
                    data: lineChartData,
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

            break;
        case "TREND":

            stock_copy = quickSort(stock);
            stock_copy.reverse();
            var neg_stock = [];
            for(var j = 0; j < COMPANYNUMBER; j++){
                if(stock_copy[stock_copy.length - 1].trend < 0){
                    neg_stock.push(stock_copy.pop());
                }
            }
            neg_stock.reverse();

            dataset.push({
                label : "best : " + exp_best_answer.company_name,
                backgroundColor : "#FF0000",
                borderColor : "#FF0000",
                borderWidth : 1,
                data: [exp_best_answer.trend],
                yAxisID: 'y-axis-1',
            });

            for(var j = 0; j < stock_copy.length; j++){
                color = getRandomColor();
                dataset.push({
                    label : stock_copy[j].company_name,
                    backgroundColor : company_color[stock_copy[j].company_name],
                    borderColor : company_color[stock_copy[j].company_name],
                    borderWidth : 1,
                    data: [stock_copy[j].trend],
                    yAxisID: 'y-axis-1',
                });
            } 

            for(var j = 0; j < neg_stock.length; j++){
                color = getRandomColor();
                dataset.push({
                    label : neg_stock[j].company_name,
                    backgroundColor : company_color[neg_stock[j].company_name],
                    borderColor : company_color[neg_stock[j].company_name],
                    borderWidth : 1,
                    data: [neg_stock[j].trend],
                    yAxisID: 'y-axis-2',
                });
            } 


            var barChartData = {
                labels: ["Trend"],
                datasets: dataset,
            };

            var bar_max = exp_best_answer.trend * 1.3;
            var bar_min = -1 * bar_max;
            if(neg_stock.length != 0){
                var neg_bar_min = Math.round(neg_stock[neg_stock.length - 1].trend * 1.3 / 1000000) * 1000000;
                var neg_bar_max = -1 * neg_bar_min;
            }

            myChart = new Chart(ctx,{
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    scales: {
                            xAxes: [{
                                display: true
                            }],
                            yAxes: [{
                                type: 'linear',
                                display: true,
                                position: 'left',
                                ticks: {
                                    min: bar_min,
                                    max: bar_max,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Positive Stock',
                                },
                                id: 'y-axis-1',
                            }, {
                                type: 'linear', 
                                display: true,
                                position: 'right',
                                ticks: {
                                    min: neg_bar_min,
                                    max: neg_bar_max,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Negative Stock',
                                },
                                id: 'y-axis-2',
                                // grid line settings
                                gridLines: {
                                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                                },
                            }]
                        },

                    }
                });

            break;

            case "COMPARE":
            show_data[0].style = "";
            show_data[1].style = "";
            dataset.push({
                label : "best : " + exp_best_answer.company_name,
                    backgroundColor : "#FFD9EC",
                    borderColor : "#FF0000",
                    borderWidth : 3,
                    data: exp_best_answer.totalMoney,
                    fill : false,
                    yAxisID: 'y-axis-1',
            });

            dataset.push({
                label : "best 趨勢線",
                    backgroundColor : "#000000",
                    borderColor : "#000000",
                    borderWidth : 3,
                    data: exp_best_answer.y_line,
                    pointRadius : 0,
                    fill : "-1",
                    yAxisID: 'y-axis-1',
            });

            color = getRandomColor();
            
            dataset.push({
                label : "你的答案",
                    backgroundColor : color,
                    borderColor : color,
                    borderWidth : 1,
                    data: game_stock[0].totalMoney,
                    fill : false,
                    yAxisID: 'y-axis-1',
            });

            color = getRandomColor();

            dataset.push({
                label : "你的趨勢線",
                    backgroundColor : color,
                    borderColor : color,
                    borderWidth : 1,
                    data: game_stock[0].y_line,
                    pointRadius : 0,
                    fill : "-1",
                    yAxisID: 'y-axis-1',
            });

            

            var lineChartData = {
                labels: day_label,
                datasets: dataset,
            }

            myChart = new Chart(ctx,{
                type: 'line',
                    data: lineChartData,
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

           
            myData[2].value = game_stock[0].trend;
            myData[3].value = game_stock[0].daily_risk;

            break;
    }


    
}
function quickSort(arr) {
    
    if (arr.length <= 1) {
        return arr;
    }

    const less = [];
    const greater = [];
    const pivot = arr[arr.length - 1];
    for (let i = 0; i < arr.length - 1; ++i) {
        const num = arr[i];
        if (num.trend < pivot.trend) {
        less.push(num);
        } else {
        greater.push(num);
        }
    }

    return [...quickSort(less), pivot, ...quickSort(greater)];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    if(color == "#FF0000" || color == "#FFD9EC" || color == "#000000"){
        return getRandomColor();
    }else{
        return color;
    }
}

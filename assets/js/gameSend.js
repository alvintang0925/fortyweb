

var company_box = [];


function send(){
    $('#loading').show();
    mode = "game";
    if(document.getElementById("use_best").checked){
        select_box = best_select.locate.slice(0);
    }
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
        if(t.getAttribute("name") == "my_select"){
            company_box[temp].checked = true;
        }
    }else{
        if(t.getAttribute("name") == "my_select"){
            company_box[temp].checked = false;
        }
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

        var d = document.getElementById("canvas_div");
        d.setAttribute("style", "width: 700px; border-left: 1px black solid; border-bottom: 1px black solid;");

        var your_select = document.getElementById("your_select");
        var temp = "";
        for(var j = 0; j < select_box.length; j++){
            temp += "<label onclick = 'select(this)' style = 'display: inline-block;' name = 'my_select' for='myCheckbox" + (select_box[j]+1) + "' value = '" + select_box[j] + "'> <img style = 'width: 50px; height: 50px;' src = 'img/" + company_name[select_box[j]] + ".png' /></label>\n";
        }
        your_select.innerHTML = "<label>你的選擇</label>" + temp;
        

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

        var myData = [];
        myData = document.getElementsByName("myData");
        myData[0].value = temp[0].trend;
        myData[1].value = temp[0].daily_risk;
        if(temp[0].trend > best_select.trend){
            best_select.trend = temp[0].trend;
            best_select.totalMoney = temp[0].totalMoney;
            best_select.risk = temp[0].daily_risk;
            best_select.locate = select_box.slice(0);
            if(window.localStorage){
                localStorage.best_select = JSON.stringify(best_select);
            }else{
                console.log("NOT SUPPORT");
            }

            
        }
        if(temp[0].trend > system_answer.trend){
            alert("恭喜你找到比系統更好的組合！");
        }
        var h = document.getElementById("history_data");
        h.setAttribute("style", "");
        var history_data = []
        history_data = document.getElementsByName("historyData");
        history_data[0].value = best_select.trend;
        history_data[1].value = best_select.risk;
        var history_best = document.getElementById("history_best");
        var tp = "";
        for(var j = 0; j < best_select.locate.length; j++){
            tp += "<label style = 'display: inline-block;' name = 'history_select'> <img style = 'width: 50px; height: 50px;' src = 'img/" + company_name[best_select.locate[j]] + ".png' /></label>\n";
        }
        history_best.innerHTML = "<label>世界第一選擇</label>" + tp;


        var day_label = [];
        for(var j = 0; j < DAYNUMBER; j++){
            day_label.push("day "+(j+1));
        }

        var dataset0 = [];
        dataset0.push({
            label : "你的組合",
            lineTension : 0.4,
            backgroundColor : "#00DB00",
            borderColor : "#00DB00",
            borderWidth : 1,
            pointRadius : 0.2,
            data: temp[0].totalMoney,
            fill : false,
            yAxisID: 'y-axis-1',
        });

        dataset0.push({
            label : "系統最佳組合",
            lineTension : 0.4,
            backgroundColor : "#FFD9EC",
            borderColor : "#FF0000",
            borderWidth : 1,
            pointRadius : 0.2,
            data: system_answer.totalMoney,
            fill : false,
            yAxisID: 'y-axis-1',
        });

        dataset0.push({
            label : "世界第一組合",
            lineTension : 0.4,
            backgroundColor : "#2828FF",
            borderColor : "#2828FF",
            borderWidth : 1,
            pointRadius : 0.2,
            data: best_select.totalMoney,
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
                    display: true,
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

        
        
        
    }else{
        myChart.destroy();
        var c = document.getElementById("canvas0");
        c.setAttribute("style", "background-color: white; display: none;")
        var s = document.getElementById("show_data");
        s.setAttribute("style", "display: none;");
        var d = document.getElementById("canvas_div");
        d.setAttribute("style", "display: none");

        var your_select = document.getElementById("your_select");
        your_select.innerHTML = "";
    }


}
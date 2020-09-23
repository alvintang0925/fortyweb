

var company_box = [];
var select_box = [];
function send(){
    company_box = document.getElementsByName("company_box");
    for(var j = 0; j < company_box.length; j++){
        if(company_box[j].checked){
            select_box.push(parseInt(company_box[j].value));
        }
    }
    mode = "game";
    countFunds("GNQTS", 0.0004, 10000, 10, 1);
}
var replace_company = ["AAPL", "NFLX", "BA", "TSLA", "CSCO", "COST", "DIS", "C", "FORD", "AMD", "IBM", "INTC", "JNJ", "DELL", "KO", "MCD", "MMM", "ADBE", "MSFT", "NKE", "AMZN", "PG", "ORCL", "ZOOM", "NVDA", "V", "FB", "GOOGL", "SBUX", "HSY"];
function start(){       
    var sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", preset, false);
    var allButton = document.getElementById("allButton");
    allButton.addEventListener("click", selectALL, false);
    var resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetAll, false);

    showBubble();
}


window.addEventListener("load", start, false);

function isNumber(valueToCheck) {
    return !isNaN(valueToCheck);
};
function showData(resp) {
    
    var showDataDiv = $("#showDataDiv");
    
    var respData = resp.response.holidays;
    
    
    
    var respDataItems = respData.length;
    var i = 0;

    for(i; i < respDataItems ; i++){
        
        var holiType = respData[i].type;
        switch(holiType) {
            case "public":
                holiType = "Państwowe / Kościelne"
                break; 
            case "observance":
                holiType = "Ogólne"
                break;
        };
        var startDate = respData[i].start;
        startDate = startDate.slice(0,10) + "  /  " + startDate.slice(11,19)
        var endDate = respData[i].end;
        endDate = endDate.slice(0,10) + "  /  " + endDate.slice(11,19)
        


        $('<div class="WS_box col-md-3 d-flex flex-column justify-content-center align-items-center text-center my-3 mx-2 border border-success py-4" >').appendTo(showDataDiv).append($('<div class="col-md-12 d-flex flex-column justify-content-center align-items-center">').html("<h4>Nazwa święta:<br><strong>" + resp.response.holidays[i].name + "</strong></h4>")).append($('<div class="col-md-12 d-flex flex-column justify-content-center align-items-center">').html("<p class='my-0'>Data: <strong>" + resp.response.holidays[i].date + "</strong></p>")).append($('<div class="col-md-12 d-flex flex-column justify-content-center align-items-center">').html("<p class='my-0'>Data rozpoczęcia: <strong>" + startDate + "</strong></p>")).append($('<div class="col-md-12 d-flex flex-column justify-content-center align-items-center">').html("<p class='my-0'>Data zakończenia: <strong>" + endDate + "</strong></p>")).append($('<div class="col-md-12 d-flex flex-column justify-content-center align-items-center">').html("<p class='my-0'>Rodzaj święta: <strong>" + holiType + "</strong></p>"));
        var box = $('.WS_box');
        box.css({"background-color": "lightgreen", "min-height": "250px"});
        
    };
    
};

$(document).ready(function() {

    var cont = document.getElementById("dane");

    var countryName = document.getElementById("form").country;
    var selectedYear = document.getElementById("form").year;
    var showButton = document.getElementById("form").submitValue;
    var isOk = true;

    showButton.onclick = function(e) {
        var countryNameVal = countryName.value;
        var selectedYearVal = selectedYear.value;
        var apiKey = "73e895935fc30ddd44681a169bc12e69fb5e3bd9";
        var urlOfApi = "https://www.calendarindex.com/api/v1/holidays?country=";
        var cont = document.getElementById("dane");
        var showDataDiv = $("#showDataDiv");
        countryNameVal = countryNameVal && countryNameVal[0].toUpperCase() + countryNameVal.slice(1);    
        if (countryNameVal === "") {
            countryNameVal = "PL"
        } else {
            switch (countryNameVal) {
                case "Andorra":
                    countryNameVal = "AD"
                    break;
                case "Brazil":
                    countryNameVal = "BR"
                    break;
                case "Canada":
                    countryNameVal = "CA"
                    break;
                case "Mexico":
                    countryNameVal = "MX"
                    break;
                case "Poland":
                    countryNameVal = "PL"
                    break;
                case "Sweden":
                    countryNameVal = "SE"
                    break;
                case "Vietnam":
                    countryNameVal = "VN"
                    break;
                case "Zambia":
                    countryNameVal = "ZM"
                    break;
                case "Zimbabwe":
                    countryNameVal = "ZW"
                    break;
                case "Ad":
                    countryNameVal = "AD"
                    break;
                case "Br":
                    countryNameVal = "BR"
                    break;
                case "Ca":
                    countryNameVal = "CA"
                    break;
                case "Mx":
                    countryNameVal = "MX"
                    break;
                case "Pl":
                    countryNameVal = "PL"
                    break;
                case "Se":
                    countryNameVal = "SE"
                    break;
                case "Vn":
                    countryNameVal = "VN"
                    break;
                case "Zm":
                    countryNameVal = "ZM"
                    break;
                case "Zw":
                    countryNameVal = "ZW"
                    break;
                }
        }
        var fullUrl = countryNameVal + "&year=" + selectedYearVal + "&api_key=" + apiKey;
        showDataDiv.empty();
        $.ajax({
            url: urlOfApi + fullUrl,
            method: 'GET',
            success: showData,
        });
    };

    selectedYear.onkeyup = function(e) {
        writtenChar = e.which;
        if(isNumber(this.value)) {
            $(this).css("background-color", "cyan");
            cont.innerHTML = "";   
            isOk = true;
        }
        else  {
            e.preventDefault();
            $(this).css("background-color", "red");
            cont.innerHTML = "Coś poszło nie tak, sprawdź czy to faktycznie rok";  
            isOk = false;
        };
    };
    window.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
           showButton.click();
        }
    });

});
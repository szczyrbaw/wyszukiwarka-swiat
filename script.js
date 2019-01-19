
function isNumber(valueToCheck) {
    return !isNaN(valueToCheck);
};
function showData(resp) {
    
    var showDataDiv = $("#showDataDiv");
    
    var respData = resp.response.holidays;
    
    
    

    var i = 0;

    for( i; i<respData.length;i++){
        
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
        box.css("background-color", "lightgreen");
        console.log(box);
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
        
        var showDataDiv = $("#showDataDiv");

        countryNameVal = countryNameVal && countryNameVal[0].toUpperCase() + countryNameVal.slice(1);
        
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
            default: countryNameVal = "PL"
                break;
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
            cont.innerHTML = "niepoprawny format";  
            isOk = false;
        };
       


        
    }

    












});
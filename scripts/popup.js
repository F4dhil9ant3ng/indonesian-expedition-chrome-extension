var dataCities = [];

$("#btnCekTarif").click(function(){
    showCekTarif();
});

$("#btnCekResi").click(function(){
    showCekResi();
});

function showCekResi() {
    $("#cekResi").show();
    $("#cekTarif").hide();
}

function showCekTarif() {
    $("#cekResi").hide();
    $("#cekTarif").show();
}

function getCity() {
    $("#formTarif").hide();
    $("#loadingTarif").show();
    $.ajax({
        url: "http://localhost/rajaongkir-service/city.php",
        type: "GET",
        crossDomain: true,
        success: function(data) { 
             $.each(data.rajaongkir.results, function (index) {
                 $('#source').append($("<option></option>").attr("value",data.rajaongkir.results[index].city_id).text(data.rajaongkir.results[index].city_name));
                 $('#destination').append($("<option></option>").attr("value",data.rajaongkir.results[index].city_id).text(data.rajaongkir.results[index].city_name));
             });

            $("#formTarif").show();
            $("#loadingTarif").hide();
            $("#source").chosen({});
            $("#destination").chosen({});
        },
        error: function(){
            alert('Cannot fetch city data');
        }
    });
}

$("#formTarif").submit(function(event) {

    var formData = {
        'source' : $("#source").val(),
        'destination' : $("#destination").val(),
        'weight' : $("#weight").val(),
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost/rajaongkir-service/cost.php',
        data: encodeURIComponent(formData),
        encode: true
    })
    .done(function(data) {
        console.log(data);
    });

    event.preventDefault();
});

getCity();
showCekTarif();
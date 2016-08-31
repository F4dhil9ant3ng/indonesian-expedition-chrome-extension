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
    $("#loadingResi").hide();
    $("#pengirim").chosen({});
}

function showCekTarif() {
    $("#cekResi").hide();
    $("#cekTarif").show();
}

function getCity() {
    $("#error").hide();
    $("#formTarif").hide();
    $("#loadingTarif").show();
    $.ajax({
        url: "http://localhost/indonesian-expedition/rajaongkir-service/city.php",
        type: "GET",
        crossDomain: true,
        success: function(data) { 
             $.each(data.rajaongkir.results, function (index) {
                 $('#origin').append($("<option></option>").attr("value",data.rajaongkir.results[index].city_id).text(data.rajaongkir.results[index].city_name));
                 $('#destination').append($("<option></option>").attr("value",data.rajaongkir.results[index].city_id).text(data.rajaongkir.results[index].city_name));
             });

            $("#formTarif").show();
            $("#loadingTarif").hide();
            $("#origin").chosen({});
            $("#destination").chosen({});
            $("#courier").chosen({});
        },
        error: function(){
            alert('Cannot fetch city data');
        }
    });
}

function currencyFormat(number){
    return "Rp. "+number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

$("#formTarif").submit(function(event) {
    $("#loadingTarif").show();
    var formData = {
        'origin' : $("#origin").val(),
        'destination' : $("#destination").val(),
        'weight' : $("#weight").val(),
        'courier' : $("#courier").val(),
    };

    var query = "";
    for (key in formData) {
        query += encodeURIComponent(key)+"="+encodeURIComponent(formData[key])+"&";
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost/indonesian-expedition/rajaongkir-service/cost.php',
        data: query,
        success: function(data){
            var status = data.rajaongkir.status;
            var results = data.rajaongkir.results;

            if(status.code === 400){
                $("#error").show();
                $("#error").html(status.description)
            }
            else if(status.code === 200){
                $("#error").hide();
                $("#ongkirResults").html("");
                $("#ongkirResults").append("<tr><th>Service</th><th>Harga</th></tr>");
        
                for(var i=0; i<results.length; i++){
                    var packages = results[i].costs;
                    if(packages.length > 0){
                        for(var j=0; j<packages.length; j++){
                            var costs = packages[j].cost;
                            var costToHtml = "";
                            for(var k=0; k<costs.length; k++){
                                costToHtml += "<li>"+currencyFormat(costs[k].value)+"</li>";
                            }
                            $("#ongkirResults").append("<tr><td>"+packages[j].service+" ("+packages[j].description+")</td><td>"+costToHtml+"</td></tr>");
                        }
                    }
                    else{
                        $("#ongkirResults").html("");
                        $("#ongkirResults").append("<tr><td colspan='2'>Tidak ada data</td></tr>");
                    }
                }
            }
            $("#loadingTarif").hide();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("some error");
            $("#loadingTarif").hide();
        }
    });

    event.preventDefault();
});

$("#formResi").submit(function(event) {
    $("#loadingResi").show();
    var formData = {
        'resi' : $("#resi").val(),
        'pengirim' : $("#pengirim").val(),
    };

    var query = "";
    for (key in formData) {
        query += encodeURIComponent(key)+"="+encodeURIComponent(formData[key])+"&";
    }

    $.ajax({
        url: "http://localhost/indonesian-expedition/rajaongkir-service/resi.php?"+query,
        type: "GET",
        crossDomain: true,
        success: function(response) {
            if(response.status != 'error'){
                var data = response.data;
                var detail = data.detail;
                var history = data.riwayat;
                $("#shipmentResults").html("");
        
                $("#shipmentResults").append("<tr><td colspan='3' style='text-align:center; background-color:yellow;'>Detail</td></tr>");
                $("#shipmentResults").append("<tr><td>Nomor Resi</td><td>:</td><td>"+detail.no_resi+"</td></tr>");
                $("#shipmentResults").append("<tr><td>Status</td><td>:</td><td>"+detail.status+"</td></tr>");
                $("#shipmentResults").append("<tr><td>Tanggal</td><td>:</td><td>"+detail.tanggal+"</td></tr>");
                $("#shipmentResults").append("<tr><td>Asal</td><td>:</td><td>"+detail.asal.nama+" - "+detail.asal.alamat+"</td></tr>");
                $("#shipmentResults").append("<tr><td>Tujuan</td><td>:</td><td>"+detail.tujuan.nama+" - "+detail.tujuan.alamat+"</td></tr>");
        
                $("#shipmentResults").append("<tr><td colspan='3' style='text-align:center; background-color:yellow;'>Riwayat</td></tr>");
                for(var i=0; i<history.length; i++){
                    $("#shipmentResults").append("<tr><td>"+history[i].tanggal+"</td><td>"+history[i].lokasi+"</td><td>"+history[i].keterangan+"</td></tr>");
                }
            }
            else{
                $("#shipmentResults").html("");
                $("#shipmentResults").append("<tr><td>"+response.pesan+"</td></tr>");
            }
            $("#loadingResi").hide();
        },
        error: function(){
            alert('Cannot fetch resi data');
            $("#loadingResi").hide();
        }
    });

    event.preventDefault();
});

getCity();
showCekTarif();
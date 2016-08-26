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

showCekTarif();
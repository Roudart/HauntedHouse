$(document).ready(function() {
    var movementStrength = 25;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $(".bg-image").mousemove(function(e){
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 25;
        var newvalueY = height * pageY * -1 - 50;
        $('.bg-image').css("background-position", newvalueX+"px     "+newvalueY+"px");
    });

    $("#btnPlay").click(function(){
        loadUser();
    });
});

function loadUser(){
    var user = localStorage.getItem("Usuario");
    if (user == null){
        window.open("ingresar_usuario.html", "_self");
        
    }else{
        window.open("menu_principal.html", "_self");
    }
}
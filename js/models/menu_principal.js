var options = loadOptions();

var eligioMapa = false;
var eligioJug = false;
var eligioDifi = false;

$(document).ready(function(){
    // Elegir Mapa
    pressOptions();
    $("#Mapa1").click(function(){
        $("#Mapa1").css("opacity", "0.5");
        $("#Mapa2").css("opacity", "1");
        $("#Mapa3").css("opacity", "1");
        options.Mapa = 1;
        saveOption(options);
        eligioMapa = true;
    });
    $("#Mapa2").click(function(){
        $("#Mapa1").css("opacity", "1");
        $("#Mapa2").css("opacity", "0.5");
        $("#Mapa3").css("opacity", "1");
        options.Mapa = 2;
        saveOption(options);
        eligioMapa = true;
    });
    $("#Mapa3").click(function(){
        $("#Mapa1").css("opacity", "1");
        $("#Mapa2").css("opacity", "1");
        $("#Mapa3").css("opacity", "0.5");
        options.Mapa = 3;
        saveOption(options);
        eligioMapa = true;
    });

    // Elegir cuantos jugadores
    $("#Solo").click(function(){
        $("#Solo").css("opacity", "0.5");
        $("#Coop").css("opacity", "1");
        options.Jugadores = 1;
        saveOption(options);
        eligioJug = true;
    });
    $("#Coop").click(function(){
        $("#Solo").css("opacity", "1");
        $("#Coop").css("opacity", "0.5");
        options.Jugadores = 2;
        saveOption(options);
        eligioJug = true;
    });

    // Elegir modo de juego
    $("#ModeTime").click(function(){
        $("#ModeTime").css("opacity", "0.5");
        $("#ModeHorde").css("opacity", "1");
        options.Modo = 1;
        saveOption(options);
        eligioDifi= true;
    });
    $("#ModeHorde").click(function(){
        $("#ModeTime").css("opacity", "1");
        $("#ModeHorde").css("opacity", "0.5");
        options.Modo = 2;
        saveOption(options);
         eligioDifi= true;
    });
     $("#jugarYa").click(function(){
        if(eligioMapa == true){
            if(eligioJug == true){
                if(eligioDifi == true){

                        window.location.href="juego_interfaz.html";
                        
                    }else{
                         alert ("Elige dificultad"); 
                    }
            }else{
                 alert ("Elige num jugadores"); 
            }
        }else{
            
  alert ("Elige el mapa");  
        }
        

    });
});

function saveOption(){
    localStorage.setItem("Opciones", JSON.stringify(options));
}

function loadOptions(){
    var aux = localStorage.getItem("Opciones");
    if (aux == null){
        aux = {"Mapa": 1, "Jugadores": 1, "Modo": 1};
        saveOption();
    }else{
        aux = JSON.parse(aux);
    }
    return aux;
}

function pressOptions(){
    switch(options.Mapa){
        case 1:{
            $("#Mapa1").css("opacity", "0.5");
            break;
        }
        case 2:{
            $("#Mapa2").css("opacity", "0.5");
            break;
        }
        case 3:{
            $("#Mapa3").css("opacity", "0.5");
            break;
        }
    }
    switch(options.Jugadores){
        case 1:{
            $("#Solo").css("opacity", "0.5");
            break;
        }
        case 2:{
            $("#Coop").css("opacity", "0.5");
            break;
        }
    }
    switch(options.Modo){
        case 1:{
            $("#ModeTime").css("opacity", "0.5");
            break;
        }
        case 2:{
            $("#ModeTime").css("opacity", "0.5");
            break;
        }
    }
}
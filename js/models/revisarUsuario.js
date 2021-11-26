function revisarUsuario(User){
    var Nombre = {name : User.NombreUsuario, action : "findUser"};
    $.ajax({
        url : "webService/UsuarioDB.php",
        async: true,
        type : 'POST',
        data : Nombre,
        success : function(data){
            var User = JSON.parse(data);
            if(!$.isEmptyObject(User) ){
                console.log(User);
                localStorage.setItem("Usuario", JSON.stringify(User));
                location.href = "menu_principal.html";
            }else {alert("Usuario o contraseña incorrectos");}

        },
        failure : function(){
            alert("Algo salió mal");
        }
    });
}

$(document).ready(function(){
    
    var Usuario = JSON.parse(localStorage.getItem("Usuario"));
    console.log(Usuario);

    //revisarUsuario(Usuario);
    // Funcion muy poderosa. Evita que el usuario pueda entrar a esta pagina y redirige directo al juego si está conecatado a local storage
});
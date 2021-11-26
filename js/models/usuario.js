class Usuario{
    constructor(nombre, contrasena,puntajeMayor){
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.puntajeMayor = puntajeMayor;
    }

    getNombre(){
        return this.nombre;
    }
    getContrasena(){
        return this.contrasena;
    }
    getPuntajeMayor(){
        return this.puntajeMayor;
    }

    guardarUsuario(Usuario){
        var dataToSend = {
            action : "addUser",
            name : Usuario.nombre,
            password : Usuario.contrasena
        };

        $.ajax({
            url : "webService/UsuarioDB.php",
            async: true,
            type : 'POST',
            data : dataToSend,
            success : function(data){
                console.log(data);
                localStorage.setItem("Usuario", JSON.stringify(Usuario));
                location.href = "menu_principal.html";
            },
            failure : function(){
                alert("Algo salió mal");
            }
        });
    }

    devolverUsuario(Usuario){
        var dataToSend = {
            action : "getUser",
            name : Usuario.nombre,
            password : Usuario.contrasena
        };

        $.ajax({
            url : "webService/UsuarioDB.php",
            async: true,
            type : 'POST',
            data : dataToSend,
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
}
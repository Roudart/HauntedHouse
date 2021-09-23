$(document).ready(function(){


    $(".btn-confirm").click(function(){

        // Registramos al usuario

        var User = new Usuario(
            $("#usuarioInput").val(),
            $("#contrasenaInput").val(),
            '00:00:00'
        );

        User.guardarUsuario(User);

    });
});


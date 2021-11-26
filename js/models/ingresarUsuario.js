$(document).ready(function(){

    $(".btn-confirm").click(function(){

        // Confirmamos las credenciales

        var PosibleUser = new Usuario(
            $("#usuarioInput").val(),
            $("#contrasenaInput").val(),
            '00:00:00'
        );
        
        PosibleUser.devolverUsuario(PosibleUser);
    });
});
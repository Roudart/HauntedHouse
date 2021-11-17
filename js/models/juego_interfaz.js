
function OpenModal(ModalName, scores){
  // Get the modal
  var modal = document.getElementById(ModalName);
  modal.style.display = "block";
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  var scoreList = document.getElementById("ListaScore");
  for (let i = 0; i < scores.length; i++) {
    var aux = document.createElement("LI");
    aux.className = "list-group-item list-group-item-primary";
    var nombre = scores[i].NombreUsuario
    var score = scores[i].TopScore
    aux.innerHTML = nombre + " - " + score;
    scoreList.appendChild(aux);
  }

  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}
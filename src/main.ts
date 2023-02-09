/*
File for function of the index.html file
*/

function userSendName(){

    let username : string = document.forms[0].elements["username"].value;

    document.getElementById("response").innerHTML = "Bonjour " + username + " !";

}
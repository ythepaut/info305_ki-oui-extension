document.addEventListener("DOMContentLoaded", function() {

    //Listener : Bouton connexion
    document.getElementById("authBtn").addEventListener("click", function() {
        sendRequest("auth", {
        "email" : document.querySelector("input[name='login_email']").value,
        "passwd" : document.querySelector("input[name='login_passwd']").value,
        "duration" : document.querySelector("input[name='login_duration']").value
        });
    });



    /**
     * Fonction qui envoie un requete à l'API.
     * 
     * @param {string} action 
     * @param {array} args 
     * 
     * @return {array}
     */
    function sendRequest(action, args) {
        
        const Http = new XMLHttpRequest();
        let url = 'https://y.ki-oui.com/api/?action=' + action;
        
        for (var key in args) {
            url += "&" + key + "=" + args[key];
        }

        Http.open("GET", url);
        Http.send();

        let response;

        Http.onreadystatechange = (e) => {

            response = JSON.parse(Http.responseText);

            let hintDiv = document.querySelector("#hint");

            hintDiv.setAttribute("style", "");
            if (response.status == "success") {
                hintDiv.setAttribute('class', 'alert alert-success');
                hintDiv.innerHTML = response.message;
            } else {
                hintDiv.setAttribute('class', 'alert alert-warning');
                hintDiv.innerHTML = response.verbose;
            }

        }
        
        return response;
    }

});
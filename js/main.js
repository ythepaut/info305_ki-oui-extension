document.addEventListener("DOMContentLoaded", function() {

    //Listener : Bouton connexion
    document.getElementById("authBtn").addEventListener("click", function() {
        let response = sendAuthRequest("auth", {
        "email" : document.querySelector("input[name='login_email']").value,
        "passwd" : document.querySelector("input[name='login_passwd']").value,
        "duration" : document.querySelector("input[name='login_duration']").value
        });
    });


    /**
     * Fonction qui stock le jeton API et la clé utilisateur necessaires à l'usage de l'API
     * 
     * @param {string} token 
     * @param {string} key 
     * 
     * @return {void}
     */
    function assignCookie(token, key) {
        chrome.storage.sync.set({'token': token}, function() {
        });
        chrome.storage.sync.set({'key': key}, function() {
        });
    }


    /**
     * Fonction qui retourne le jeton d'accès à l'API
     * 
     * @return {string}
     */
    function getToken() {
        chrome.storage.sync.get(['token'], function(result) {
            return result.token;
        });
    }
    /**
     * Fonction qui retourne la clé utilisateur
     * 
     * @return {string}
     */
    function getKey() {
        chrome.storage.sync.get(['key'], function(result) {
            return result.key;
        });
    }


    /**
     * Fonction qui envoie un requete d'authentification à l'API.
     * 
     * @param {string} action 
     * @param {array} args 
     * 
     * @return {array}
     */
    function sendAuthRequest(action, args) {
        
        const Http = new XMLHttpRequest();
        let url = 'https://y.ki-oui.com/api/?action=' + action;
        
        for (var key in args) {
            url += "&" + key + "=" + args[key];
        }

        Http.open("GET", url, true);
        Http.send();

        let response;

        Http.onreadystatechange = (e) => {

            response = JSON.parse(Http.responseText);

            let hintDiv = document.querySelector("#hint");

            hintDiv.setAttribute("style", "");
            if (response.status == "success") {
                hintDiv.setAttribute('class', 'alert alert-success');
                hintDiv.innerHTML = "Connexion effectuée avec succès !";

                assignCookie(response.token, response.key);

                console.log(getToken());
                console.log(getKey());

            } else {
                hintDiv.setAttribute('class', 'alert alert-warning');
                hintDiv.innerHTML = "Identifiants de connexion invalides.";
            }
            console.log(response);
            return response;
        }    
    }

});
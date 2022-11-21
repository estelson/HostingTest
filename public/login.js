function uiConfig() {
    return {
        signInFlow: "popup",
        signInSuccessUrl: "#",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    }
}

function configureLogin() {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig());
}

function hideLoginButtons() {
    document.getElementById("firebaseui-auth-container").innerHTML = `<p>Que bom ver você <strong>${firebase.auth().currentUser.displayName}</strong>!!! </p> <a href="#" onClick="logout();">Logout</a>`;
}

function logout() {
    firebase.auth().signOut();
    location.reload();
}
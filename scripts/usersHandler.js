var firebaseConfig = {
    apiKey: "AIzaSyCqlh0Inx6FfT4rr6KhZQSbw4VAWSmGozg",
    authDomain: "web-cosmetic.firebaseapp.com",
    projectId: "web-cosmetic",
    storageBucket: "web-cosmetic.appspot.com",
    messagingSenderId: "1064931964995",
    appId: "1:1064931964995:web:f49c960b56eff8f9fcfcf6",
    measurementId: "G-Q826CPQ94E"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
auth.onAuthStateChanged(user=>{
    console.log(user)
})
const db = firebase.firestore();

var email, password;
function ready(){
    email = document.getElementById('email');
    password = document.getElementById('password');
    auth.onAuthStateChanged(user=>{
        alert(user)
    })
}

document.getElementById('login').onclick = function (req,res){
    ready();
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.then(() => window.location.assign("./pages/main-menu.html"));
    promise.catch(e => alert(e.message));
}

document.getElementById('register').onclick = function(){
    ready();
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.then(() => alert("Registered Successfully"));
    promise.catch(e => alert(e.message));
}

// if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
//     location.reload();
// }


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
const auth_remove = firebase.auth();
auth_remove.onAuthStateChanged((e) => {
    if(!auth_remove.currentUser){
        console.log('not user');
        window.location.assign('../index.html');
    }
});

document.getElementById('remove').onclick = function (req,res){
    const db = firebase.firestore();
    let title = document.getElementById("title");
    if(title.value == ""){
        alert("You must enter product name")
        return;
    }

    var docRef = db.collection("products").doc(title.value.toLowerCase());
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            if (confirm(`Are you sure you want to delete *${title.value}* product?`)) {
                db.collection("products").doc(title.value.toLowerCase()).delete()
                .then(() => alert("Product deleted Successfully"), title.value='')
                .catch(e => alert(e.message));
            } else {
                console.log('Nothing was deleted.');
                title.value='';
            }
        } else {  // doc.data() will be undefined in this case
            alert(`No product with title ${title.value}!`);
            title.value='';
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        title.value='';
    });

}
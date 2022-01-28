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
const db_remove = firebase.firestore();

let title_remove = document.getElementById("title");

document.getElementById('remove').onclick = function (req,res){
    if(title_remove.value == ""){
        alert("You must enter product name")
        return;
    }

    var docRef = db_remove.collection("products").doc(title_remove.value.toLowerCase());
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            if (confirm(`Are you sure you want to delete *${title_remove.value}* product?`)) {
                db_remove.collection("products").doc(title_remove.value.toLowerCase()).delete()
                .then(() => alert("Product deleted Successfully"), title_remove.value='')
                .catch(e => alert(e.message));
            } else {
                console.log('Nothing was deleted.');
                title_remove.value='';
            }
        } else {  // doc.data() will be undefined in this case
            alert(`No product with title ${title_remove.value}!`);
            title_remove.value='';
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        title_remove.value='';
    });

}
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
const auth_add = firebase.auth();
auth_add.onAuthStateChanged((e) => {
    if(!auth_add.currentUser){
        console.log('not user');
        window.location.assign('../index.html');
    }
}); 

document.getElementById('add').onclick = function (e){
    const db = firebase.firestore();
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let stock = document.getElementById("stock");
    if(title.value == "" || price.value == "" || stock.value == ""){
        alert("You must fill all fields")
        return;
    }
    if(isNaN(price.value) || isNaN(stock.value) || parseFloat(price.value) <= 0 || parseInt(stock.value) < 0){
        alert("Price and Stock must be numbers: \nPrice bigger than 0\nStock at least 0")
        return;
    }
    if(!Number.isInteger(Number(stock.value))){
        alert("Stock must be of type integer")
        return;
    }
    var docRef = db.collection("products").doc(title.value.toLowerCase());
    docRef.get().then(function(doc) {
        if (doc.exists) {
            alert('Product already exist, please choose different title');
            title.value='', 
            price.value='',
            stock.value='' 
            return;
        } else {  // doc.data() will be undefined in this case
            db.collection("products").doc(title.value.toLowerCase()).set({
                Title: title.value.toLowerCase(),
                Price: price.value,
                Stock: stock.value
            }).then(() => alert("Added product Successfully"),  
            title.value='', 
            price.value='',
            stock.value='' ).catch(e => alert(e.message));

        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        title.value='';
        price.value='';
        stock.value='';
    });

}




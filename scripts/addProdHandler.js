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

document.getElementById('add').onclick = async function (e){
    const db = firebase.firestore();
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let stock = document.getElementById("stock");
    if(title.value == "" || price.value == "" || stock.value == ""){
        alert("You must fill all fields")
        return;
    }
    var regex = /^[A-Za-z]|[A-Za-z][A-Za-z\s]*[A-Za-z]$/;
    if (!regex.test(title.value)){
        alert("Invalid title")
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
    await docRef.get().then(async function(doc) {
        if (doc.exists) { // product already exists
            alert('Product already exist, please choose different title');
            title.value='', 
            price.value='',
            stock.value='' 
            return;
        } else {  // new product
            await db.collection("products").doc(title.value.toLowerCase()).set({
                Title: title.value.toLowerCase(),
                Price: price.value,
                Stock: stock.value
            });
            // add product to user's products
            let userID = auth_add.currentUser.uid;
            var userDocRef = db.collection("users").doc(userID);
            await userDocRef.get().then( async function(doc) {
                if (doc.exists) {
                    await userDocRef.update({"products": firebase.firestore.FieldValue.arrayUnion(title.value.toLowerCase())})
                } else {  // doc.data() will be undefined in this case
                    await userDocRef.set({"products": firebase.firestore.FieldValue.arrayUnion(title.value.toLowerCase())});
                }
            }, alert("Added product Successfully")).catch(function(error) {
                console.log("Error getting document:", error);
            });
            title.value='';
            price.value='';
            stock.value='';
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        title.value='';
        price.value='';
        stock.value='';
    });

}




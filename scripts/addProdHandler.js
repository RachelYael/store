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
const db = firebase.firestore();

document.getElementById('add').onclick = function (req,res){
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
    db.collection("products").doc(title.value).set({
        Title: title.value,
        Price: price.value,
        Stock: stock.value
    }).then(() => alert("Added product Successfully"),()=>  
    document.getElementById("title").value='',
    document.getElementById("title").value='', 
    document.getElementById("price").value='',
    document.getElementById("stock").value='' ).catch(e => alert(e.message));


}



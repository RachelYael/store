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
const db_update = firebase.firestore();

let title_update = document.getElementById("title");
let price_update = document.getElementById("price");
let stock_update = document.getElementById("stock");

document.getElementById('update').onclick = function (req,res){
    if(title_update.value == ""){
        alert("You Must Fill Product Name")
        return
    }
    if(price_update.value == "" && stock_update.value == ""){
        alert("No Updates")
        return;
    }
    if(isNaN(price_update.value) || isNaN(stock_update.value) || parseFloat(price_update.value) <= 0 || parseInt(stock_update.value) < 0){
        alert("Price and Stock must be numbers: \nPrice bigger than 0\nStock at least 0")
        return;
    }
    if(!Number.isInteger(Number(stock_update.value))){
        alert("Stock must be of type integer")
        return;
    }


    var docRef = db_update.collection("products").doc(title_update.value.toLowerCase());
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                if (confirm(`Are you sure you want to update changes?`)) {
                    docRef.update({
                        Price: price_update.value,
                        Stock: stock_update.value
                    })
                    .then(() => {
                        alert("Product Updated Successfully!"),
                            title_update.value='', 
                            price_update.value='',
                            stock_update.value=''
                    })
                    .catch((error) => {
                        alert("Error Updating ", error);
                    });
                } else {
                    console.log('Nothing was updated.');
                    title_update.value='',
                    price_update.value='',
                    stock_update.value=''
                }
            } else {  // doc.data() will be undefined in this case
                alert(`No product with title ${title_update.value}!`);
                title_update.value='',
                price_update.value='',
                stock_update.value=''
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            title_update.value='';
            price_update.value='';
            stock_update.value='';
        });
    
}
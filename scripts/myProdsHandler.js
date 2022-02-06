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
const db_myProds = firebase.firestore();

const auth_myProds = firebase.auth();
auth_myProds.onAuthStateChanged((e) => {
    if (!auth_myProds.currentUser) {
        console.log('not user');
        window.location.assign('../index.html');
    }
});

    db_myProds.collection("users").get().then(async (querySnapshot) => {
        let userID = auth_myProds.currentUser.uid;
        querySnapshot.forEach(async (doc) => {
            console.log(doc.id);
            if(doc.id !== userID){
                return;
            }

            let products = doc.data().products;
            for (let i of products){
                const prod = (await db_myProds.collection("products").doc(i).get()).data();

                console.log(prod);
                const prods = $('#prodsContainer');
                prods.append(`<div class="card m-4" style="width: 18rem;">
                                            <div class="card-body">
                                                <h5 class="card-header text-center">${prod.Title}</h5>
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item fs-5"><b>Price:</b> ${prod.Price} $</li>
                                                    <li class="list-group-item fs-5"><b>Stock:</b> ${prod.Stock}</li>
                                                </ul>
                                            </div>
                                        </div>`
                );
            }
    
        });
    });

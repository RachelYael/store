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

const auth_allProds = firebase.auth();
auth_allProds.onAuthStateChanged((e) => {
    if(!auth_allProds.currentUser){
        console.log('not user');
        window.location.assign('../index.html');
    }
});

db.collection("products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var data = doc.data();
        console.log(data);

        (($) => {
            $(document).ready(function () {
                const prods = $('#prodsContainer');
                    prods.append(`<div class="card m-4" style="width: 18rem;">
                                                <div class="card-body">
                                                    <h5 class="card-header text-center">${data.Title}</h5>
                                                    <ul class="list-group list-group-flush">
                                                        <li class="list-group-item fs-5"><b>Price:</b> ${data.Price} $</li>
                                                        <li class="list-group-item fs-5"><b>Stock:</b> ${data.Stock}</li>
                                                    </ul>
                                                </div>
                                            </div>`
                    );

                
            });
        })(jQuery);
    });
});
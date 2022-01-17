
  $(document).ready(function() {
    $("#addProd").validate({
    rules: {
        title : {
        required: true
        },
        price: {
        required: true,
        number: true
        },
        stock: {
        required: true,
        number: true
        }
    },
    messages: {
        title: "Please fill title",  
        price: "Please fill valid price",
        stock: "Please fill valid stock",
      }
    });
});
  
  
  
  
      
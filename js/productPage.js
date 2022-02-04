const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

fetch('./json/product-dataset.json')
    .then(jsonData => jsonData.json())
    .then(data => printIt(data))

let printIt = (data) => {
    try{
        let item = data.filter((item) => {
            return item.uniq_id == params.id
        })[0];
        //changes title to product name
        document.title = item.product_name;
        //loads the img
        document.getElementById("productImg").src=item.image.split('|')[0];
        //load product details
        document.getElementById("productTitle").innerHTML=item.product_name;
        document.getElementById("productModelID").innerHTML+=item.model_number;
        document.getElementById("productDescription").innerHTML=item.about_product;
        document.getElementById("productPrice").innerHTML=item.selling_price;
    } catch (e) {
        if(params.id === undefined){
            document.getElementById("productTitle").innerHTML = "ID not defined";
        } else {
            document.getElementById("productTitle").innerHTML = "ID not found";
        }
    }
}

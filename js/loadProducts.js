// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

fetch('./json/product-dataset.json')
    .then(jsonData => jsonData.json())
    .then(data => printIt(data))

let printIt = (data) => {
    try{
        data.forEach(item => {
            document.getElementById("productList").innerHTML += `<div class="row" id=${item.uniq_id}> <a href="product.html?id=${item.uniq_id}">${item.product_name}</a>  </div>`;
        });
        // document.getElementById("content").innerHTML += "<div>"+
        //     "Hello I am "+item.first_name+" "+item.last_name
        //     +"</div>";
        // console.log(item);
    } catch (e) {

    }
}

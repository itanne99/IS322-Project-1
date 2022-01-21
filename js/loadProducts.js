// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());


//pulled from https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

fetch('./json/product-dataset.json')
    .then(jsonData => jsonData.json())
    .then(data => printIt(data))

let printIt = (data) => {
    try{

        document.getElementById("productList").innerHTML += `<div class="row mb-3" id=${getRndInteger(0,data.length)}> <h4><a href="productPage.html?id=${getRndInteger(0,data.length)}">Look Up Random Item</a></h4></div>`
        data.forEach((item, index) => {
            document.getElementById("productList").innerHTML += `<div class="row" id=${index}> <a href="productPage.html?id=${index}">${item.product_name}</a>  </div>`;
        });
        // document.getElementById("content").innerHTML += "<div>"+
        //     "Hello I am "+item.first_name+" "+item.last_name
        //     +"</div>";
        // console.log(item);
    } catch (e) {

    }
}

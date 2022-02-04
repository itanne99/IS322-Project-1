// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

// Front-end Code

//If device is smaller then phone add flex-column to id content
//pulled from https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code
let getWidth = () => {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

let addFlexCol = () => {
    let mainContent = document.getElementById('content')
    let currClasses = mainContent.classList
    mainContent.className = currClasses + " flex-column"
}

addMarginTop = () => {
    let filterContent = document.getElementById('filter')
    let currClasses = filterContent.classList
    filterContent.className = currClasses + " mt-5"
}

function createProductCard (name, price, category, img, index){

    let cardCol = document.createElement('div')
    cardCol.className="col"

    // <div class="card  ">
    let card = document.createElement('div');
    card.className="card h-100 shadow-5";
    cardCol.appendChild(card)
    //card.onclick() //- redirect to product page productPage.html?id=${index}

    //         <img src="https://mdbootstrap.com/img/new/standard/nature/111.webp" class="img-fluid" />
    let cardImg = document.createElement('img');
    cardImg.src=img;
    cardImg.className="card-img-top";
    card.appendChild(cardImg);

    //       <div class="card-body">
    let cardBody = document.createElement('div');
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    //         <h5 class="card-title">Card title</h5>
    let cardBodyTitle = document.createElement('h5');
    cardBodyTitle.className="card-title";
    cardBodyTitle.innerHTML=name;
    cardBody.appendChild(cardBodyTitle);

    let cardBodyText = document.createElement('p');
    cardBodyText.className="card-text";
    cardBodyText.innerHTML=`${category}<br>$${price}`;
    cardBody.appendChild(cardBodyText);

    let cardLink = document.createElement('a');
    cardLink.className = "stretched-link"
    cardLink.href = `productPage.html?id=${index}`
    cardBody.appendChild(cardLink)

    return cardCol;
}

let printIt = (data) => {
    try{
        if(document.getElementById('productList').innerHTML != null){
            document.getElementById('productList').innerHTML = null;
        }

        //prints random item
        //document.getElementById("productList").innerHTML += `<div class="row mb-3" id=${getRndInteger(0,data.length)}> <h4><a href="productPage.html?id=${getRndInteger(0,data.length)}">Look Up Random Item</a></h4></div>`

        let cardList = document.createElement('div');
        cardList.className="row row-cols-1 row-cols-md-4 g-4";
        const mainArea = document.getElementById('productList');
        mainArea.appendChild(cardList);
        data.forEach((item) => {
            cardList.appendChild(createProductCard(item.product_name, item.selling_price, item.category.split('|')[0], item.image.split('|')[0], item.uniq_id));
        });
        // document.getElementById("content").innerHTML += "<div>"+
        //     "Hello I am "+item.first_name+" "+item.last_name
        //     +"</div>";
        // console.log(item);
    } catch (e) {
        console.log(e);
    }
}

let showCategories = async (array) =>{
    let categoriesList = ["All"]
    array.forEach((item) => {
        let category = item.category.split('|')[0];
        if(category == ""){
            category = "Misc.";
        }
        if(!categoriesList.includes(category)){

            categoriesList.push(category)
        }
    });

    categoriesList.sort();
    categoriesList.forEach((item) => {
        let category = document.createElement('option');
        category.value = item;
        category.innerHTML = item;

        let categoryForm = document.getElementById('category');
        categoryForm.appendChild(category);
    });
}

// End of Front end code

// Back end code

//pulled from https://www.w3schools.com/js/js_random.asp
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

//pulled from https://stackoverflow.com/questions/45018338/javascript-fetch-api-how-to-save-output-to-variable-as-an-object-not-the-prom/61285073#61285073
let fetchJson = async (fileLocation) => {
    try {
        const response = await fetch(fileLocation, {
            method: 'GET',
            credentials: 'same-origin'
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

let sortByPrice = (array, option) =>{
    switch (option){
        case 0:
            array.sort((a,b) => {
                a = parseFloat(a.selling_price);
                b = parseFloat(b.selling_price);
                return (a > b ? 1 : -1);
            });
            break;
        case 1:
            array.sort((a, b) => {
                a = parseFloat(a.selling_price);
                b = parseFloat(b.selling_price);
                return (a < b ? 1 : -1);
            });
            break;
    }
}

let sortByTitle = (array, option) =>{
    switch (option){
        case 0:
            array.sort((a,b) => {
                a = a.product_name.toLowerCase();
                b = b.product_name.toLowerCase();
                return (a > b ? 1 : -1);
            });
            break;
        case 1:
            array.sort((a, b) => {
                a = a.product_name.toLowerCase();
                b = b.product_name.toLowerCase();
                return (a < b ? 1 : -1);
            });
            break;
    }
}

let sortByX = (array, type, order) => {
    switch (type){
        case 'price':
            sortByPrice(array, order)
            printIt(array)
            break;
        case 'name':
            sortByTitle(array, order)
            printIt(array)
            break;
    }

}

let filterBy = (array, category, price) => {
    if(category == "Misc."){
        category="";
    }

    let priceOne,priceTwo = 0.0;
    //<option value="1">$1 - $25</option>
    //                               <option value="2">$26 - $50</option>
    //                               <option value="3">$51 - $100</option>
    //                               <option value="4">$100+</option>
    switch (price){
        case '0':
            priceOne = 1.00;
            priceTwo = Number.MAX_SAFE_INTEGER;
            break;
        case '1':
            priceOne = 1.00;
            priceTwo = 25.00;
            break;
        case '2':
            priceOne = 26.00;
            priceTwo = 50.00;
            break;
        case '3':
            priceOne = 51.00;
            priceTwo = 100.00;
            break;
        case '4':
            priceOne = 100.00;
            priceTwo = Number.MAX_SAFE_INTEGER;
            break;
    };

    let newArray = array.filter((item) => {
        if(category == "All"){
            return parseFloat(item.selling_price) >= priceOne &&
                parseFloat(item.selling_price) <= priceTwo;
        }
       return item.category.split('|')[0] == category &&
           parseFloat(item.selling_price) >= priceOne &&
           parseFloat(item.selling_price) <= priceTwo;
    });

    return newArray;
}

// End of backend code


//On document load code
window.onload = async () => {
    if (getWidth() < 576) {
        addFlexCol();
    } else {
        addMarginTop();
    }
    //Run First
    const records = await fetchJson('./json/product-dataset.json');

    //Run Middle
    sortByPrice(records, 0);
    printIt(records);

    //Run last
    showCategories(records);
};


//Event Listeners
const selectSortElement = document.getElementById('sort');
selectSortElement.addEventListener('change', async (event) => {
    const records = await fetchJson('./json/product-dataset.json');
    const order = parseInt(document.querySelector('input[name="Order"]:checked').value);
    switch (event.target.value){
        case 'price':
            sortByX(records, 'price', order);
            break;
        case 'name':
            sortByX(records, 'name', order);
            break;
    }
    printIt(filterBy(records,selectCategoryElement.value,selectPriceElement.value))
});

const radioElement = document.querySelectorAll('input[type=radio][name="Order"]');
radioElement.forEach(radio => radio.addEventListener('change', async (event) => {
    const records = await fetchJson('./json/product-dataset.json');
    const type = document.getElementById('sort').value;
    switch (event.target.value){
        case '0':
            sortByX(records, type, 0)
            break;
        case '1':
            sortByX(records, type, 1)
            break;
    };
    printIt(filterBy(records,selectCategoryElement.value,selectPriceElement.value))
}))

const selectCategoryElement = document.getElementById('category');
selectCategoryElement.addEventListener('change', async (event) => {
    const records = await fetchJson('./json/product-dataset.json');
    const price = document.getElementById('price').value;
    sortByX(records, selectCategoryElement.value, radioElement.value);
    printIt(filterBy(records,event.target.value,price));
});

const selectPriceElement = document.getElementById('price');
selectPriceElement.addEventListener('change', async (event) => {
    const records = await fetchJson('./json/product-dataset.json');
    const category = document.getElementById('category').value;
    sortByX(records, selectCategoryElement.value, radioElement.value);
    printIt(filterBy(records,category,event.target.value))
});






// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());


//If device is smaller then phone add flex-column to id content
//pulled from https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code
getWidth = () => {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

addFlexCol = () => {
    let mainContent = document.getElementById('content')
    let currClasses = mainContent.classList
    mainContent.className = currClasses + " flex-column"
}

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
        const exam = await response.json();
        return exam;
    } catch (error) {
        console.error(error);
    }
}

function createProductCard (name, price, category, img, index){

    let cardCol = document.createElement('div')
    cardCol.className="col"

    // <div class="card  ">
    let card = document.createElement('div');
    card.className="card h-100 shadow-5";
    cardCol.appendChild(card)
    //card.onclick() - redirect to product page productPage.html?id=${index}

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
    cardBodyText.innerHTML=`${category}<br>${price}`;
    cardBody.appendChild(cardBodyText);

    return cardCol;
}

let printIt = async (file) => {
    const data = await fetchJson(file);
    try{

        //prints random item
        //document.getElementById("productList").innerHTML += `<div class="row mb-3" id=${getRndInteger(0,data.length)}> <h4><a href="productPage.html?id=${getRndInteger(0,data.length)}">Look Up Random Item</a></h4></div>`

        let cardList = document.createElement('div')
        cardList.className="row row-cols-1 row-cols-md-4 g-4"
        const mainArea = document.getElementById('productList')
        mainArea.appendChild(cardList)
        data.forEach((item, index) => {
            cardList.appendChild(createProductCard(item.product_name, item.selling_price, item.category.split('|')[0], item.image.split('|')[0], index));
        });
        // document.getElementById("content").innerHTML += "<div>"+
        //     "Hello I am "+item.first_name+" "+item.last_name
        //     +"</div>";
        // console.log(item);
    } catch (e) {
        console.log(e)
    }
}

window.onload = () => {
    if(getWidth() < 576){
        addFlexCol()
    }
    console.log("printing json")
    printIt('./json/product-dataset.json')
    // printIt(jsonSortByPrice('./json/product-dataset.json'));
};


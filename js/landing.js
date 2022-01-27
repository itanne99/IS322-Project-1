slideCarousel = (id) => {
    //select carousel
    let carousel = document.getElementById(id);
    let currSlide = 0;
    //remove 'active' class from currSlide
    setInterval(() => {
        carousel.children[currSlide].classList.toggle("active");
        //if currSlide+1 is greater then carousel.children length, set currSlide = 0
        if(currSlide+1 >= carousel.childElementCount){
            currSlide=0;
        } else {
            currSlide+=1;
        }
        carousel.children[currSlide].classList.toggle("active");
        //add 'active' class to sibling
    }, 5000);
};

slideCarousel("heroCarousel");

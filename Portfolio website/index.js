//Header
const header = document.querySelector("header");

window.addEventListener("scroll", function(){
  header.classList.toggle("sticky", window.scrollY);
})

let menu = document.querySelector("#menu-icon");
let navList = document.querySelector(".nav-list");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navList.classList.toggle("active");
}

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navList.classList.remove("active");
}
//Education
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];


let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);



carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});


const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const autoPlay = () =>{
  if(window.innerWidth < 800) return;
 timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft <= 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();
  
}


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => {
  clearTimeout(timeoutId); 
});

wrapper.addEventListener("mouseleave", autoPlay); 




//Contact
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(this)
  })
  .then(() => {
     
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
      
    
      alert("Message sent successfully!");
  })
  .catch(error => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
  });
});

//Foother
var currentYear = new Date().getFullYear();
document.getElementById("footerYear").innerHTML = "&copy; " + currentYear + " Alma | Portfolio Website | Vanilla HTML CSS JS " ;
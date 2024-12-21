'use strict';
$(window).on('load', function() {
    // Please run it with window.onload, not with document.ready
    initSmoothScrolling('.block', 'smoothscroll');
});

function initSmoothScrolling(container, animation) {
    /*
     * @param {String} container Class or ID of the animation container
     * @param {String} animation Name of the animation, e.g. smoothscroll
     */
    var sliderWidth = 0;
    var animationWidth = 0;
    var sliderHeight = $('>div>div:first-of-type', container).outerHeight(false);

    $('>div>div', container).each(function() {
        animationWidth += $(this).outerWidth(false);
    });

    // detect number of visible slides
    var slidesVisible = $(container).width() / $('>div>div:first-of-type', container).outerWidth(false);
    slidesVisible = Math.ceil(slidesVisible);

    // count slides to determine animation speed
    var slidesNumber = $('>div>div', container).length;
    var speed = slidesNumber * 2;

    // append the tail	
    $('>div>div', container).slice(0, slidesVisible).clone().appendTo($('>div', container));

    // Detect the slider width with appended tail
    $('>div>div', container).each(function() {
        sliderWidth += $(this).outerWidth(false);
    });

    // set slider dimensions
    $('>div', container).css({ 'width': sliderWidth, 'height': sliderHeight });

    // Insert styles to html
    $("<style type='text/css'>@keyframes " + animation + " { 0% { margin-left: 0px; } 100% { margin-left: -" + animationWidth + "px; } } " + $('>div>div:first-of-type', container).selector + " { -webkit-animation: " + animation + " " + speed + "s linear infinite; -moz-animation: " + animation + " " + speed + "s linear infinite; -ms-animation: " + animation + " " + speed + "s linear infinite; -o-animation: " + animation + " " + speed + "s linear infinite; animation: " + animation + " " + speed + "s linear infinite; }</style>").appendTo("head");

    // restart the animation (e.g. for safari & ie)	
    var cl = $(container).attr("class");
    $(container).removeClass(cl).animate({ 'nothing': null }, 1, function() {
        $(this).addClass(cl);
    });
}
const blob = document.getElementById("blob");
window.onpointermove = event => {
    const { pageX, pageY } = event;

    blob.animate({
        left: `${pageX}px`,
        top: `${pageY}px`
    }, { duration: 300, fill: "forwards" });
}



function isMacOS() {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}

if (isMacOS()) {
    var styleElement = document.getElementById('blob');
    var styleElementaa = document.getElementById('hanger')
    if (styleElement) {
        styleElement.remove()
        styleElementaa.remove()
    }
    var removerrr = document.querySelector(".centerrer")
    removerrr.style.marginTop = '-300px'
    var bottomtext = document.querySelector(".footer-bottom")
    bottomtext.style.marginTop = '-240px'
}

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    var elements = document.querySelectorAll('.remover');
    elements.forEach(function(element) {
        element.parentNode.removeChild(element);
    });
    blob.remove();
    var bottomtext = document.querySelector(".footer-bottom");
    bottomtext.style.marginTop = '-240px';
}


window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

    if (document.querySelectorAll('video[autoplay]').length > 0) {
        var windowHeight = window.innerHeight,
            videoEl = document.querySelectorAll('video[autoplay]');

        for (var i = 0; i < videoEl.length; i++) {

            var thisVideoEl = videoEl[i],
                videoHeight = thisVideoEl.clientHeight,
                videoClientRect = thisVideoEl.getBoundingClientRect().top;

            if (videoClientRect <= ((windowHeight) - (videoHeight * .5)) && videoClientRect >= (0 - (videoHeight * .5))) {
                thisVideoEl.play();
            } else {
                thisVideoEl.pause();
            }

        }
    }

}

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function() {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});



const addEventOnElements = function(elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}



const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function() {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function() {
    if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function() {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function() {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function() {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function() {
    autoSlideInterval = setInterval(function() {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function() {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function(event) {

    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    // reverse the number eg. 20 -> -20, -5 -> 5
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }

});


const wand = document.getElementById("wand"),
    tiles = document.querySelectorAll(".tile");

const xy = (x, y) => ({ x, y }),
    px = value => `${value}px`,
    deg = value => `${value}deg`,
    clamp = (value, min, max) => Math.max(Math.min(value, max), min);

const updateMouse = (mouseX, mouseY) => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

    const mouse = {
        position: xy(mouseX, mouseY),
        decimal: xy(mouseX / windowWidth, mouseY / windowHeight),
        multiplier: xy(1.3, 0.4),
        offset: xy(windowWidth * -0.15, windowHeight * 0.1),
        modifiedPosition: xy(0, 0)
    }

    mouse.modifiedPosition.x = mouse.position.x * mouse.multiplier.x + mouse.offset.x;
    mouse.modifiedPosition.y = mouse.position.y * mouse.multiplier.y + mouse.offset.y;

    return mouse;
}

const revealImages = mouseX => {
    for (const tile of tiles) {
        const dimensions = tile.getBoundingClientRect(),
            relativeMouseX = mouseX - dimensions.left,
            mouseXAsDecimal = clamp(relativeMouseX / dimensions.width, 0, 1);

        const opacity = mouseXAsDecimal,
            blur = 1 - mouseXAsDecimal;

        tile.style.setProperty("--opacity", opacity);
        tile.style.setProperty("--blur", blur);
    }
}

const getWandStyles = mouse => ({
    left: px(mouse.modifiedPosition.x),
    top: px(mouse.modifiedPosition.y),
    rotate: deg(mouse.decimal.x * 20 - 10)
});

window.onmousemove = e => {
    const mouse = updateMouse(e.clientX, e.clientY),
        wandStyles = getWandStyles(mouse);

    wand.animate(wandStyles, { duration: 700, fill: "forwards" });

    revealImages(mouse.modifiedPosition.x);
}
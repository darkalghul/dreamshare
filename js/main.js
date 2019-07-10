let scroll = window.requestAnimationFrame ||
             function(callback) {
                 window.setTimeout(callback, 100/60)
             };

let fadeInElements = document.querySelectorAll('.fade');

function loopFade() {
    fadeInElements.forEach(function(element) {
        if (isElementInViewPort(element)) {
            element.classList.add('fadeIn');
        } else {
            element.classList.remove('fadeIn');
        }
    });
    scroll(loopFade);
}

function isElementInViewPort(el) {
    let rect = el.getBoundingClientRect();
    return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
}

loopFade();
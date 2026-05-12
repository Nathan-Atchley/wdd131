let menuBtn = document.querySelector('.menu-btn');
console.log(menuBtn);


menuBtn.addEventListener('click', (event) => {
    //grab the nav tag
    let nav = document.querySelector('nav');
    // toggle .hide class on nav tag
    nav.classList.toggle('hide');
    //profit
    menuBtn.classList.toggle('change');
});
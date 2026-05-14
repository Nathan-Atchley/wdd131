const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('#close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
// Code to show modal  - Use event parameter 'e'
    let imgSrc = e.target.src;
    imgSrc = imgSrc.replace('sm', 'full');
    modalImage.src = imgSrc;
    modal.showModal();
}
// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
    modalImage.src = '';
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
        modalImage.src = '';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.open) {
        modal.close();
        modalImage.src = '';
    }
});






const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});
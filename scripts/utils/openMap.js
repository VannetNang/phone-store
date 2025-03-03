
const map = document.querySelector('#map');
const googleMap = document.querySelector('.google-map');

map.addEventListener('click', () => {
    map.classList.toggle('is-active');
    googleMap.classList.toggle('active');
    
    map.innerHTML = googleMap.classList.contains('active') ? 'X' : 'Google Map';
});


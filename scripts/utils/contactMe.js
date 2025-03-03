
const scriptURL = 'https://script.google.com/macros/s/AKfycbybeEungwJibmJKag3ec63e-uXZiK6et8a3otsy-_M5mMWXY9tX3s9R4LRSo1Oi2N4-/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.querySelector('.success-text');

form.addEventListener('submit', e => {
e.preventDefault()
fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message sent successfully!";
        setTimeout(() => {
            msg.innerHTML = "";
        }, 5000);
    
        form.reset();
    }
    )
    .catch(error => console.error('Error!', error.message))
});

const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('location');
const messageTwo = document.getElementById('forecast');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
});
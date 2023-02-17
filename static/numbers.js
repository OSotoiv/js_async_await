const number_form = document.querySelector('#number_form');
const number_input = document.querySelector('#number_input');
const response_list = document.getElementById("response_list");
const BASE = 'http://numbersapi.com/'

number_form.addEventListener('submit', handleRequest);

// This function gets the number from the users input and builds the url from the input.
function handleRequest(event) {
    event.preventDefault();
    clearFacts()
    num = number_input.value;
    if (!num) num = 0;
    Promise.all([
        axios.get(`${BASE}${num}`),
        axios.get(`${BASE}${num}`),
        axios.get(`${BASE}${num}`),
        axios.get(`${BASE}${num}`)
    ])
        .then(response => addToPage(response))
        .then(clearInput)
        .catch(error => {
            alert(`${error.message}> Try again later...`)
        });
}

function addToPage(response) {
    // this function takes the array of responses and updates the page
    response.forEach(res => {
        const li = document.createElement("li");
        li.textContent = res.data;
        li.classList.add("list-group-item")
        response_list.appendChild(li)
    });
}

function clearInput() {
    // clear the input on the page
    number_input.value = ""
}

function clearFacts() {
    response_list.innerHTML = ""
}


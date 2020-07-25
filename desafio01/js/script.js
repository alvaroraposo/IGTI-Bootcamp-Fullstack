let tabUsers = null;
let sexoMasculinoSpan = null;
let sexoFemininoSpan = null;
let somaIdadesSpan = null;
let mediaIdadesSpan = null;
let inputText = null;

let allUsers = [];
let selectedUsers = [];

let countUsers = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
    tabUsers = document.querySelector('#tabUsers');
    countUsers = document.querySelector('#countUsers');
    
    inputText = document.querySelector('#inputTextId');
    inputText.addEventListener('keyup', () => {
        if(event.key !== 'Enter')
            return;
    
        onButtonClick();
    });

    sexoMasculinoSpan = document.querySelector('#sexoMasculinoId');
    sexoFemininoSpan = document.querySelector('#sexoFemininoId');
    somaIdadesSpan = document.querySelector('#somaIdadesId');
    mediaIdadesSpan = document.querySelector('#mediaIdadesId');    

    inputText.value = "";

    preventFormSubmit();
    fetchCountries();
});



function onButtonClick() {
    selectedUsers = allUsers.filter((user) => {
        if(user.name.toLowerCase().includes(inputText.value.toLowerCase()))
            return user;
    });

    sortAllUsers();
    render();
}

function preventFormSubmit() {
    let form = document.querySelector('form');
    form.addEventListener('submit', () => event.preventDefault());
}

async function fetchCountries() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'); 
    const json = await res.json();

    allUsers = json.results.map(user => {
        const { name, dob, gender, picture } = user;

        return {
            name: name.first + " " + name.last,
            age: dob.age,
            gender: (gender == "male") ? "masculino" : "feminino",
            picture: picture.thumbnail
        }
    });

    sortAllUsers();
    render();
}

function sortAllUsers() {
    selectedUsers.sort((a, b) => {
        return a.name.localeCompare(b.name);
    })
}

function render() {
    renderUserList();
    renderSummary();
}

function renderUserList() {
    let usersHTML = "<div>";

    selectedUsers.forEach(user => {
        const { name, age, picture } = user;
        const userHTML = `
            <div class='user'>
                <div>
                    <img src="${picture}" alt="${name}"/>
                </div>
                <div>
                    <ul>
                        <li>${name}, ${age} Anos</li>
                    </ul>
                </div>
            </div>
        `;

        usersHTML += userHTML;
    });

    usersHTML += "</div>"

    tabUsers.innerHTML = usersHTML;
}

function renderSummary() {
    countUsers.textContent = selectedUsers.length;
    
    sexoMasculinoSpan.textContent = selectedUsers.reduce((accumulator, current) => {
        if(current.gender === "masculino")
            ++accumulator;

            return accumulator;
    }, 0);

    sexoFemininoSpan.textContent = selectedUsers.reduce((accumulator, current) => {
        if(current.gender === "feminino")
            ++accumulator;

        return accumulator;

    }, 0);

    const somaIdades = selectedUsers.reduce((accumulator, current) => {
        return accumulator += current.age;
    }, 0);

    somaIdadesSpan.textContent = somaIdades;

    if(selectedUsers.length == 0)
        mediaIdadesSpan.textContent = 0;
    else
        mediaIdadesSpan.textContent = (somaIdades / selectedUsers.length).toFixed(2);
}
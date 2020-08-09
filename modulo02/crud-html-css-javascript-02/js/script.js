let globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener('load', () => {
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activateInput();
    render();
    clearInput();
});

function preventFormSubmit() {
    let form = document.querySelector('form');
    form.addEventListener('submit', () => event.preventDefault());
}

function activateInput() {
    function insertName(name) {
        globalNames = [...globalNames, name];
    }

    function updateName(name) {
        globalNames[currentIndex] = name;
    }
    
    inputName.addEventListener('keyup', () => {
        if(event.key !== 'Enter' || !event.target.value.trim())
            return;

        
        (isEditing) ? updateName(event.target.value) : insertName(event.target.value);

        isEditing = false;
        render();
        clearInput();
    });
    inputName.focus();
}

function render() {
    function createDeleteButton(index) {
        let button = document.createElement('button');
        button.classList.add('deleteButton');
        button.classList.add('clickable');
        button.textContent = 'X';

        button.addEventListener('click', () => {
            globalNames = globalNames.filter((_, i) => i !== index);
            render();
        });

        return button;
    }

    function createSpan(name, index) {
        let span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', () => {
            inputName.value = name;
            isEditing = true;
            inputName.focus();
            currentIndex = index;
        });

        return span;
    }

    let divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    let ul = document.createElement('ul');

    for(let i = 0; i < globalNames.length; i++) {
        let currentName = globalNames[i];

        let li = document.createElement('li');        
        let button = createDeleteButton(i);
        let span = createSpan(currentName, i);
        
        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }    
    
    divNames.appendChild(ul);
}

const clearInput = () => {
    inputName.value = "";
    inputName.focus();
}

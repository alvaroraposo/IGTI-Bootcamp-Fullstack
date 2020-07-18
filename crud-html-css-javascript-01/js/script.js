window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activateInput();
    render();
    clearInput();
}

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    function insertName(name) {
        globalNames.push(name);
    }

    function updateName(name) {
        globalNames[currentIndex] = name;
    }

    function handleTyping(event) {
        if(event.key !== 'Enter' || !event.target.value.trim())
            return;

        if(isEditing) {
            updateName(event.target.value);
        }
        else {
            insertName(event.target.value);
        }

        isEditing = false;
        render();
        clearInput();
    }
    
    inputName.addEventListener('keyup', handleTyping);
    inputName.focus();
}

function render() {
    function createDeleteButton(index) {
        function deleteName() {
            globalNames.splice(index, 1);
            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.classList.add('clickable');
        button.textContent = 'X';
        button.addEventListener('click', deleteName);

        return button;
    }

    function createSpan(name, index) {
        function editItem() {
            inputName.value = name;
            isEditing = true;
            inputName.focus();
            currentIndex = index;
        }

        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);

        return span;
    }

    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    var ul = document.createElement('ul');

    for(var i = 0; i < globalNames.length; i++) {
        var currentName = globalNames[i];

        var li = document.createElement('li');
        
        var button = createDeleteButton(i);
        var span = createSpan(currentName, i);
        li.appendChild(button);
        li.appendChild(span);

        ul.appendChild(li);
    }    
    
    divNames.appendChild(ul);
}

function clearInput() {
    inputName.value = "";
    inputName.focus();
}

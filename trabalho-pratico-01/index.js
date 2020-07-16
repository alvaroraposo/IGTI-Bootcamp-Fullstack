function onLoadInput() {
    document.querySelector("#colorDivId").style.backgroundColor = "black";
    document.querySelectorAll("input").forEach((i) => i.value = 0);
}

function onChangeInput() {
    const r = document.querySelector("#r").value;
    const g = document.querySelector("#g").value;
    const b = document.querySelector("#b").value;

    document.querySelector("#colorDivId").style.backgroundColor = `rgb(${r},${g},${b})`

    document.querySelector("#r+input").value = r;
    document.querySelector("#g+input").value = g;
    document.querySelector("#b+input").value = b;
}
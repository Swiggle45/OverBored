function addElement(){
    let list = document.getElementById("ourList");
    let li = document.createElement("li");
    let input = document.getElementById("addToList").value;
    let t = document.createTextNode(input);
    li.appendChild(t);
    list.appendChild(li);
    document.getElementById("addToList").value = "";
}

document.body.onkeyup = function (e) {
    if (e.keyCode == 13) {
        newItem();
    }
}
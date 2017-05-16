var currentSelection = 0;

var area = document.getElementById("area");
var selector = document.getElementById("selector");
var moneyCounter = document.getElementById("money-counter");
var moneyContainer = document.getElementById("money-bar-container");
var moneyBar = document.getElementById("money-bar");
var moneyButton = document.getElementById("money-button");
var heatCounter = document.getElementById("heat-counter");
var heatContainer = document.getElementById("heat-bar-container");
var heatBar = document.getElementById("heat-bar");
var heatButton = document.getElementById("heat-button");

var heat = [0, 100];
var money = [10, 0, 100];
var jsID = [];

var tabs = [];

//Create grid and nested array
for (x = 0; x < 15; x++) {
    var column = document.createElement("div");
    column.className = "column";
    area.appendChild(column);
    var r = [];
    for (y = 0; y < 15; y++) {
        var block = document.createElement("div");
        column.appendChild(block);
        block.className = "block";
        block.id = idSelector(x) + "," + idSelector(y);
        block.onclick = "changeTile(x, y)";
        var c = idSelector(x) + "," + idSelector(y);
        r.push(c);
    }
    jsID.push(r);
}

//Changes the current selection
function changeSelection(idnumber) {
    if (currentSelection === idnumber) {
        currentSelection = 0;
    } else {
        currentSelection = idnumber;
    }
}

//Change what the tile is
function changeTile(x, y) {
    if (jsID[x][y] === currentSelection) {
        return null;
    }
}

//Generates value for grid
function idSelector(value) {
    if (value < 9) {
        var newValue = "0" + (value + 1);
        return newValue;
    } else {
        var newValue = "" + (value + 1);
        return newValue;
    }
}

//Controls money gain, money bar, heat gain, heat bar
function main() {
    money[0] += 0;
    if ((money[2] - money[1]) < 13 && money[1] < money[2]) {
        money[1] += money[2] - money[1];
    } else if (money[1] < money[2]) {
            money[1] += 13;
    }
    
    moneyCounter.textContent = "$" + money[0];
    moneyBar.style.width = 178 - ((178 * (money[2] - money[1])/money[2])) + "px";
    moneyButton.innerText = "Power: " + money[1];
    heatCounter.innerText = "Heat: " + heat[0] + "/" + heat[1];
    heatBar.style.width = 178 - ((178 * (heat[1] - heat[0])/heat[1])) + "px";
}

//Sets main to run every 250ms
var gibberish = setInterval(main, 250);

function tile(x, y) {
    money[0] += 1;
}

//Power --> Money conversion
function collect() {
    money[0] += money[1];
    money[1] = 0;
}

//Clears 10 heat currently; planning to add variable numbers
function heatRemoval() {
    heat[1] -= 10;
}
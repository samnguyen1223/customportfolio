var xhttp = new XMLHttpRequest();
var contentcontainer = document.getElementById("contentcontainer");

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    cards(this);
    }
};

xhttp.open("GET", "portfolio.xml", true);
xhttp.send();

function cards(xml) {
  var xmlDoc = xml.responseXML;
  var images = xmlDoc.getElementsByTagName("image");
  for (i = 0; i < images; i++) {
    var x = xmlDoc.getElementsByTagName("image")[i];
    var card = document.createElement("div");
    var topcard = document.createElement("div");
    var bottomcard = document.createElement("div");
    card.class = "card";
    topcard.class = "cardtop";
    bottomcard.calss = "cardbottem";
    card.id = "card"[i];
    contentcontainer.appendChild(card);
  }
};

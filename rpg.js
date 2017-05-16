var userhp = [100, 100];
var classmultiplier = [1, 1, 1];
var rawstats = [2, 1, 100];
var userstats = [2, 1];
var userexp = [0, 10];
var gold = 100;
var exp = 100;
var equipment = [0, 0];
var userclass = 0;
var tier = 0;
var classcost = 100;

var enemyhp = [10, 10];
var enemystats = [1, 0];
var enemylevel = 1;
var kills = 0;
var enemygold = 1;
var enemyexp = 1;

var goldcosts = [1, 1];
var expcosts =[100, 100, 100];

equipmentUpdate();

$(function() {
    main();

    function main() {
        setTimeout(main, 500);

        fight();
        if (userhp[0] > 0) {
            var userbarwidth = ($(document).width() * 0.72) *  (1 - ((userhp[1] - userhp[0]) / userhp[1]));
            $("#userhptext").text(userhp[0].toFixed(2) + "/" + userhp[1]);
            $("#userhpbar").width(userbarwidth);
        }
        if (enemyhp[0] > 0) {
            var enemybarwidth = ($(document).width() * 0.72) *  (1 - ((enemyhp[1] - enemyhp[0]) / enemyhp[1]));
            $("#enemyhptext").text(enemyhp[0].toFixed(2) + "/" + enemyhp[1]);
            $("#enemyhpbar").width(enemybarwidth);
        }
        $("#gold").text(gold + "g");
        $("#exp").text(exp + "exp");
        $("#userstats").text(userstats[0] + " ATK / " + userstats[1] + " DEF");


        function fight() {
            if (enemyhp[0] > 0 && userhp[0] > 0) {
                enemyhp[0] -= userstats[0] * 500/(500+enemystats[1]);
                userhp[0] -= enemystats[0] * 500/(500+userstats[1]);
                if (enemyhp[0] <= 0) {
                    $("#enemyhptext").text("DEAD!");
                    $("#enemyhptext").css("color", "#FF3D00");
                    $("#enemyhpbar").width("0px");
                    kills += 1;
                    enemyLevelUp();
                } else if (userhp[0] <= 0) {
                    $("#userhptext").text("DEAD!");
                    $("#userhptext").css("color", "#FF3D00");
                    $("#userhpbar").width("0px");
                }
            } else if (enemyhp[0] <= 0) {
                enemyhp[1] += increase(0, 1, 1);
                enemystats[0] += increase(0, 1, 0.25);
                enemystats[1] += increase(0, 1, 0.25);
                $("#enemystats").text(enemystats[0] + " ATK / " + enemystats[1] + " DEF");
                enemyhp[0] = enemyhp[1];
                userhp[0] = userhp[1];
                $("#enemyhptext").css("color", "black")
                gold += enemygold;
                exp += enemyexp;
                equipmentUpdate();
                classUpdate();
            } else if (userhp[0] <= 0) {
                userhp[0] = userhp[1];
                enemyhp[0] += enemyhp[1]/2;
                $("#userhptext").css("color", "black")
            }
        }
        function enemyLevelUp() {
            if (1 + Math.floor(kills / 15) > enemylevel) {
                enemylevel += 1;
                enemyhp[1] += 5;
                enemystats[0] += 1;
                enemystats[1] += 1;
            }
            $("#enemyhpname").text("Slime LVL " + enemylevel + " / " + kills + " Kills");
            enemygold = enemylevel + Math.floor(Math.pow(1.01, kills)) - 1;
            enemyexp = enemylevel + Math.floor(Math.pow(1.01, kills)) - 1;
        }

        function increase(minimum, normal, multiplier) {
            var randomvariation = Math.random();
            if (randomvariation < 0.90) {
                return minimum;
            } else {
                return (normal * multiplier);
            }
        }
    }
})

function levelEquipment(index) {
    if (gold >= goldcosts[index]) {
        equipment[index] += 1;
        rawstats[index] += Math.floor(Math.pow(1.05, equipment[index]));
        gold -= goldcosts[index];
        equipmentUpdate();
        goldCost(equipment[index], index);
        $("#userstats").text(userstats[0] + " ATK / " + userstats[1] + " DEF");
        if (index == 0) {
            $("#weapontext").text("LVL " + (equipment[0] + 1) + " Weapon / " + goldcosts[0] + "g");
        } else {
            $("#armortext").text("LVL " + (equipment[1] + 1) + " Armor / " + goldcosts[1] + "g");
            rawstats[2] += 10 * Math.floor(Math.pow(1.01, equipment[index]));
        }
    }
    $("#gold").text(gold + "g");
}

function equipmentUpdate() {
    if (gold >= goldcosts[0]) {
        $("#weaponbtn").removeAttr("disabled");
        $("#weaponbtn").removeClass("disabled");
        $("#weaponbtn").addClass("enabled");
    } else {
        $("#weaponbtn").attr("disabled");
        $("#weaponbtn").addClass("disabled");
        $("#weaponbtn").removeClass("enabled");
    }
    if (gold >= goldcosts[1]) {
        $("#armorbtn").removeAttr("disabled");
        $("#armorbtn").removeClass("disabled");
        $("#armorbtn").addClass("enabled");
    } else {
        $("#armorbtn").attr("disabled");
        $("#armorbtn").addClass("disabled");
        $("#armorbtn").removeClass("enabled");
    }
    userstats[0] = rawstats[0] * classmultiplier[0];
    userstats[1] = rawstats[1] * classmultiplier[1];
    userhp[1] = rawstats[2] * classmultiplier[2];
}

function classUpdate() {
    if (exp >= classcost) {
        $("#dpsbtn").removeAttr("disabled");
        $("#dpsbtn").removeClass("disabled");
        $("#dpsbtn").addClass("enabled");
        $("#tankbtn").removeAttr("disabled");
        $("#tankbtn").removeClass("disabled");
        $("#tankbtn").addClass("enabled");
    }
}

function goldCost(level, index) {
    goldcosts[index] = (2 * Math.floor(Math.pow(2, level/4)) - 1);
}

function chooseClass(choice) {
    if (choice == 0) {
        userclass = 100;
        classmultiplier[0] *= 1.5;
        classmultiplier[1] *= 0.75;
        classmultiplier[2] *= 0.75;
    } else {
        userclass = 200;
        classmultiplier[0] *= 0.75;
        classmultiplier[1] *= 1.25;
        classmultiplier[2] *= 1.50;
    }
    exp -= classcost;
    $("#class").hide();
    equipmentUpdate();
}
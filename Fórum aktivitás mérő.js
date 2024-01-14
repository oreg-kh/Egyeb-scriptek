javascript:
var obj = {};
var worksheet = "Fórum aktivitás mérő";
var uri = "data:application/vnd.ms-excel;base64,";
var textarea = "textarea#scriptused_text";
var textarea_html = '<tr><td><textarea id="scriptused_text" onclick="selectTextarea()" rows="5" cols="30"></td></tr>';
var container = $(".forum-container .clearfix").find("tbody").first();
var htmlcontent = {
    text: [
        `<tr><td>
            <input class=date id="from" onchange="saveInputsValue()" type="date" value=${defaultInputsValue("from")}>-tól</input>`,
            `<input class=date id="to" onchange="saveInputsValue()" type="date" value=${defaultInputsValue("to")}>-ig</input>`,
            `<select id="sablon">`,
                `<option>Klán fórum</option>`,
                `<option>Külső fórum</option>`,
                `<option>Excel táblázat</option>`,
            `</select>`,
            `<button class=button id=save onclick="save()" type="button">Mentés</button>`,
            `<button class=button id=clearnames onclick="removeDatas()" type="button">Adatok törlése</button>`,
            `<button class=button id=datas onclick="addDataToStorage()" type="button">Adatok tárolása</button>`,
            `<b><code>>> Created by <a href="https://forum.klanhaboru.hu/index.php?members/öreg.19216" target="_blank">öreg</a></code></b>
         </td></tr>`
          ].join("&nbsp;")
}
var template = [
    `<html `,
        `xmlns:o="urn:schemas-microsoft-com:office:office" `,
        `xmlns:x="urn:schemas-microsoft-com:office:excel" `,
        `xmlns="http://www.w3.org/TR/REC-html40">`,
        `<meta http-equiv="content-type" `,
        `content="application/vnd.ms-excel; `,
        `charset=UTF-8">`,
        `<head>`,
            `<!--[if gte mso 9]>`,
                `<xml>`,
                    `<x:ExcelWorkbook>`,
                    `<x:ExcelWorksheets>`,
                    `<x:ExcelWorksheet>`,
                    `<x:Name>${worksheet}</x:Name>`,
                    `<x:WorksheetOptions>`,
                    `<x:DisplayGridlines/>`,
                    `</x:WorksheetOptions>`,
                    `</x:ExcelWorksheet>`,
                    `</x:ExcelWorksheets>`,
                    `</x:ExcelWorkbook>`,
                    `</xml>`,
            `<![endif]-->`,
        `</head>`,
        `<body>`,
            `<table></table>`,
        `</body>`,
    `</html>`
].join("");

(function () {
    
    if (game_data.screen === "forum") {
        createhtml();
        
    } else {
        UI.InfoMessage(
            "A script csak a fórumon működik, most átirányítunk oda!",1500
        );
        
        setTimeout(function () {
            window.location.assign(
                game_data.link_base_pure + 'forum&id=' + game_data.village.id
            );
        }, 2000);
    }
})();

function createhtml() {
    container.append(htmlcontent.text);
}

function removeDatas() {
    localStorage.removeItem("forum_activity");
    clearTextarea();
    UI.SuccessMessage("A játékosok, a hozzászólások számai és a like-ok törlésre kerültek.", 5000);
}

function saveInputsValue() {
    var from = $("input#from").val();
    var to = $("input#to").val();
    localStorage.setItem("from", JSON.stringify(from));
    localStorage.setItem("to", JSON.stringify(to));
    UI.SuccessMessage("A dátum megváltozott!",1500);
}

function defaultInputsValue(key) {
    localStorage.setItem(key, localStorage[key] ? localStorage[key] : toISOString());
    return localStorage[key];
}

function toISOString() {
    return new Date().toISOString().split('T')[0];
}

function createTextarea() {
    container.append(textarea_html);
}

function clearTextarea() {
    $(textarea).val("");
}

function removeTextarea() {
    $(textarea).remove();
}

function selectTextarea() {
    $(textarea).select();
}

function base64(template) {
	return window.btoa(unescape(encodeURIComponent(template)));
}

function initCss(css) {
    $(`<style>${css}</style>`).appendTo("body");
}

function today() {
    return new Date(toISOString()).getTime();
}

function yesterday() {
    return today() - 86400000;
}

function disableButton(id) {
    $(id).attr("disabled","");
}

function getLike(post) {
    var thanks = $('.post').eq(post).find(".thanksnum");
    var exist = thanks.length;
    
    switch (exist) {
        case 0:
            return 0
            break;
            
        case 1:
            return parseInt(thanks.text().match(/\d+/)[0]);
    }
}

function getPlayerName(post) {
    return $(".postheader_left").eq(post)[0].innerText.match(/(.*?)(?:ma ekkor|tegnap ekkor|\d{2}.\d{2}.\d{4})/)[1].replace(/\(törölve\)|.* - /,"").trim();
}

initCss(`
    .date:hover {
        box-shadow: 0 0 5px 3px green !important;
    }
    #clearnames:hover, #resetdates:hover {
        box-shadow: 0 0 5px 3px red !important;
    }
    #datas:hover {
        box-shadow: 0 0 5px 3px blue !important;
    }
    #save:hover {
        box-shadow: 0 0 5px 3px green !important;
    }
`);

function getDate(post) {
    var date = $(".igmline-date").eq(post).text().match(/(?:ma|tegnap|\d{2}.\d{2}.\d{4})/)[0];
    
    switch (date) {
        case "ma":
            return today();
            break;
            
        case "tegnap":
            return yesterday();
            break;
            
        default:
            return dateToMilliseconds(date);
    }
}

function dateToMilliseconds(string) {
    return new Date(string.split(".").reverse().join("-")).getTime();
}

// az adatok tárolása gombra kattintva eltárolja az object változóban: név, hozzászólások száma, like
function addDataToStorage() {
    storage = localStorage.forum_activity;
    disableButton("#datas");
    
    switch (!storage) {
        case true:
            var object = {};
            break;
            
        case false:
            var object = JSON.parse(storage);
    }

    for (var i = 0; i < $(".postheader_left").length; i++) {
        var time = getDate(i);
        var name = getPlayerName(i);
        var like = getLike(i);

        switch (true) {
            case !object[time]:
                
                Object.defineProperty(object, time, {
                    value: {
                        [name]: [1, like]
                    },
                    writable: true,
                    configurable: true,
                    enumerable: true
                });
                break;
            case !object[time][name]:
                
                Object.defineProperty(object[time], name, {
                    value: [1, like],
                    writable: true,
                    configurable: true,
                    enumerable: true
                });
                break;
            default:
                
                object[time][name][0] += 1;
                object[time][name][1] += like;
        }
    }
    localStorage.setItem("forum_activity", JSON.stringify(object));
    UI.SuccessMessage("Az adatok tárolása megtörtént!",2000)
}

// dátum megváltoztatásakor kigyűjti az adott intervallumnak megfelelő napokat
function process(from,to) {
    obj = {}
    storage = localStorage.forum_activity;
    
    switch (!storage) {
        case true:
            UI.SuccessMessage("Nincs eltárolt adat. Kattints az adatok eltárolása gombra!",2000);
            return false;
            break;
            
        case false:
            var object = JSON.parse(storage);
    }
    
    for (key in object) {
        var interval = parseInt(key) >= from && to >= parseInt(key);
        
        switch (interval) {
            case true:
                names = Object.keys(object[key]);
                sumDayDatas(names,object);
                break;
            
            case false:
                console.log(`Ez a nap nem esik bele az intervallumba: ${key}`);
        }
    }
}

// összegzi az obj változóban az intervallumnak megfelelő napok adatait
function sumDayDatas(names,object) {
    for (const element of names) {
        exist = !obj[element];
        comment = object[key][element][0];
        like = object[key][element][1];

        switch (exist) {
            case true:
                Object.defineProperty(obj, element, {
                    value: [comment,like],
                    writable: true,
                    configurable: true,
                    enumerable: true
                });
                break;

            case false:
                obj[element][0] += comment;
                obj[element][1] += like;
        }
    }
}


function tableToExcel(table) {
    temp = template.split("<table>");
	window.location.href = uri + base64(temp[0] + table + temp[1]);
}

// mentés gombra kattintás
function save() {
    from = $("input#from")[0].valueAsNumber;
    to = $("input#to")[0].valueAsNumber;
    var proc = process(from,to);
    var select = $("#sablon").val();
    
    switch (proc) {
        case false:
            return;
    }

    switch (JSON.stringify(obj) === "{}") {
        case true:
            clearTextarea();
            UI.ErrorMessage("A megatott idő intervallumban nem található fórum hozzásólás!",2000);
            return;
            break;
        case false:
            var table = createContent();
    }
    
    switch (select) {
        case "Külső fórum":
            $(textarea).val(table);
            UI.SuccessMessage(`Az adatok feldolgozása a ${select}ra megtörtént!`,2000);
            break;
        case "Klán fórum":
            $(textarea).val(table);
            UI.SuccessMessage(`Az adatok feldolgozása a ${select}ra megtörtént!`,2000);
            break;
        case "Excel táblázat":
            tableToExcel(table);
            UI.SuccessMessage(`Az adatok feldolgozása az ${select}hoz megtörtént!`,2000);
    }
}

function sort() {
    return Object.entries(obj).sort((a, b) => b[1][0] - a[1][0]);
}

// sorba rendezés és táblázatok elkészítése
function createContent() {
    var text = "";
    var select = $("#sablon").val();
    var sorted = sort();
    removeTextarea();
    createTextarea();
    
    for(var i = 0; i < sorted.length; i++) {

        switch (select) {
            case "Külső fórum":
                text += `[TR][TD]${sorted[i][0]}[/TD][TD]${sorted[i][1][0]}[/TD][TD]${sorted[i][1][1]}[/TD][/TR]`;
                table = `[TABLE][TR][TH]Név[/TH][TH]Hozzászólás[/TH][TH]Like[/TH][/TR]${text}[/TABLE]`;
                break;
            case "Klán fórum":
                text += `[*]${sorted[i][0]}[|]${sorted[i][1][0]}[|]${sorted[i][1][1]}`;
                table = `[table][**]Név[||]Hozzászólás[||]Like[/**]${text}[/table]`;
                break;
            case "Excel táblázat":
                text += `<tr><td style='mso-number-format:"\@";/*force text*/'>${sorted[i][0]}</td><td>${sorted[i][1][0]}</td><td>${sorted[i][1][1]}</td></tr>`;
                table = `<table><tr><th>Név</th><th>Hozzászólás</th><th>Like</th></tr>${text}</table>`;
        }
    }
    return table;
}
void(0);

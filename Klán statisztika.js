javascript:
var player = $("#content_value td:first table:last a");
var table = $("#content_value td:first table:last");
var firstTable = $("#content_value td:first table:first").find("tbody");
var tbody = table.find("tbody");
var rows = tbody.find("tr");
var firstRow = table.find("tr:first");
var background = "https://dshu.innogamescdn.com/asset/9b87e56e/graphic/index/main_bg.jpg";
var pre = "/game.php?screen=ranking&mode=";
var urls = [
    `${pre}in_a_day&type=kill_att&name=`,
    `${pre}in_a_day&type=kill_def&name=`,
    `${pre}in_a_day&type=kill_sup&name=`,
    `${pre}in_a_day&type=loot_res&name=`,
    `${pre}in_a_day&type=scavenge&name=`,
    `${pre}kill_player&type=att&name=`,
    `${pre}kill_player&type=def&name=`,
    `${pre}kill_player&type=support&name=`
];

function resolveAfterSeconds(name,url) {
    return $.ajax({
        url: `https://${document.domain}${urls[url]}${name}`,
        type: 'GET',
        async: false,
        success: function(data) {},
        error: function(xhr, statusText, error) {}
    })
}

async function asyncCall(i,url) {
    if (i < player.length) {
        var name = getPlayerId(i);
        i++;
    } else if (i == player.length && url < urls.length-1) {
        i = 0;
        var name = getPlayerId(i);
        i++;
        url++;
    } else {
        addColumns();
        createButtons();
        disableButtons();
        select();
        compare();
        return;
    }
    var result = await resolveAfterSeconds(name,url);
    getData(result,name,i,url);
    setTimeout(() => {
        asyncCall(i,url);
    }, 200);
}

function getPlayerId(i) {
    return player.eq(i).text().trim();
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
}

function initCss(css) {
    $(`<style>${css}</style>`).appendTo("body");
}

function addtbody() {
    table.append(`
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><b>Összesen:</b></td>
            </tr>
        </tbody>
    `);
}

function createButtons() {
    firstTable.append(`
        <tr>
            <td>
                <button type="button" id="button1" onclick="kulso()">Exportálás külső fórumra</button>
                <textarea id="textplace1" rows="5" cols="40"></textarea>
            </td>
        </tr>
        <tr>
            <td>
                <button type="button" id="button2" onclick="belso()">Exportálás klán fórumra</button>
                <textarea id="textplace2" rows="5" cols="40"></textarea>
            </td>
        </tr>
        <tr>
            <td>
                <b><code> » Created by öreg</code></b>
            </td>
        </tr>
    `);
}

function disableButtons() {
    $("#button1, #button2").on("click", function(event) {
        $(event.target).prop("disabled", true);
        console.log(event);
    });
}

function select() {
    $("#textplace1, #textplace2").on("click", function() {
        $(this).select();
    });
}

initCss(`
    #content_value .vis:nth-child(3) th {
        text-align: center !important;
        white-space: nowrap !important;
    }
    #content_value .vis:nth-child(3) tr:nth-child(1) th:nth-child(-n+5) {
        background-image: url(${background}) !important;
    }
    button:hover {
        cursor:pointer;
    }
`);

function createHeader() {
    firstRow.before(`
        <tr>
            <th>${""}</th>
            <th>${""}</th>
            <th>${""}</th>
            <th>${""}</th>
            <th>${""}</th>
            <th colspan="6">${"Napi"}</th>
            <th colspan="3">${"Összes"}</th>
        </tr>
    `);

    firstRow.append(`
        <th>${"Támadó"}</th>
        <th>${"Védekező"}</th>
        <th>${"Támogató"}</th>
        <th>${"Farm"}</th>
        <th>${"Gyűjtögetés"}</th>
        <th>${"Farm + Gyűjt."}</th>   
        <th>${"Támadó"}</th>
        <th>${"Védekező"}</th>
        <th>${"Támogató"}</th>
    `);
}

function getData(data,par,k,url) {
        row = table.find("tr");
        if (url == 5) {
            loot_res = parseInt(row.eq(k+1).find("td").eq(8).text().replace(/\./g,""));
            scavenge = parseInt(row.eq(k+1).find("td").eq(9).text().replace(/\./g,""));
            sum = loot_res + scavenge;
            row.eq(k+1).append(`<td class=add>${numberWithCommas(sum)}</td>`);
        }
        if (url > 4) {
            var selector = $(data).find("#kill_player_ranking_table").next().find("tr");
        } else {
            var selector = $(data).find("#in_a_day_ranking_table").find("tr");
        }
        for (var i = 1; i < selector.length; i++) {
            var name = selector.eq(i).find("td").eq(1).text().trim();
            var point = parseInt(selector.eq(i).find("td").eq(3).text().trim().replace(/\./g,""));
            if (name == par) {
                break;
            } else {
                point = 0;
            }
        }
        row.eq(k+1).append(`<td class=sum${url}>${numberWithCommas(point)}</td>`);
}

function addColumns() {
    addtbody();
    var lastrow = table.find("tbody:last tr");
    for (var i = 0; i < 8; i++) {
        val = $(`.sum${i}`).length;
        var sum = 0;
        var add = 0;
        for (var k = 0; k < val; k++) {
            if (i == 5) {
                add += parseInt($(`.add`).eq(k).text().replace(/\./g,""));
            }
            sum += parseInt($(`.sum${i}`).eq(k).text().replace(/\./g,""));
        }
        if (i == 5) {
            lastrow.append(`<td class=kesz>${numberWithCommas(add)}</td>`);
            lastrow.append(`<td class=kesz>${numberWithCommas(sum)}</td>`);
        } else {
            lastrow.append(`<td class=kesz>${numberWithCommas(sum)}</td>`);
        }
    }
}

// külső fórum
function kulso() {
    var text = "";
    table.find("tr").not(":first").each(function(a) {
        var a = a;
        text += `[TR]`;
        $.each(this.cells, function(k,v){
            if (a == 0) {
                text += `[TH]${v.innerText.trim()}[/TH]`;
            } else {
                text += `[TD]${v.innerText.trim()}[/TD]`;
            }
        })
        text += `[/TR]`;
    });
    var output = `[TABLE]${text}[/TABLE]`;
    $("#textplace1").val(output);
    console.log(output);
}

// klán fórum
function belso() {
    var text = "";
    table.find("tr").not(":first").each(function(a) {
        var a = a;
        $.each(this.cells, function(k,v){
            if (a == 0) {
                if (k == 0) {
                    text += `[**]${v.innerText.trim()}`;
                } else if (k == table.find("tr")[1].cells.length-1) {
                    text += `[||]${v.innerText.trim()}[/**]`;
                } else {
                    text += `[||]${v.innerText.trim()}`;
                }
            } else {
                if (k == 0) {
                    text += `[*]${v.innerText.trim()}`;
                } else if (k == table.find("tr")[1].cells.length-1) {
                    text += `[|]${v.innerText.trim()}[/*]`;
                } else {
                    text += `[|]${v.innerText.trim()}`;
                }
            }
        })
    });
    var output = `[table]${text}[/table]`;
    $("#textplace2").val(output);
    
    console.log(output);
}

// oszlopok rendezése
function compare() {
    var getCellValue = function(tr, idx) {
        return tr.children[idx].innerText.replace(/,/g, "").replace(/\./g, "");
    }

    var comparer = function(idx, asc) {
        return function(a, b) {
            return function(v1, v2) {
                return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
            }(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
        }
    };

    Array.prototype.slice.call(document.querySelectorAll('th')).forEach(function(th) {
        th.addEventListener('click', function() {
            var table = th.parentNode
            while (table.tagName.toUpperCase() != 'TBODY') table = table.parentNode;
            Array.prototype.slice.call(table.querySelectorAll('tr:nth-child(n+3)'))
                .sort(comparer(Array.prototype.slice.call(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                .forEach(function(tr) {
                    table.appendChild(tr)
                });
        })
    });
}
createHeader();
asyncCall(0,0);


void(0);

javascript:
function formatDateToString(date) {
    // get day
    dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    // get month
    mm = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    // get year
    yyyy = date.getFullYear();
    // return date
    return [yyyy + "-" + mm + "-" + dd, yyyy, mm, dd];
    }

function clearNames() {
    localStorage.removeItem("x");
    $("textarea#scriptused_text").val("");
    UI.SuccessMessage("A játékosok és a hozzászólások számai törlésre kerültek.", 2000);
}

function resetDates() {
    localStorage.removeItem("from");
    localStorage.removeItem("to");
    defaultInputsValue()
    $("input#date1")[0].value = localStorage["from"];
    $("input#date2")[0].value = localStorage["to"];
}

function saveInputsValue() {
    from = $("input#date1")[0].value;
    to = $("input#date2")[0].value;
    localStorage.setItem("from", from);
    localStorage.setItem("to", to);
}

function defaultInputsValue() {
    localStorage["from"] = localStorage["from"] != null ? localStorage["from"] : formatDateToString(new Date())[0];
    localStorage["to"] = localStorage["to"] != null ? localStorage["to"] : formatDateToString(new Date())[0];
}

function createInput(callback) {
    defaultInputsValue()
    content = `<input type="date" value=${localStorage["from"]} id="date1" name="name">-tól</input>
               &nbsp;
               <input type="date" value=${localStorage["to"]} id="date2" name="name">-ig</input>
               &nbsp;
               <button type="button" id="button1" onclick="clearNames()">Adatok törlése</button>
               &nbsp;
               <button type="button" id="button2" onclick="resetDates()">Dátumok törlése</button>
               &nbsp;
               <button type="button" id="button3" onclick="run()">Adatok</button>`;
    $(".forum-content.clearfix").find("tr").first().after(content);
    callback()
}
createInput(loop)

$("#date1, #date2").on('change', function(event) {
    async function change() {
        await saveInputsValue();
        await clearNames();
        await loop();
        await run();
    }
    change()
})

$("#button2").on("click", function(event) {
    async function click() {
        await resetDates();
        await saveInputsValue();
        await clearNames();
        await loop();
        await run();
    }
    click()
})

$("#button1, #button2, #button3, #date1, #date2").on("mouseenter", function(event) {
    if (event.target.id == "button1") {
        $(this).css("box-shadow", "0 0 5px 3px red");
    } else if (event.target.id == "button2") {
        $(this).css("box-shadow", "0 0 5px 3px red");
    } else if (event.target.id == "button3") {
        $(this).css("box-shadow", "0 0 5px 3px blue");
    } else if (event.target.id == "date1") {
        $(this).css("box-shadow", "0 0 5px 3px green");
    } else if (event.target.id == "date2") {
        $(this).css("box-shadow", "0 0 5px 3px green");
    }
})

$("#button1, #button2, #button3, #date1, #date2").on("mouseleave", function() {
    $(this).removeAttr("style");
})

function loop() {
    var array = [];
    for (var i = 0; i < $("form .post").length; i++) {
        data = $(".igmline-date")[i].textContent.split(" ")[0];
        format = formatDateToString(new Date());
        if (data == "ma") {
            day = format[3];
            month = format[2];
            year = format[1];
        } else if (data == "tegnap") {
            day = format[3] - 1;
            month = format[2];
            year = format[1];
        } else {
            day = data.split(".")[0];
            month = data.split(".")[1];
            year = data.split(".")[2];
        }
        if (month < 10) {
            month = Number(month.charAt(1))
        }
        from = (new Date($("#date1").val()).getTime()) / 1000 - 7200;
        forum = (new Date(year, month - 1, day).getTime()) / 1000;
        to = (new Date($("#date2").val()).getTime()) / 1000 - 7200;
        if (from <= forum && forum <= to) {
            try {
                array.push($(".postheader_left").eq(i).find("a").last().text().split(" - ")[1].trim());
            } catch (error) {
                array.push($(".postheader_left").eq(i).find("a").last().text().trim());
                array.push($(".postheader_left")[i].childNodes[0].nodeValue.trim().split(" ")[0]);
            }
        } else if (forum > to) {
            UI.InfoMessage("Elérted az időintervallum végét.", 2000);
        }
    }
    localStorage["x"] = localStorage["x"] != null ? localStorage["x"] : "";
    localStorage["x"] += String(array) + ",";
}

function output(arr) {
    var a = [],
        b = [],
        prev;
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = arr[i];
    }
    return [a, b];
}

function run() {
    if (!$("#scriptused_text").is(":visible")) {
        $(".forum-content.clearfix").find("tbody").first().after('<textarea id="scriptused_text" rows="5" cols="30">');
        $("textarea#scriptused_text").on("mouseup", function() {
            $(this).select();
        })
    }
    for (var i = 1; i < output(localStorage.getItem("x").split(","))[0].length; i++) {
        $('textarea#scriptused_text').val($('textarea#scriptused_text').val() +
            output(localStorage.getItem("x").split(","))[0][i] +
            ": " +
            output(localStorage.getItem("x").split(","))[1][i] +
            "\n");
    }
}
void(0);

let open_cell = "<tr><td>";
let close_cell = "</td></tr>";
let search = '<i class="fas fa-link"></i>';

function main() {
  var addr = $("#bitcoinAddr").val() || $("#ethereumAddr").val();
  if (!("fetch" in window)) {
    alert(
      "Non hai di un browser di ultima generazione, porocedura interrotta!"
    );
  }

  if (addr && addr != "") {
    fetch("assets/data/btc.json", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => fillSelect(data))
      .catch((err) => {
        console.log(err);
      });
  }
}

function fillSelect(jsondata) {
  jsondata.forEach((element) => {
    popolaRiga(element);
  });
}

function popolaRiga(element, address) {
  let ret = "";
  $.get(element.url + address + element.end_url, function (data) {
    //icon of the fork
    ret = `${open_cell}<img src="${element.icon}" class="symbol-mini"/>${close_cell}`;
    //name of the fork
    ret += `${open_cell} ${element.name} ${close_cell}`;

    if (data.error) {
      //balance 0 for current address
      ret += `${open_cell} 0 ${close_cell}`;
      ret += `${open_cell} - ${close_cell}`;
    } else {
      //balance for current address
      ret += `${open_cell} ${data} ${element.symbol} ${close_cell}`;
      ret += `${open_cell} '<a href="${element.url}${address}${element.end_url}" target="_blank">view on main site</a> ${open_cell} ${close_cell}`;
    }
    $("#result tbody").append(ret);
  });
}

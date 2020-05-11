function main(form) {
  //coin address
  let addr = form.target[2].value;

  // if btc selected true else false
  let isbtc = form.target[0].checked;

  if (!("fetch" in window)) {
    alert(
      "Non hai di un browser di ultima generazione, porocedura interrotta!"
    );
  }

  if (addr) {
    fetch("assets/data/btc.json", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => fillSelect(data, isbtc))
      .then($(".result-box").fadeIn(400))
      .catch((err) => {
        console.log(err);
      });
  } else {
    $(".result-box").hide();
  }
}

function fillSelect(jsondata, isbtc) {
  let coin = isbtc ? "bitcoin" : "ethereum";

  let data = jsondata.filter(function (element) {
    return element.type == coin;
  });

  data.forEach((element) => {
    popolaRiga(element);
  });
}

function popolaRiga(element, address) {
  let open_cell = "<tr><td>";
  let close_cell = "</td></tr>";
  let ret = "";

  $.get(element.url + address + element.end_url, function (data) {
    //icon of the fork
    console.log("entrato");
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
    $("#rwd-table").append(ret);
  });
}

$(document).on("ready", function () {
  $(".result-box").hide();
  $(".field").on("focus", function () {
    $("body").addClass("is-focus");
  });

  $(".field").on("focus", function () {
    $("body").addClass("is-focus");
  });

  $(".field").on("blur", function () {
    let textLenght = $(".field").val().length;
    if (textLenght <= 0) {
      $("body").removeClass("is-focus is-type");
    }
  });

  $(".field").on("keydown", function (event) {
    $(".result-box").fadeOut(400);
    $("body").addClass("is-type");
    if (event.which === 8 && $(this).val() === "") {
      $("body").removeClass("is-type");
    }
    let textLenght = $(".field").val().length - 1;
    if (textLenght <= 0) {
      $("body").removeClass("is-focus is-type");
    }
  });

  $("#form-search").submit(function (e) {
    e.preventDefault();
    main(e);
  });

  $("#close-result").click(function () {
    $(".result-box").fadeOut(400);
  });
});

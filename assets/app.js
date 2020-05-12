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
      .then((data) => fillSelect(data, isbtc, addr))
      .then($(".result-box").fadeIn(400))
      .catch((err) => {
        console.log(err);
      });
  } else {
    $(".result-box").hide();
  }
}

function fillSelect(jsondata, isbtc, addr) {
  let coin = isbtc ? "bitcoin" : "ethereum";

  let data = jsondata.filter(function (element) {
    return element.type == coin;
  });

  data.forEach((element) => {
    popolaRiga(element, addr);
  });
}

function popolaRiga(element, addr) {
  let open_row = "<tr><td>";
  let open_cell = "<td>";
  let close_cell = "</td>";
  let close_row = "</td></tr>";
  let ret = "";
  let link = element.link.replace("${addr}", addr);

  $.get(element.url.replace("${addr}", addr), function (data) {
    ret += `${open_row} ${element.name} ${close_cell}`;
    ret += `${open_cell} <img src="assets/media/${element.icon}" class="symbol-mini"/>${close_cell}`;

    if (data.error) {
      //balance 0 for current address
      ret += `${open_cell} 0 ${element.symbol} ${close_cell}`;
      ret += `${open_cell} - ${close_row}`;
    } else {
      debugger;
      console.log(data);
      //balance for current address
      ret += `${open_cell} ${eval(data + "." + element.total_element)} ${
        element.symbol
      } ${close_cell}`;
      ret += `${open_cell} <a href="${link} target="_blank" class="table-link">view &rsaquo;</a> ${close_row}`;
    }
    $(".rwd-table").append(ret);
  });
}

function eval_tree(tree) {
  return Function("" + tree + "")();
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

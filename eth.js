function ethereum() {
  var TABLE_ROW = "<tr><td>$name</td><td>$symbol</td><td>$balance</td><td>$link</td></tr>";


  var addr = $("#ethereumAddr").val();
  if (addr && addr != "") {
    $("#ethereum-result > tbody").html("");

    var search = "<i class=\"fas fa-link\"></i>";

    console.log("dentro ethereum", addr);
    $("#ethereum-result").show();

    $.get("https://api.gastracker.io/addr/" + addr, function(data) {
      console.log("ETC", addr, data);

	  row = TABLE_ROW;
      row = row.replace("$symbol", "<img src=\"media/etc.png\" class=\"symbol-mini\"/>");
      row = row.replace("$name", "Ethereum Classic");

      if(!data) {
        row = row.replace("$balance", 0+ " ETC");
        row = row.replace("$link", "-");
      } else {
        row = row.replace("$balance", data.balance.ether + " ETC");
        row = row.replace("$link", "<a href=\"https://gastracker.io/addr/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#ethereum-result tbody").append($(row));
    }); //END ETC

    $.post("https://explorer.etherzero.org/addr", {"addr": addr}, function(data) {
      console.log("ETZ", addr, data);

	  row = TABLE_ROW;
      row = row.replace("$symbol", "<img src=\"media/etz.png\" class=\"symbol-mini\"/>");
      row = row.replace("$name", "Ether Zero");

      if(!data) {
        row = row.replace("$balance", 0+ " ETZ");
        row = row.replace("$link", "-");
      } else {
        row = row.replace("$balance", data.balance.ether + " ETZ");
        row = row.replace("$link", "<a href=\"http://explorer.etherzero.org/addr/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#ethereum-result tbody").append($(row));
    }); //END ETZ
  }
}

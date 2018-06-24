function ethereum() {
  var addr = $("#ethereumAddr").val();
  if (addr && addr != "") {
    $("#ethereum-result > tbody").html("");

    var search = "<i class=\"fas fa-link\"></i>";

    console.log("dentro ethereum", addr);
    $("#ethereum-result").show();

    $.get("https://api.gastracker.io/addr/" + addr, function(data) {
      console.log("ETC", addr, data);

      var resultROW = "<tr><td>$symbol</td><td>$balance</td><td>$link</td></tr>";

      //resultROW = resultROW.replace("$data", moment().format("YYYY-MM-DD HH:mm:ss"));
      resultROW = resultROW.replace("$symbol", "<img src=\"media/etc.png\" class=\"symbol-mini\"/>");

      if(!data) {
        resultROW = resultROW.replace("$balance", 0+ " ETC");
        resultROW = resultROW.replace("$link", "-");
      } else {
        resultROW = resultROW.replace("$balance", data.balance.ether + " ETC");
        resultROW = resultROW.replace("$link", "<a href=\"https://gastracker.io/addr/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#ethereum-result tbody").append($(resultROW));
    }); //END ETC

    $.post("https://explorer.etherzero.org/addr", {"addr": addr}, function(data) {
      console.log("ETZ", addr, data);

      var resultROW = "<tr><td>$symbol</td><td>$balance</td><td>$link</td></tr>";

      //resultROW = resultROW.replace("$data", moment().format("YYYY-MM-DD HH:mm:ss"));
      resultROW = resultROW.replace("$symbol", "<img src=\"media/etz.png\" class=\"symbol-mini\"/>");

      if(!data) {
        resultROW = resultROW.replace("$balance", 0+ " ETZ");
        resultROW = resultROW.replace("$link", "-");
      } else {
        resultROW = resultROW.replace("$balance", data.balance.ether + " ETZ");
        resultROW = resultROW.replace("$link", "<a href=\"http://explorer.etherzero.org/addr/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#ethereum-result tbody").append($(resultROW));
    }); //END ETZ
}
}

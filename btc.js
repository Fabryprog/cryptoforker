function bitcoin() {
  var TABLE_ROW = "<tr><td>$name</td><td>$symbol</td><td>$balance</td><td>$link</td></tr>";

		var addr = $("#bitcoinAddr").val();
  if (addr && addr != "") {
    $("#bitcoin-result > tbody").html("");

    var search = "<i class=\"fas fa-link\"></i>";

    console.log("dentro bitcoin", addr);
    $("#bitcoin-result").show();

    //$("#results").append($("<div class=\"address\">I am searching forked coin for you... (address <b>"+ addr + "</b>)</div>"));

    jQuery.get("https://btgexp.com/ext/getbalance/" + addr, function(data) {
        console.log("BTG", addr, data);

		row = TABLE_ROW;
        row = row.replace("$symbol", "<img src=\"media/btg.png\" class=\"symbol-mini\"/>");
        row = row.replace("$name", "BitCoin Gold");

        if(data.error) {
          row = row.replace("$balance", 0 + " BTG");
          row = row.replace("$link", "-");
      } else {
        row = row.replace("$balance", data + " BTG");
        row = row.replace("$link", "<a href=\"https://btgexp.com/address/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(row));
    }); //END BTG

    $.get("https://blockdozer.com/insight-api/addr/"+addr+"/balance", function(data){
      console.log("BCC", addr, data);

		row = TABLE_ROW;
      row = row.replace("$symbol", "<img src=\"media/bcc.jpg\" class=\"symbol-mini\"/>");
      row = row.replace("$balance", data + " BCC");
      row = row.replace("$name", "BitCoin Cash");

      if(data == 0) {
        row = row.replace("$link", "-");
      } else {
        row = row.replace("$link", "<a href=\"https://blockdozer.com/address/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(row));
    }); //END BCC

    $.get("http://52.187.7.191:3001/insight-api/addr/"+addr, function(data){
      console.log("BCD", addr, data);

		row = TABLE_ROW;
      row = row.replace("$symbol", "<img src=\"media/bcd.png\" class=\"symbol-mini\"/>");
      row = row.replace("$name", "BitCoin Diamond");

      if(!data || !data.balance || data.balance == 0) {
        row = row.replace("$balance", 0 + " BCD");
        row = row.replace("$link", "-");
      } else {
        row = row.replace("$balance", data.balance + " BCD");
        row = row.replace("$link", "<a href=\"http://explorer.btcd.io/#/address?loading=true&address=" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(row));
    }); //END BCD

    //BTX - BITCOINCORE
    $.get("https://insight.bitcore.cc/api/addr/"+addr+"/balance", function(data) {
      console.log("BTX", addr, data);

		row = TABLE_ROW;
      row = row.replace("$symbol", "<img src=\"media/btx.png\" class=\"symbol-mini\"/>");
      row = row.replace("$name", "BitCoin Core");

      if(!data) {
        row = row.replace("$balance", 0 + " BTX");
        row = row.replace("$link", "-");
      } else {
        row = row.replace("$balance", data / 100000000 + " BTX");
        row = row.replace("$link", "<a href=\"https://insight.bitcore.cc/address/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(row));
    });

    //BTCP - BITCOINPRIVATE
    $.get("https://explorer.btcprivate.org/api/addr/"+addr+"/balance", function(data) {
      console.log("BTCP", addr, data);

		row = TABLE_ROW;
      row = row.replace("$symbol", "<img src=\"media/btcp.png\" class=\"symbol-mini\"/>");
      row = row.replace("$name", "BitCoin Private");

      if(!data) {
        row = row.replace("$balance", 0 + " BTCP");
        row = row.replace("$link", "-");
      } else {
        row = row.replace("$balance", data / 100000000 + " BTCP");
        row = row.replace("$link", "<a href=\"https://explorer.btcprivate.org/address/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(row));
    });
  }
}

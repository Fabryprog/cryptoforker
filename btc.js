function bitcoin() {
  var addr = $("#bitcoinAddr").val();
  if (addr && addr != "") {
    $("#bitcoin-result > tbody").html("");

    var search = "<i class=\"fas fa-link\"></i>";

    console.log("dentro bitcoin", addr);
    $("#bitcoin-result").show();

    //$("#results").append($("<div class=\"address\">I am searching forked coin for you... (address <b>"+ addr + "</b>)</div>"));

    jQuery.get("https://btgexp.com/ext/getbalance/" + addr, function(data) {
        console.log("BTG", addr, data);
        var resultROW = "<tr><td>$symbol</td><td>$balance</td><td>$link</td></tr>";

        //resultROW = resultROW.replace("$data", moment().format("YYYY-MM-DD HH:mm:ss"));
        resultROW = resultROW.replace("$symbol", "<img src=\"media/btg.png\" class=\"symbol-mini\"/>");
        if(data.error) {
          resultROW = resultROW.replace("$balance", 0 + " BTG");
          resultROW = resultROW.replace("$link", "-");
      } else {
        resultROW = resultROW.replace("$balance", data + " BTG");
        resultROW = resultROW.replace("$link", "<a href=\"https://btgexp.com/address/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(resultROW));
    }); //END BTG

    $.get("https://blockdozer.com/insight-api/addr/"+addr+"/balance", function(data){
      console.log("BCC", addr, data);
      var resultROW = "<tr><td>$symbol</td><td>$balance</td><td>$link</td></tr>";

      //resultROW = resultROW.replace("$data", moment().format("YYYY-MM-DD HH:mm:ss"));
      resultROW = resultROW.replace("$symbol", "<img src=\"media/bcc.jpg\" class=\"symbol-mini\"/>");
      resultROW = resultROW.replace("$balance", data + " BCC");

      if(data == 0) {
        resultROW = resultROW.replace("$link", "-");
      } else {
        resultROW = resultROW.replace("$link", "<a href=\"https://blockdozer.com/address/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(resultROW));
    }); //END BCC

    $.get("http://52.187.7.191:3001/insight-api/addr/"+addr, function(data){
      console.log("BCD", addr, data);

      var resultROW = "<tr><td>$symbol</td><td>$balance</td><td>$link</td></tr>";

      //resultROW = resultROW.replace("$data", moment().format("YYYY-MM-DD HH:mm:ss"));
      resultROW = resultROW.replace("$symbol", "<img src=\"media/bcd.png\" class=\"symbol-mini\"/>");

      if(!data || !data.balance || data.balance == 0) {
        resultROW = resultROW.replace("$balance", 0 + " BCD");
        resultROW = resultROW.replace("$link", "-");
      } else {
        resultROW = resultROW.replace("$balance", data.balance + " BCD");
        resultROW = resultROW.replace("$link", "<a href=\"http://explorer.btcd.io/#/address?loading=true&address=" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(resultROW));
    }); //END BCD

    //BTX - BITCOINCORE
    $.get("https://insight.bitcore.cc/api/addr/"+addr+"/balance", function(data) {
      console.log("BTX", addr, data);

      var resultROW = "<tr><td>$symbol</td><td>$balance</td><td>$link</td></tr>";

      //resultROW = resultROW.replace("$data", moment().format("YYYY-MM-DD HH:mm:ss"));
      resultROW = resultROW.replace("$symbol", "<img src=\"media/btx.png\" class=\"symbol-mini\"/>");

      if(!data) {
        resultROW = resultROW.replace("$balance", 0 + " BTX");
        resultROW = resultROW.replace("$link", "-");
      } else {
        resultROW = resultROW.replace("$balance", data / 100000000 + " BTX");
        resultROW = resultROW.replace("$link", "<a href=\"https://insight.bitcore.cc/address/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(resultROW));
    });

    //BTCP - BITCOINPRIVATE
    $.get("https://explorer.btcprivate.org/api/addr/"+addr+"/balance", function(data) {
      console.log("BTCP", addr, data);

      var resultROW = "<tr><td>$symbol</td><td>$balance</td><td>$link</td></tr>";

      //resultROW = resultROW.replace("$data", moment().format("YYYY-MM-DD HH:mm:ss"));
      resultROW = resultROW.replace("$symbol", "<img src=\"media/btcp.png\" class=\"symbol-mini\"/>");

      if(!data) {
        resultROW = resultROW.replace("$balance", 0 + " BTCP");
        resultROW = resultROW.replace("$link", "-");
      } else {
        resultROW = resultROW.replace("$balance", data / 100000000 + " BTCP");
        resultROW = resultROW.replace("$link", "<a href=\"https://explorer.btcprivate.org/address/" + addr + "\" target=\"_blank\">" + search + "</a>");
      }
      $("#bitcoin-result tbody").append($(resultROW));
    });
  }
}

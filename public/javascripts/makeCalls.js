function getValues(){
    var exchangeValue = document.getElementById("trfAmt").value;
    if (isNaN(exchangeValue) ||  exchangeValue <= 0) 
    {
      alert('Please enter a valid number');
    }
    else
    {
       document.getElementById("TNAmount").innerHTML = "Loading..";
       document.getElementById("ORAmount").innerHTML = "Loading..";
       document.getElementById("LRAmount").innerHTML = "Loading..";
       document.getElementById("RlAmount").innerHTML = "Loading..";
       document.getElementById("R2iAmount").innerHTML = "Loading..";
       document.getElementById("LRGAmount").innerHTML = "Loading..";
       document.getElementById("TGAmount").innerHTML = "Loading..";
    
       document.getElementById("TNAmount1").innerHTML = "Loading..";
       document.getElementById("ORAmount1").innerHTML = "Loading..";
       document.getElementById("LRAmount1").innerHTML = "Loading..";
       document.getElementById("RlAmount1").innerHTML = "Loading..";
       document.getElementById("R2iAmount1").innerHTML = "Loading..";
       document.getElementById("TGAmount1").innerHTML = "Loading..";
    
       document.getElementById("Trate1").innerHTML = "Loading..";
       document.getElementById("ORrate1").innerHTML = "Loading..";
       document.getElementById("LRrate1").innerHTML = "Loading..";
       document.getElementById("Rlrate1").innerHTML = "Loading..";
       document.getElementById("R2irate1").innerHTML = "Loading..";
       document.getElementById("TGrate1").innerHTML = "Loading..";
    
    
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = 'https://api.remitly.io/v1/pricing/estimate?conduit=GBR%3AGBP-IND%3AINR&product_type=BASIC&send_amount='+exchangeValue+'%20GBP';
    fetch(proxyUrl+targetUrl, {
       method: "GET",
       headers: {
           "Content-Type": "application/json"
       },
    //    body: JSON.stringify({ data: "Hello world!" }),
       mode: "cors"
    }).then(function(response) {
       if (response.ok) {
           return response.json();
       } else {
           throw new Error("Could not reach the API: " + response.statusText);
           ga('send', 'exception', {
          'exDescription': response.statusText,
          'exFatal': false
     });
       }
    }).then(function(data) {
       document.getElementById("RlFees").innerHTML = "1.99 GBP"; 
    //*0.99801 times to remove fees
       document.getElementById("RlAmount").innerHTML = (parseFloat(data.receive_amount)*(1-(1.99/exchangeValue))).toFixed(2)+" INR"; 
    
      document.getElementById("Rlrate1").innerHTML = (parseFloat(data.receive_amount)/exchangeValue).toFixed(2);
      document.getElementById("RlFees1").innerHTML = document.getElementById("RlFees").innerHTML;
      document.getElementById("RlAmount1").innerHTML = document.getElementById("RlAmount").innerHTML;
    
    
    }).catch(function(error) {
            ga('send', 'exception', {
            'exDescription': error.message,
            'exFatal': false
     });
    });
    //var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //var targetUrl = 'https://transferwise.com/gateway/v2/quotes/';
    //fetch(proxyUrl+targetUrl, {
    //    method: "POST",
    //    headers: {
    //        "Content-Type": "application/json"
    //    },
    //    body: JSON.stringify({ "sourceAmount":1000,"sourceCurrency":"GBP","targetCurrency":"INR","preferredPayIn":"BANK_TRANSFER","guaranteedTargetAmount":false }),
    //    mode: "cors"
    //}).then(function(response) {
    //    if (response.ok) {
    //        return response.json();
    //    } else {
    //        throw new Error("Could not reach the API: " + response.statusText);
    //    }
    //}).then(function(data) {
    //    document.getElementById("TFees").innerHTML = data.paymentOptions[0].fee.total+" "+data.paymentOptions[0].sourceCurrency;
    //    document.getElementById("TNAmount").innerHTML = data.paymentOptions[0].targetAmount.toFixed(2)+" "+data.paymentOptions[0].targetCurrency;
    //}).catch(function(error) {
    //    document.getElementById("error").innerHTML = error.message;
    //});
    
    var targetUrl = 'https://transferwise.com/gateway/v2/quotes/';
    var methodType = "POST";
    var bodyString = { "sourceAmount":exchangeValue,"sourceCurrency":"GBP","targetCurrency":"INR","preferredPayIn":"BANK_TRANSFER","guaranteedTargetAmount":false };
    var displayData = fetchValues(targetUrl,methodType,bodyString);
    displayData.then(displayData=>{
    
    document.getElementById("TFees").innerHTML = displayData.paymentOptions[0].fee.total+" "+displayData.paymentOptions[0].sourceCurrency;
    document.getElementById("TNAmount").innerHTML = displayData.paymentOptions[0].targetAmount.toFixed(2)+" "+displayData.paymentOptions[0].targetCurrency;
    
    document.getElementById("Trate1").innerHTML = displayData.rate.toFixed(2);
    document.getElementById("TFees1").innerHTML = document.getElementById("TFees").innerHTML;
    document.getElementById("TNAmount1").innerHTML = document.getElementById("TNAmount").innerHTML;
    });
    
    
    var targetUrl = 'https://secure.orbitremit.com/api/v2/rate.json?send_currency=GBP&payout_currency=INR';
    var methodType = "POST";
    var bodyString = {};
    var displayData = fetchValues(targetUrl,methodType,bodyString);
    displayData.then(displayData=>{
    
    document.getElementById("ORFees").innerHTML = "2.00 GBP";
    document.getElementById("ORAmount").innerHTML = ((displayData.data.exchange_rate)*(exchangeValue-2)).toFixed(2)+" INR";
    document.getElementById("ORrate1").innerHTML = ((displayData.data.exchange_rate)*1).toFixed(2);
    document.getElementById("ORFees1").innerHTML = document.getElementById("ORFees").innerHTML;
    document.getElementById("ORAmount1").innerHTML = document.getElementById("ORAmount").innerHTML;
    
    });
    
    /*
    var targetUrl = 'https://www.instarem.com/api/v1/public/transaction/computed-value?source_currency=GBP&destination_currency=INR&instarem_bank_account_id=75&source_amount=1000';
    var methodType = "GET";
    var displayData = fetchGetValues(targetUrl,methodType);
    displayData.then(displayData=>{
    
    document.getElementById("IRFees").innerHTML = (displayData.data.transaction_fee_amount).toFixed(2)+" GBP";
    document.getElementById("IRAmount").innerHTML = (displayData.data.destination_amount)+" INR";
    
    document.getElementById("IRFees1").innerHTML = document.getElementById("IRFees").innerHTML;
    document.getElementById("IRAmount1").innerHTML = document.getElementById("IRAmount").innerHTML;
    
    
    });
    */
    
    var targetUrl = 'https://www.lycaremit.co.uk/cost-estimation?indx_SM=Y&tocountry=IND&country=India&typedesc=Bank%20Transfer&type=Banks&amt='+(exchangeValue-3)+'&amtype=Remitter%20to%20Send';
    var methodType = "GET";
    var displayData = fetchGetValues(targetUrl,methodType);
    displayData.then(displayData=>{
    
    document.getElementById("LRFees").innerHTML = ExtractElementByIdFromString(displayData,"ContentPlaceHolder1_lblTransferFee");
    document.getElementById("LRAmount").innerHTML = ExtractElementByIdFromString(displayData,"ContentPlaceHolder1_lblReceiveAmount");
    
    document.getElementById("LRrate1").innerHTML = (ExtractElementByIdFromString(displayData,"ContentPlaceHolder1_lblExchangeRate")).substring(0,5);
    document.getElementById("LRFees1").innerHTML = document.getElementById("LRFees").innerHTML
    document.getElementById("LRAmount1").innerHTML = document.getElementById("LRAmount").innerHTML;
    });
    
    var targetUrl = 'https://www.remit2india.com/sendmoneytoindia/UnitedKingdom/index.jsp';
    var methodType = "GET";
    var displayData = fetchGetValues(targetUrl,methodType);
    displayData.then(displayData=>{
    
    document.getElementById("R2iFees").innerHTML = "2.00 GBP";
    document.getElementById("R2iAmount").innerHTML = (ExtractElementByIdFromString(displayData,"dispSlabWiseIndRate")*exchangeValue).toFixed(2)+" INR";
    document.getElementById("R2irate1").innerHTML = (ExtractElementByIdFromString(displayData,"dispSlabWiseIndRate")*1).toFixed(2);
    document.getElementById("R2iFees1").innerHTML = document.getElementById("R2iFees").innerHTML;
    document.getElementById("R2iAmount1").innerHTML = document.getElementById("R2iAmount").innerHTML;
    });
    
    var targetUrl = 'https://www.google.com/search?q=gbp+to+inr';
    var methodType = "GET";
    var displayData = fetchGetValues(targetUrl,methodType);
    displayData.then(displayData=>{
    
    //document.getElementById("LRGFees").innerHTML = "0.00 GBP";
    //document.getElementById("LRGAmount").innerHTML = 
    //(ExtractElementByIdFromString(displayData,"knowledge-currency__tgt-amount")*exchangeValue).toFixed(2)+" INR";
   //  document.getElementById("LRGAmount").innerHTML = 
   //  (ExtractElementByIdFromString(displayData,"knowledge-currency__tgt-amount")*1).toFixed(2);
   var temp;
   temp = document.createElement('div'); // Create a temporary element
   temp.innerHTML = ExtractElementByIdFromString(displayData,"knowledge-currency__updatable-data-column");
   document.getElementById("LRGAmount").innerHTML = temp.querySelector("span[data-value]").innerHTML;

    
    //document.getElementById("LRGAmount").innerHTML = $(("<span>"+displayData+"</span>").find("#knowledge-currency__tgt-amount").attr("data-value")*1000).toFixed(2)+" INR";
    
    //document.getElementById("LRGFees1").innerHTML = document.getElementById("LRGFees").innerHTML;
    //document.getElementById("LRGAmount1").innerHTML = document.getElementById("LRGAmount").innerHTML;
    
    });
    
    
    var targetUrl = 'https://my.transfergo.com/api/transfers/quote?&calculationBase=sendAmount&amount='+exchangeValue+'&business=false&fromCountryCode=GB&toCountryCode=IN&fromCurrencyCode=GBP&toCurrencyCode=INR';
    var methodType = "GET";
    var displayData = fetchValues(targetUrl,methodType);
    displayData.then(displayData=>{
    
    document.getElementById("TGFees").innerHTML = ((displayData.deliveryOptions.standard.paymentOptions.bank.quote.fees.finalFee)*1).toFixed(2) + " GBP";
    document.getElementById("TGAmount").innerHTML = 
    ((displayData.deliveryOptions.standard.paymentOptions.bank.quote.rate)*exchangeValue).toFixed(2)+" INR";
    
    document.getElementById("TGrate1").innerHTML = 
    displayData.deliveryOptions.standard.paymentOptions.bank.quote.rate.toFixed(2);
    document.getElementById("TGFees1").innerHTML = document.getElementById("TGFees").innerHTML;
    document.getElementById("TGAmount1").innerHTML = document.getElementById("TGAmount").innerHTML;
    
    });
    
    /*
    var url = 'https://www.instarem.com/api/v1/public/transaction/computed-value?source_currency=GBP&destination_currency=INR&instarem_bank_account_id=75&source_amount=exchangeValue';
    var data = {};  
    var callback = function(data){ alert(data.attribute_name)};
    
    var val=J50Npi.getJSON(url, data, callback)
    .then(function(response){
    //    console.log(response);
    });*/
    
    var J50Npi = {  
       currentScript: null,  
       getJSON: function(url, data, callback) {
         var src = url + (url.indexOf("?")+1 ? "&" : "?");
         var head = document.getElementsByTagName("head")[0];
         var newScript = document.createElement("script");
         var params = [];
         var param_name = ""
    
         this.success = callback;
    
         data["callback"] = "J50Npi.success";
         for(param_name in data){  
             params.push(param_name + "=" + encodeURIComponent(data[param_name]));  
         }
         src += params.join("&")
    
         newScript.type = "text/javascript";  
         newScript.src = src;
    
         if(this.currentScript) head.removeChild(currentScript);
         head.appendChild(newScript); 
       },
       success: null
    }; 
    
    
    
    function fetchValues(targetUrl,methodType,bodyString){
    
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    
    let firstFetch = fetch(proxyUrl+targetUrl, {
       method: methodType,
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(bodyString),
       mode: "cors"
    }).then(function(response) {
       if (response.ok) {
           return response.json();
       } else {
           throw new Error("Could not reach the API: " + response.statusText);
    
           ga('send', 'exception', {
           'exDescription': response.statusText,
           'exFatal': false
           });
       }
    });
    
    return firstFetch.then(function(response) {
    //console.log(response);
    return (response);});
    }
    
    function fetchGetValues(targetUrl,methodType){
    
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //var proxyUrl = '';
    //var proxyUrl = 'https://cors-escape.herokuapp.com/';
    
    let firstFetch = fetch(proxyUrl+targetUrl, {
       method: methodType,
       headers: {
           "Content-Type": "application/json",
    "X-PINGOTHER": "pingpong",
    "X-Requested-With": "fetch",
    "Origin":"blogspot.com",
           crossDomain: true
       },
       mode: "cors"
    }).then(function(response) {
       if (response.ok) {
    //console.log(response);
           return response.text();
       } else {
    console.log(response);
           throw new Error("Could not reach the API: " + response.statusText);
           ga('send', 'exception', {
           'exDescription': response.statusText,
           'exFatal': false
           });
       }
    });
    
    return firstFetch.then(function(response) {
    //console.log(response);
    return (response);});
    }
    
    
    function ExtractElementByIdFromString(HTMLString, IdString) {
       var result,
           temp = document.createElement('div'); // Create a temporary element
       temp.innerHTML = HTMLString; // Set the passed string as HTML to the temporary element
       result = temp.querySelector('#' + IdString).innerHTML; // Find an element with the passed id
       return result;
    }
    }
    }
    function switchPanel(){
    
     var mydiv = document.getElementById('owl-demo');
     var mydiv2 = document.getElementById('classic');
    //console.log('style:'+mydiv.style.display);
     if (mydiv.style.display === 'block' || mydiv.style.display === '')
    {
       mydiv.style.display = 'none';
       mydiv2.style.display = 'flex';
       document.getElementById('switch-button').innerHTML = "Switch to Carousel View";
    }
     else
    {
       mydiv.style.display = 'block';
       mydiv2.style.display = 'none';  
       document.getElementById('switch-button').innerHTML = "Switch to Classic View";
    }
    
    
    //$("#top-input").hide();
    //$("main-agileinfo").toggle('slow',function(){console.log('test');});
    }
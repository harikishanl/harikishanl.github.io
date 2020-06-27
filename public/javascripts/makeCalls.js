function getValues(){
   var mydiv = document.getElementById('owl-demo');
   mydiv.style.display = 'block';
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
   document.getElementById("RlFees").innerHTML = "Fees: 1.99 GBP"; 
//*0.99801 times to remove fees
//    document.getElementById("RlAmount").innerHTML = "You Receive: "+(parseFloat(data.receive_amount)*(1-(1.99/exchangeValue))).toFixed(2)+" //INR"; 
   document.getElementById("RlAmount").innerHTML = "You Receive: "+ data.receive_amount_before_adjustment;
//    document.getElementById("Rlrate").innerHTML = "Rate: "+(parseFloat(data.receive_amount)/exchangeValue).toFixed(2);
  document.getElementById("Rlrate").innerHTML = "Rate: "+(parseFloat(data.receive_amount_before_adjustment)/exchangeValue).toFixed(2);

//   document.getElementById("Rlrate1").innerHTML = (parseFloat(data.receive_amount)/exchangeValue).toFixed(2);
  document.getElementById("Rlrate1").innerHTML = (parseFloat(data.receive_amount_before_adjustment)/exchangeValue).toFixed(2);
  document.getElementById("RlFees1").innerHTML = "1.99 GBP";
//   document.getElementById("RlAmount1").innerHTML = (parseFloat(data.receive_amount)*(1-(1.99/exchangeValue))).toFixed(2)+" INR"; 
   document.getElementById("RlAmount1").innerHTML = data.receive_amount_before_adjustment;


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

document.getElementById("TFees").innerHTML = "Fees: "+displayData.paymentOptions[0].fee.total+" "+displayData.paymentOptions[0].sourceCurrency;
document.getElementById("TNAmount").innerHTML = "You Receive: "+displayData.paymentOptions[0].targetAmount.toFixed(2)+" "+displayData.paymentOptions[0].targetCurrency;
document.getElementById("Trate").innerHTML = "Rate: "+displayData.rate.toFixed(2);

document.getElementById("Trate1").innerHTML = displayData.rate.toFixed(2);
document.getElementById("TFees1").innerHTML = displayData.paymentOptions[0].fee.total+" "+displayData.paymentOptions[0].sourceCurrency;
document.getElementById("TNAmount1").innerHTML = displayData.paymentOptions[0].targetAmount.toFixed(2)+" "+displayData.paymentOptions[0].targetCurrency;
});


var targetUrl = 'https://secure.orbitremit.com/api/v2/rate.json?send_currency=GBP&payout_currency=INR';
var methodType = "POST";
var bodyString = {};
var displayData = fetchValues(targetUrl,methodType,bodyString);
displayData.then(displayData=>{

document.getElementById("ORFees").innerHTML = "Fees: 2.00 GBP";
document.getElementById("ORAmount").innerHTML = "You Receive: "+((displayData.data.exchange_rate)*(exchangeValue-2)).toFixed(2)+" INR";
document.getElementById("ORrate").innerHTML = "Rate: "+((displayData.data.exchange_rate)*1).toFixed(2);

document.getElementById("ORrate1").innerHTML = ((displayData.data.exchange_rate)*1).toFixed(2);
document.getElementById("ORFees1").innerHTML = "2.00 GBP";
document.getElementById("ORAmount1").innerHTML = ((displayData.data.exchange_rate)*(exchangeValue-2)).toFixed(2)+" INR";

});

/*
var targetUrl = 'https://www.instarem.com/api/v1/public/transaction/computed-value?source_currency=GBP&destination_currency=INR&instarem_bank_account_id=75&source_amount=1000';
var methodType = "GET";
var displayData = fetchGetValues(targetUrl,methodType);
displayData.then(displayData=>{

document.getElementById("IRFees").innerHTML = "Fees: "+(displayData.data.transaction_fee_amount).toFixed(2)+" GBP";
document.getElementById("IRAmount").innerHTML = (displayData.data.destination_amount)+" INR";

document.getElementById("IRFees1").innerHTML = document.getElementById("IRFees").innerHTML;
document.getElementById("IRAmount1").innerHTML = document.getElementById("IRAmount").innerHTML;


});
*/

var targetUrl = 'https://www.lycaremit.co.uk/cost-estimation?indx_SM=Y&tocountry=IND&country=India&typedesc=Bank%20Transfer&type=Banks&amt='+(exchangeValue-3)+'&amtype=Remitter%20to%20Send';
var methodType = "GET";
var displayData = fetchGetValues(targetUrl,methodType);
displayData.then(displayData=>{

document.getElementById("LRFees").innerHTML = "Fees: "+ExtractElementByIdFromString(displayData,"ContentPlaceHolder1_lblTransferFee");
document.getElementById("LRAmount").innerHTML = "You Receive: "+ExtractElementByIdFromString(displayData,"ContentPlaceHolder1_lblReceiveAmount");
document.getElementById("LRrate").innerHTML = "Rate: "+(ExtractElementByIdFromString(displayData,"ContentPlaceHolder1_lblExchangeRate")).substring(0,5);

document.getElementById("LRrate1").innerHTML = (ExtractElementByIdFromString(displayData,"ContentPlaceHolder1_lblExchangeRate")).substring(0,5);
document.getElementById("LRFees1").innerHTML = ExtractElementByIdFromString(displayData,"ContentPlaceHolder1_lblTransferFee");
document.getElementById("LRAmount1").innerHTML = ExtractElementByIdFromString(displayData,"ContentPlaceHolder1_lblReceiveAmount");
});

var targetUrl = 'https://www.remit2india.com/sendmoneytoindia/UnitedKingdom/index.jsp';
var methodType = "GET";
var displayData = fetchGetValues(targetUrl,methodType);
displayData.then(displayData=>{

document.getElementById("R2iFees").innerHTML = "Fees: 0.00 GBP";
document.getElementById("R2iAmount").innerHTML = "You Receive: "+(ExtractElementByIdFromString(displayData,"dispSlabWiseIndRate")*exchangeValue).toFixed(2)+" INR";
document.getElementById("R2irate").innerHTML = "Rate: "+(ExtractElementByIdFromString(displayData,"dispSlabWiseIndRate")*1).toFixed(2);

document.getElementById("R2irate1").innerHTML = (ExtractElementByIdFromString(displayData,"dispSlabWiseIndRate")*1).toFixed(2);
document.getElementById("R2iFees1").innerHTML = "0.00 GBP";
document.getElementById("R2iAmount1").innerHTML = (ExtractElementByIdFromString(displayData,"dispSlabWiseIndRate")*exchangeValue).toFixed(2)+" INR";
document.getElementById("R2irate").innerHTML = "Rate: "+(ExtractElementByIdFromString(displayData,"dispSlabWiseIndRate")*1).toFixed(2);

});

var targetUrl = 'https://www.google.com/search?q=gbp+to+inr';
var methodType = "GET";
var displayData = fetchGetValues(targetUrl,methodType);
displayData.then(displayData=>{

//document.getElementById("LRGFees").innerHTML = "0.00 GBP";
//document.getElementById("LRGAmount").innerHTML = 
//(ExtractElementByIdFromString(displayData,"knowledge-currency__tgt-amount.data-exchange-rate")*exchangeValue).toFixed(2)+" INR";
//document.getElementById("LRGAmount").innerHTML = 
//(ExtractElementByIdFromString(displayData,"knowledge-currency__updatable-data-column")*1).toFixed(2);

var temp;
temp = document.createElement('div'); // Create a temporary element
temp.innerHTML = ExtractElementByIdFromString(displayData,"knowledge-currency__updatable-data-column");
document.getElementById("LRGAmount").innerHTML = temp.querySelector("span[data-value]").innerHTML;

//valueInt = document.getElementById("LRGAmount").querySelector("span[data-value]");
//var temp = (document.getElementById("LRGAmount").getElementsByTagName("div"));

//    console.log(temp[0].innerHTML+" val:"+valueInt.innerHTML);

//document.getElementById("LRGAmount").innerHTML = $(("<span>"+displayData+"</span>").find("#knowledge-currency__tgt-amount").attr("data-value")*1000).toFixed(2)+" INR";

//document.getElementById("LRGFees1").innerHTML = document.getElementById("LRGFees").innerHTML;
//document.getElementById("LRGAmount1").innerHTML = document.getElementById("LRGAmount").innerHTML;

});


var targetUrl = 'https://my.transfergo.com/api/transfers/quote?&calculationBase=sendAmount&amount='+exchangeValue+'&business=false&fromCountryCode=GB&toCountryCode=IN&fromCurrencyCode=GBP&toCurrencyCode=INR';
var methodType = "GET";
var displayData = fetchValues(targetUrl,methodType);
displayData.then(displayData=>{

document.getElementById("TGFees").innerHTML = "Fees: "+((displayData.deliveryOptions.standard.paymentOptions.bank.quote.fees.finalFee)*1).toFixed(2) + " GBP";
document.getElementById("TGAmount").innerHTML = "You Receive: "+
((displayData.deliveryOptions.standard.paymentOptions.bank.quote.rate)*exchangeValue).toFixed(2)+" INR";
document.getElementById("TGrate").innerHTML = "Rate: "+
displayData.deliveryOptions.standard.paymentOptions.bank.quote.rate.toFixed(2);

document.getElementById("TGrate1").innerHTML = 
displayData.deliveryOptions.standard.paymentOptions.bank.quote.rate.toFixed(2);
document.getElementById("TGFees1").innerHTML = ((displayData.deliveryOptions.standard.paymentOptions.bank.quote.fees.finalFee)*1).toFixed(2) + " GBP";
document.getElementById("TGAmount1").innerHTML = ((displayData.deliveryOptions.standard.paymentOptions.bank.quote.rate)*exchangeValue).toFixed(2)+" INR";

});

var targetUrl = 'https://transfers.skrill.com/api/transfers/v2/preview';
var methodType = "POST";
var bodyString = {"direction":"S","senderCurrency":"GBP","senderCountry":"GBR","recipientCurrency":"INR","recipientCountry":"IND","deliveryMethodType":"BANK","paymentOptionType":"DEBIT_CARD","bonusIncluded":false,"senderAmount":"1000"};

var displayData = fetchSKValues(targetUrl,methodType,bodyString);
displayData.then(displayData=>{

document.getElementById("SKFees").innerHTML = "Fees: "+((displayData.feeAmount)*1).toFixed(2) + " GBP";
document.getElementById("SKAmount").innerHTML = "You Receive: "+
((displayData.recipientAmount)).toFixed(2)+" INR";
document.getElementById("SKrate").innerHTML = "Rate: "+
displayData.fxRate.toFixed(2);

document.getElementById("SKrate1").innerHTML = 
displayData.fxRate.toFixed(2);
document.getElementById("SKFees1").innerHTML = ((displayData.feeAmount)*1).toFixed(2) + " GBP";
document.getElementById("SKAmount1").innerHTML = (displayData.recipientAmount).toFixed(2)+" INR";

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

function fetchSKValues(targetUrl,methodType,bodyString){

var proxyUrl = 'https://cors-anywhere.herokuapp.com/';


let firstFetch2 = fetch(proxyUrl+targetUrl, {
   method: methodType,
   headers: {
   "accept": "application/json, text/plain, */*",
   "accept-language": "en-US,en;q=0.9,te-IN;q=0.8,te;q=0.7",
   "adrum": "isAjax:true",
   "content-type": "application/json",
   "sec-fetch-dest": "empty",
   "sec-fetch-mode": "cors",
   "sec-fetch-site": "same-origin",
   "x-tmx-session-id": "d9f41c54-a10f-4427-b4b2-f09cdb69c313",
   "x-tmx-status": "0",
   "x-xsrf-token": "5829b9d7-a273-4dbf-bde4-2fbe06730b00"
 },
 "referrer": "https://transfers.skrill.com/smt/calculator/marketing?convergent=true",
 "referrerPolicy": "no-referrer-when-downgrade",
 "method": "POST",
 "mode": "cors",
//  "credentials": "include",
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

return firstFetch2.then(function(response) {
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
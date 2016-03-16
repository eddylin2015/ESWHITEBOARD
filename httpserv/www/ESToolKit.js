var xmlHttp
/*
function OnClickEvent(Parameter)
{
xmlHttp=GetXmlHttpObject()
if (xmlHttp==null)
 {
 alert ("Browser does not support HTTP Request")
 return
 }
var url="Proc.php"
url=url+"?q="+Parameter
url=url+"&sid="+Math.random()
xmlHttp.onreadystatechange=stateChanged 
xmlHttp.open("GET",url,true)
xmlHttp.send(null)	
}
function stateChangedResponseText() 
{ 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
 { 
 document.getElementById("txtHint").innerHTML=xmlHttp.responseText
 //responseText 
 } 
}
function stateChangedXML() 
{ 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
 {
	// get the country select element via its known id
	var cSelect = document.getElementById(itemObj);
	// remove the current options from the country select
	var len=cSelect.options.length;
	while (cSelect.options.length > 0) {
		cSelect.remove(0);
	}
	var newOption;
	// create new options
	
	var docXML = xmlHttp.responseXML ;
    var results = docXML.getElementsByTagName("selitem") ;
    for (var i= 0 ;i < results.length ; i++){
        var optvalue = "" ;
        optvalue = docXML.getElementsByTagName("optvalue")[i].firstChild.nodeValue ;
		newOption = document.createElement("option");
		newOption.value = optvalue;  // assumes option string and value are the same
		newOption.text=optvalue;
		// add the new option
		try {
			cSelect.add(newOption);  // this will fail in DOM browsers but is needed for IE
		}
		catch (e) {
			cSelect.appendChild(newOption);
		}
    }
 } 
}
*/

function GetXmlHttpObject()
{
var xmlHttp=null;
try
 {
 // Firefox, Opera 8.0+, Safari
 xmlHttp=new XMLHttpRequest();
 }
catch (e)
 {
 //Internet Explorer
 try
  {
  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
  }
 catch (e)
  {
  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 }
return xmlHttp;
}
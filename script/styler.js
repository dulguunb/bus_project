
function popUpStyler(){
for(var i = 0 ; i<document.getElementsByClassName("popUpIsClicked").length;i++){
        document.getElementsByClassName("popUpIsClicked")[i].addEventListener("mouseover",function(){
            document.getElementsByClassName("popUpIsClicked")[i].parentNode.style.backgroundColor = "yellow";
        console.log( document.getElementsByClassName("popUpIsClicked")[i].parentNode);
        });
    }
}
var scrollDiv  =  document.getElementById("infoBoxScroll");
scrollDiv.scrollTop = scrollDiv.scrollHeight;


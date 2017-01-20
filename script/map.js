/*MAP JAVASCRIPT*/
var local_longitude = 106.91878;
var local_latitude = 47.91901;
var map;
var busRouteIds=[];
var positionsId = [];

document.getElementById("findMe").addEventListener("click", findLocation, true);

window.onload = withoutPosition();

function findLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        withoutPosition();
    }
}

function showPosition(position) {
    window.location.href = "index.php?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude;
    /*
    local_longitude = position.coords.longitude;
    local_latitude = position.coords.latitude;
    */
    map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
    var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
    document.cookie = "local_latitude=" + position.coords.latitude;
    document.cookie = "local_longitude=" + position.coords.longitude;
}



var iconForPin = L.icon({
    iconUrl: "assets/img/622.png",
    iconRetinaUrl: "assets/img/622.png",
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14]
});


function withoutPosition() {
    if (getCookie("local_longitude") && getCookie("local_latitude")) {
        local_latitude = getCookie("local_latitude");
        local_longitude = getCookie("local_longitude");
    }

    map = L.map('map', {
        center: [20.0, 5.0],
        minZoom: 2,
        zoom: 16
    }).setView([local_latitude, local_longitude]);

    var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var local_position_circle = L.circle([local_latitude, local_longitude], 10, {
        color: '#f03',
        fillColor: 'red',
        fillOpacity: 0.5
    }).addTo(map);
    /*
    var kmlLayer = new L.KML("assets/busroutes_with_graphics.kml",{async:true});
    kmlLayer.on("loaded",function(e){
            map.fitBounds(e.target.getBounds());
    });
    map.addLayer(kmlLayer);
    */

    
   var markerClusters =  L.markerClusterGroup();

    //Start
for (var i = 0; i<bus_stop_data.length; i++) {

var container = document.createElement("div");
        container.className = "card card-block";
             document.getElementById("busStopCollapse").appendChild(container);  
             var busStopNamesLowerCased = bus_stop_data[i].bus_stop_name.toLowerCase();
            var popUpIsClickedLink = "<a href='#' data-longitude= " + bus_stop_data[i].bus_gps_longitude + ' data-latitude= '+bus_stop_data[i].bus_gps_latitude + " data-bus_stop_name = '" + bus_stop_data[i].bus_stop_name + "' data-bus_stop= " + bus_stop_data[i].busstop_id + " class='popUpIsClicked'>" + bus_stop_data[i].bus_stop_name + "</a>";
            /*
             *
             *Adding <a elements to container in order to get "Event"
             *
             */
            container.innerHTML = popUpIsClickedLink;        
            var marker = L.marker([bus_stop_data[i].bus_gps_latitude, bus_stop_data[i].bus_gps_longitude]).bindPopup(container);
 markerClusters.addLayer( marker );

}
map.addLayer(markerClusters);
popUpClickEvent();


for( var i  = 0 ;i<bus_stop_data.length;i++){
   var options =  document.createElement("option");
   options.appendChild(document.createTextNode(bus_stop_data[i].bus_stop_name));
   options.setAttribute("class","popUpIsClicked");
   options.setAttribute("value",bus_stop_data[i].bus_stop_name);
   options.setAttribute("data-bus_stop",bus_stop_data[i].busstop_id);
   document.getElementById("busStopNamesSearch").appendChild(options);
}
}

function popUpClickEvent(){
  var positionsName = [];
  for (var i = 0; i < document.getElementsByClassName("popUpIsClicked").length; i++) {
  document.getElementsByClassName("popUpIsClicked")[i].addEventListener("click", function() {
  positionsId.push(this.dataset.bus_stop);                   
  positionsName.push(this.dataset.bus_stop_name);                  
        if(positionsName[1]    ==   undefined){
                document.getElementsByName("destination")[0].value = "";
               }
   document.getElementsByName("origin")[0].value = positionsName[0];
        if(positionsName[1] !=  undefined){
                document.getElementsByName("destination")[0].value = positionsName[1];
            }
        if (positionsId.length == 2 ) {
                
                   sendAjax(positionsId);        
        }
        else if ( positionsId.length > 2 ){
        positionsId.shift()

                }
        }, false);
    }
}


function sendAjax(positionsId){
 var busstopXmlHttp = new XMLHttpRequest();
 var url = "bus_route_and_stop_json.php";
 var params = "busStopOrigin=" + positionsId[0] + "&busStopDestination=" + positionsId[1];
  busstopXmlHttp.open("POST", url, true);
  busstopXmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  busstopXmlHttp.onreadystatechange = function() { //Call a function when the state changes.
        if (busstopXmlHttp.readyState == 4 && busstopXmlHttp.status == 200) {      
            var busToFromStop = [];
            busToFromStop = JSON.parse(busstopXmlHttp.responseText);                 
            jsonOriginToDestination(busToFromStop,positionsId);                                        
                        }
                    }
  busstopXmlHttp.send(params);

}
function jsonOriginToDestination(jsonData,positionsId){    
    
    var list =  document.createElement("UL");
    list.className = "list-group";
    document.getElementById("infoBoxModal").appendChild(list);
    var well = document.createElement("DIV");
    var alertBoxFlag = 0;
    well.className = "alert alert-success";
    well.id = "infoBoxScroll";
    list.appendChild(well);

    for(var i = 0;i<jsonData.originToDestination.length;i++){
        alertBoxFlag ++ ;
        var fromNmusText = document.createTextNode(" "+jsonData.originToDestination[i].from_nmus+" ");
        var toNmusText = document.createTextNode (" "+jsonData.originToDestination[i].to_nmus+" ");
        var busrouteNo = document.createTextNode(" "+jsonData.originToDestination[i].busroute_no+" ");
        var listElement = document.createElement("li");
        listElement.className = "listClicked list-group-item list-group-item-info";
        listElement.dataset.busroute_id = jsonData.originToDestination[i].busroute_id;
        busRouteIds.push(jsonData.originToDestination[i].busroute_id);
        listElement.appendChild(fromNmusText);
        listElement.appendChild(toNmusText);
        listElement.appendChild(busrouteNo);
        listElement.dataset.target = "#"+jsonData.originToDestination[i].busroute_id;
        listElement.dataset.toggle = "modal";
        list.appendChild(listElement);
    }
if(alertBoxFlag){
var header = document.createElement("H1");
    well.appendChild(header.appendChild(document.createTextNode(document.getElementsByName("origin")[0].value + " буудал-аас " + document.getElementsByName("destination")[0].value + " хүртэл эдгээр чиглэлийн автобус явна " + "  (автобусны нэр дээр дарж автобусны мэдээлэлийг харна уу)")));

var jsonDataForAjax = JSON.stringify(busRouteIds);
$.ajax({
    type: "POST",
    url: "bus_route_traverse.php",
    data: {data : jsonDataForAjax},
    cache: false,

    success: function(jsonData){
        busStopTraverse(jsonData,positionsId);
    }
});
well.scrollTop = well.scrollHeight;
}else{
    well.appendChild(document.createTextNode(document.getElementsByName("origin")[0].value + " буудал-аас " + document.getElementsByName("destination")[0].value + " хүртэл чиглэлийн автобус явахгүй" + "  (Дамжиж явах мэдээлэлийг эндээс харна уу)"));
well.className = "alert alert-warning";
well.scrollTop = well.scrollHeight;

    }
}

function busStopTraverse(busstopInfo,positionsId){
   
  for(var j = 0 ; j < busstopInfo.busstop_info.length;j++){
       var elementParagraph = document.createElement("P"); 
       var textNode =  document.createTextNode(busstopInfo.busstop_info[j].busstop_nmmn);
        
        elementParagraph.appendChild(textNode);
        var divElement = document.createElement("DIV");
        divElement.appendChild(elementParagraph);
        divElement.className = "busstopWrapper";
    if(positionsId[0] == busstopInfo.busstop_info[j].busstop_id || positionsId[1] == busstopInfo.busstop_info[j].busstop_id){ 
        var star = document.createElement("SPAN");
        star.className = "glyphicon glyphicon-star";
        elementParagraph.className = "alert alert-info originDestinationChosen";        
        elementParagraph.appendChild(star);
    }

        if(document.getElementById(busstopInfo.busstop_info[j].busroute_id)){
            var modalNode = document.getElementById(busstopInfo.busstop_info[j].busroute_id).children;
        
          modalBody = modalNode[0].children[0].children[0].children[0].children[0].children[0];
    
          modalBody.appendChild( divElement );

       }
    else{
        var busModal  =  document.createElement("DIV");
        
        elementParagraph.appendChild(textNode);
        busModal.className = "modal fade";
        
        busModal.id = busstopInfo.busstop_info[j].busroute_id;
        busModal.tabIndex = "-1";
        
        busModal.role = "dialog";
        document.getElementById("busStop").appendChild(busModal);
        
        var modalDialog =  document.createElement("DIV");
        modalDialog.className = "modal-dialog modal-lg";
        
        busModal.appendChild(modalDialog);
        var modalContent = document.createElement("DIV");
        
        modalContent.className = "modal-content";
        modalDialog.appendChild(modalContent);
        
        var modalHeader = document.createElement("DIV");
        modalHeader.className = "modal-header";
        
        modalContent.appendChild(modalHeader);
        var wrapper = document.createElement("DIV");
    

        var modalTitle = document.createElement("h3");
        modalTitle.className = "modal-title";
        
        var titleNode = document.createTextNode("Тухайн автобусны чигэлэлийн дамжиж өнгөрөх буудалууд  (Цэнхэр хүрээтэй нь сонгосон буудалдууд болно)");
        modalTitle.appendChild(titleNode);
        modalHeader.appendChild(wrapper);
        wrapper.appendChild(modalTitle);
        
        var modalBody = document.createElement("DIV");
        modalBody.className="modal-body";
        
        modalTitle.appendChild(modalBody);
        modalBody.appendChild(divElement);


    }
   var closeBtn= document.createElement("BUTTON");
   closeBtn.className = "btn btn-default";
   closeBtn.dataset.dismiss = "modal";
   closeBtn.appendChild(document.createTextNode("ХААХ")); 
   modalBody.appendChild(closeBtn);

  
        }
       
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


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
  var inputs = new inputStack();
  for (var i = 0; i < document.getElementsByClassName("popUpIsClicked").length; i++) {
  document.getElementsByClassName("popUpIsClicked")[i].addEventListener("click", function() {
  positionsId.push(this.dataset.bus_stop);                   
  positionsName.push(this.dataset.bus_stop_name);  
  inputs.push_back(this.dataset.bus_stop);
  console.log(inputs.inputter);
        if(positionsName[1]    ==   undefined){
                document.getElementsByName("destination")[0].value = "";
               }
   document.getElementsByName("origin")[0].value = positionsName[0];
        if(positionsName[1] !=  undefined){
                document.getElementsByName("destination")[0].value = positionsName[1];
            }
        if (inputs.inputter.length == 2 ) {
                
                  var busInfo = inputs.createBusStop();
                  var busrouteInfo = busInfo.findRoute();
                  console.log(positionsId);

                  for(var j=0;j<busrouteInfo.length;j++)
                  {
                   // console.log(busrouteInfo[j]);
                    document.getElementById("result").innerHTML += "<p>" + busrouteInfo[j].busroute_no + " " + busrouteInfo[j].from_nmus + " " + busrouteInfo[j].to_nmus + " </p> " ;
                  }
        }
        else if ( positionsId.length > 2 ){
        positionsId.shift()
                }
        }, false);
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


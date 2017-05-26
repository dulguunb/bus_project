function domSearch(){
    var positionsId  = [];
var collapseElement = document.getElementById("busStopCollapse");
var busStopName = document.getElementById("busStopSearch").value;
for(var i = 0 ; i<collapseElement.children.length;i++){
            if(busStopName.localeCompare(collapseElement.children[i].children[0].dataset.bus_stop_name) === 0){
map.setView([collapseElement.children[i].children[0].dataset.latitude,collapseElement.children[i].children[0].dataset.longitude]);
map.setZoom(19);                
                }
            }
    }


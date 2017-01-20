#THIS IS DOCUMENTATION FOR BUS_PROJECT
    [x]OVERVIEW
    
    [x]MODULES


##############  OVERVIEW  ###############


##############  MODULES #################
JAVASCRIPT:

map.js javascript file is used for user interactions 
findLocation() function is loaded when user click on find Me button. it operates as following: navigator.geolocation method asks user wether he/she wants to share the location. if he/she answers "YES", it sends current position into showPosition function. If she answers "No" it jumps to withoutPosition() function.
showPosition() function operates as following:
it sends latitude and logitude of the user to the link. and using GET method we can get position on php.(*) see php modules(*) 

and it stores the coords.longitude and laitude into cookie that way we can remember the location when page is refreshed

WithoutPositon() function operates following:
    first it checks local_longitude and local_latitude from cookie file. and if it exists, it sets local_latitude and local_longitude as existing cookie file. And it draws the markers , in "bus_stop.js" file i assigned all bus information into bus_stop_data variable /*it formated as json file*/. so we can easily access the bus_stop_data variable from "map.js" file. And it draws the markers and assigns those markers into markerclusters. 

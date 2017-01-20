<!DOCTYPE html>
<html>
<title>BUS PROJECT</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<!-- LEAFLET API ENDS HERE -->

<!--markerCluster style-->

    <link rel="stylesheet" href="assets/style/leaflet.css" />
    <link rel="stylesheet" href="assets/style/MarkerCluster.css" />
    <link rel="stylesheet" href="assets/style/MarkerCluster.Default.css" />
    <link rel="stylesheet" href="bootstrap-4/dist/css/bootstrap.css"/>
    <script src='assets/script/jquery.min.js'></script>
    <script src='http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js?2'></script>
    <script src='assets/script/leaflet.markercluster.js'></script>
    <script src="bootstrap-4/dist/js/bootstrap.min.js"></script>
    <script src="assets/script/KML.js"></script>
<!-- end of markerCluster style-->
  <!-- <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v1.0.0-rc.1/leaflet.css" />
<script src="http://cdn.leafletjs.com/leaflet/v1.0.0-rc.1/leaflet.js"></script>

<script src="bootstrap-4/dist/js/bootstrap.min.js"></script>
-->
<div class="container-fluid">
<div class="row">

<div class="bg-primary">
<div class = "page-header"><div class="quote"> <blockquote class = " blockquote blockquote-reverse" ><p class="m-b-0">BUS PROJECT WEB APPLICATION</p> <small><cite title="Source title" > BY DULGUUN </cite> </small></h1></blockquote></div>
</div></div>
            <div class="col-md-12 col-xs-12 col-lg-9">
        <div id="busStop"></div>


<div id ="busStopSearchForm" >
<input id="busStopSearch" class="form-control input input-lg" list="busStopNamesSearch"/><span id="carpet"></span>
<input type="button" class="searchbtn btn btn-primary btn-block" onclick="domSearch()" id="findBusStop" value="Газрын зурагнаас хайх">
<datalist id="busStopNamesSearch">
</datalist>
</div>

        

<div id="infoBoxModal"></div> 
<div id="map"></div>
        

       
</div>




<div class="col-md-12 col-xs-12 col-lg-3">
<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" id="getPositions">
    

    <div class="busInput btn-group" role="group">
    <input data-toggle="dropdown" aria-haspopup="true" aria-expaned="false" readonly type="text" class="form-control input-lg dropdown-toggle" id="inputlg" size="35" value="" name="origin"/>  
    <span class="carpet"></span>
    <ul class="dropdown-menu dropdown-menu-right">
        <li class="originChange dropdown-header">Change Busstop</li>
        <li class="origin dropdown-header"><a href="#">VIEW ALL busstop</a></li>
    </ul>
    </div>


    <div class="busInput btn-group" role="group">
    <input  data-toggle="dropdown" aria-haspopup="true" aria-expaned="false" readonly type="text" class="form-control input-lg dropdown-toggle" id="inputlg" size="35" value="" name="destination"/>
<span class="carpet"></span>
    <ul class="dropdown-menu">
        <li class="destinationChange dropdown-header">ChangeBusstop</li>
        <li class="destination dropdown-header"><a href="#">View all busstop </a></li>    
    </ul>
</div>    


<br>


<span class="spacer"><input type="button" class="btn btn-success btn-block" onclick="location.reload(false)" name="reset" value="Ахиж эхлэх"></span>

    <span class="spacer"><button onclick="findLocation()" id="findMe" class="btn btn-info btn-block" type="button" value="1">Намайг ол</button></span>
<span class="spacer"><button onclick="language()" id="language" class="btn btn-success-outline btn-block" type="button" value="1"> ENGLISH </button></span>
<span class="spacer"> <button id="collapser" type="button" class="btn btn-warning btn-block" type="button" data-toggle="collapse" data-target="#busStopCollapse" aria-expanded = "false" value= "Автобусны буудал" aria-control = "busStopCollapse">"Автобусны буудал"</button></span>
   
<div class="collapse" id="busStopCollapse">
</div> 
</form>
</div>
           </div>
    </div>
</div>

<link rel="stylesheet" href="style/main.css"> 
<!-- MAIN MAP JAVASCRIPT -->
<script src="script/bus_stop.js"></script>

<script src="script/map.js"></script>
<script src="script/domSearch.js"></script>
<script src="script/styler.js"></script>
<script src="script/editJs.js"></script>
<!---------------------------->
</body>

</html>

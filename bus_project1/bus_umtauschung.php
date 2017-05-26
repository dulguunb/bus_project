<html>
    <body> 
    <form method="POST" action = "bus_umtauschung.php" id="busStop">
        <input name="origin" type="number"/>
        <input name="destination" type="number"/>
<input type="submit" value="sumbit"/>
    </form>
    </body>
</html>

<?php
	$servername = "localhost";
	$password = "{1123581321}";
	$username = "root";
	$dbname = "bus_project";
$connection = new mysqli($servername,$username,$password,$dbname);
if($connection->connect_error){
		die($connection->connect_error) ;
}

echo $_POST['origin'] . " " . $_POST['destination'];
$originSql = "SELECT gps_coordx,gps_coordy FROM busstop_name_freq WHERE busstop_id = " . $_POST['origin'];


$destinationBusSql = "SELECT busroute_id FROM bus_route_stop WHERE busstop_id = "  . $_POST['destination'];
$destinationBusResult = $connection->query($destinationBusSql);
$destinationBusRoutes = Array();
    if($destinationBusResult->num_rows > 0){
        while($destinationRows = $destinationBusResult->fetch_assoc()){
            array_push($destinationBusRoutes,$destinationRows['busroute_id']);
        }
    }

$originBusResult = $connection->query($originSql);
    if($originBusResult->num_rows>0){
        while($originRows = $originBusResult->fetch_assoc()){
            $adjacentQuery = "SELECT * FROM busstop_name_freq ORDER BY gps_coordx";
            $adjacentQueryResult = $connection->query($adjacentQuery);
                if($adjacentQueryResult->num_rows>0){
                    while($adjacentRows = $adjacentQueryResult->fetch_assoc()){
                        if(find_distance($originRows['gps_coordx'],$originRows['gps_coordy'],$adjacentRows['gps_coordx'],$adjacentRows['gps_coordy']) <= 1000){
                            echo " ID: " . $adjacentRows['busstop_id']."  "  . $adjacentRows['busstop_nmmn']  . "<br>" . $adjacentRows['gps_coordx'] . "  ". $adjacentRows['gps_coordy'] . "<br>";
                        }
                    }
                }
        }
    }


?>

<?php
/**
 * Calculates the great-circle distance between two points, with
 * the Haversine formula.
 * @param float $latitudeFrom Latitude of start point in [deg decimal]
 * @param float $longitudeFrom Longitude of start point in [deg decimal]
 * @param float $latitudeTo Latitude of target point in [deg decimal]
 * @param float $longitudeTo Longitude of target point in [deg decimal]
 * @param float $earthRadius Mean earth radius in [m]
 * @return float Distance between points in [m] (same as earthRadius)
 */
function find_distance(
  $latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000)
{
  // convert from degrees to radians
  $latFrom = deg2rad($latitudeFrom);
  $lonFrom = deg2rad($longitudeFrom);
  $latTo = deg2rad($latitudeTo);
  $lonTo = deg2rad($longitudeTo);
  $latDelta = $latTo - $latFrom;
  $lonDelta = $lonTo - $lonFrom;
  $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
    cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
  return $angle * $earthRadius;
}
?>

<?php
function isAdjacent($longitude,$latitude){

}
?>

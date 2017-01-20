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
  header('Content-type: application/json');
	$servername = "localhost";
	$password = "{1123581321}";
	$username = "root";
	$dbname = "bus_project";
$connection = new mysqli($servername,$username,$password,$dbname);
$secondConnection = new mysqli($servername,$username,$password,$dbname);

if($connection->connect_error && $secondConnection->connect_error){
		die($connection->connect_error . $secondConnection->connect_error);
    }
    $get_json = array();
    $get_json_response = array();
    settype($_POST['busStopOrigin'],"integer");
    settype($_POST['busStopDestination'],"integer");
    $sql = "SELECT busroute_id , busstop_id ,to_nmus , from_nmus , busroute_no FROM bus_route_stop WHERE busstop_id = " .  $_POST['busStopOrigin'];

    $query_result = $connection->query($sql);
    
    if($query_result->num_rows > 0 ){
        
        while($bus_route_and_stop = $query_result->fetch_assoc())
        {
            # get_json array gets buffer into json file
            $bus_route_id = $bus_route_and_stop['busroute_id'];         
            /*
             SEARCHING THROUGH QUERY, in order to find what in what busroute this specific busstop belongs.
             */
            $secondSql = "SELECT * FROM bus_route_stop WHERE busroute_id = " .$bus_route_id ." ORDER BY busstop_id" ;     
            $second_query = $connection->query($secondSql);
            
            if($second_query->num_rows > 0){
                while($second_query_rows = $second_query->fetch_assoc()){
                    /*
                     IF two busstop matches then, it means, destination busstop belongs to that bus route.
                     */
                    if ($second_query_rows['busstop_id'] == $_POST['busStopDestination']){
                    
$get_json[] = array('busroute_id' => $second_query_rows['busroute_id'], 'busstop_id' => $second_query_rows['busstop_id'], 'to_nmus' => $second_query_rows['to_nmus'],
    'from_nmus' =>  $second_query_rows['from_nmus'], 'busroute_no' => $second_query_rows['busroute_no']);
            } 
                }
           }
           else {
                echo "<br> " . "no Result";
           }
  
            
        }
    }
  $get_json_response['originToDestination'] = $get_json;
                        
  echo json_encode($get_json_response,JSON_UNESCAPED_UNICODE);

?>

<?php


?>

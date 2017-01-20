<?php
    header('Content-type: application/json');
	$servername = "localhost";
	$password = "{1123581321}";
	$username = "root";
	$dbname = "bus_project";
$connection = new mysqli($servername,$username,$password,$dbname);
	if($connection->connect_error){
		die($connection->connect_error);
    }
    $get_json = array();
    $get_json_response = array();
    
    
    $sql = "SELECT *  FROM busstop_name_freq ORDER BY busstop_id";
    
    $query_result = $connection->query($sql);
	if($query_result->num_rows > 0 ){
        
        while($bus_route_and_stop = $query_result->fetch_assoc())
        {
            # get_json array gets buffer into json file
            $bus_stop_id = $bus_route_and_stop['busstop_id'];
            $bus_gps_coordx = $bus_route_and_stop['gps_coordx'];
            $bus_gps_coordy = $bus_route_and_stop['gps_coordy'];
          
            $bus_stop_name = $bus_route_and_stop['busstop_nmmn'];
            $get_json[] = array ( 'busstop_id' => $bus_stop_id, 'bus_gps_longitude' => $bus_gps_coordx ,'bus_gps_latitude'=> $bus_gps_coordy,'bus_stop_name' => $bus_stop_name);
            # json_encode($get_json);
        }
    }
    $get_json_response['bus_stop_data'] = $get_json;
    
   echo json_encode($get_json_response,JSON_UNESCAPED_UNICODE);

?>


<?php
header ('Content-type: application/json');
ini_set('display_errors','On');
error_reporting(E_ALL);
$servername = "localhost";
$username = "root";
$password = "{1123581321}";
$dbname = "bus_project";
$connection = new mysqli($servername,$username,$password,$dbname);
if($connection->connect_error){
    die($connection->connect_error);
}
$get_json = array();
$json_response = array();

$data = json_decode(stripslashes($_POST['data']));
/*for ($i = 0;$i<sizeof($data);$i++){
    echo $data[$i];
}*/
for($i=0;$i<sizeof($data);$i++){
         $sql = "SELECT busstop_id FROM bus_route_stop WHERE busroute_id = " . $data[$i];
         $query_result = $connection->query($sql);

        if($query_result->num_rows > 0){
        
    while($busroute_info = $query_result->fetch_assoc()){
        $second_sql = "SELECT * FROM busstop_name_freq WHERE busstop_id = "  . $busroute_info['busstop_id'];      
        $second_sql_result = $connection->query($second_sql);
        
        if($second_sql_result->num_rows > 0){
            while($busstop_info = $second_sql_result->fetch_assoc()){
                $get_json[]= 
                    
                        array(
                    'busroute_id' => $data[$i],
                    'busstop_nmmn'=> $busstop_info['busstop_nmmn'],
                    'busstop_longitude'=>$busstop_info['gps_coordx'],
                    'busstop_latitude'=>$busstop_info['gps_coordy'],
                    'busstop_id'=>$busstop_info['busstop_id']
                );
     
                   }
                }
    
            }       
      
        }
}
$json_response['busstop_info'] = $get_json;
echo json_encode($json_response,JSON_UNESCAPED_UNICODE);
?>

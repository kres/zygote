<?php
	
	echo $_SERVER[REQUEST_METHOD];
	echo " "; 
	echo $_SERVER[REQUEST_URI];
	echo " ";
	
	if($_SERVER[REQUEST_METHOD] == "PUT")
		echo file_get_contents("php://input");
	else
		echo http_build_query($REQUEST);
?>
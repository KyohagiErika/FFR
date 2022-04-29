<?php
$app_info_file_name = "./config/app_info.json";
$app_info_file = fopen($app_info_file_name,"r");
$APP = json_decode(fread($app_info_file,filesize($app_info_file_name)),true);
fclose($app_info_file);
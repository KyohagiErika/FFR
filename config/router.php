<?php
$REQUEST_URI = $_SERVER["REQUEST_URI"];
$REAL_URI = uri_remove_all_parameters(str_replace($APP["home-url"],"",$REQUEST_URI));
if (strcmp($REAL_URI,"/") == 0) {
    $REAL_URI = "/index.php";
}
$PAGE_URI = "view".$REAL_URI;
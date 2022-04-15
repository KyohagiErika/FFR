<?php
function uri_get_parameters(string $uri) : array {
    $parameters = array();
    if (strpos($uri,"?")) {
        $uri = substr($uri,strpos($uri,"?")+1);
        $para_str = explode("&",$uri);
        foreach ($para_str as $str) {
            $parameters[substr($str,0,strpos($str,"="))] = substr($str,strpos($str,"=")+1);
        }
    }
    return $parameters;
}
function uri_add_parameters(string $uri, array $parameters) : string {
    if (sizeof(uri_get_parameters($uri)) == 0) {
        $uri .= "?";
    }
    if ($uri[strlen($uri)-1] != '?') {
        $uri .= "&";
    }
    foreach ($parameters as $parameter_name => $parameter_value) {
        if (!empty($parameter_value)) {
            $uri .= $parameter_name."=".$parameter_value."&";
        }
    }
    return substr($uri,0,strlen($uri)-1);
}

function uri_remove_all_parameters(string $uri) : string {
    return(sizeof(uri_get_parameters($uri)) > 0 ? substr($uri,0,strpos($uri,"?")) : $uri);
}

function uri_remove_parameters(string $uri, array $parameter_names) : string {
    $parameters = uri_get_parameters($uri);
    foreach ($parameter_names as $parameter_name) {
        unset($parameters[$parameter_name]);
    }
    $uri = uri_remove_all_parameters($uri);
    if (sizeof($parameters) > 0) {
        $uri = uri_add_parameters($uri,$parameters);
    }
    return $uri;
}

function uri_update_parameters(string $uri, array $parameters) : string {
    $old_parameters = uri_get_parameters($uri);
    foreach ($parameters as $parameter_name => $parameter_value) {
        $old_parameters[$parameter_name] = $parameter_value;
    }
    $uri = uri_remove_all_parameters($uri);
    return uri_add_parameters($uri,$old_parameters);
}
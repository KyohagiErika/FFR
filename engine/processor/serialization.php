<?php
const SERIALIZATION_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * @param int $length
 * @return string
 * @throws Exception
 */
function serialization_random_id(int $length) {
    $serial_id = "";
    foreach (range(0,$length-1) as $i) {
        $serial_id .= SERIALIZATION_CHARACTER_SET[random_int(0,strlen(SERIALIZATION_CHARACTER_SET)-1)];
    }
    return $serial_id;
}
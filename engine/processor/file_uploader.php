<?php
const MAX_UPLOAD_FILE_SIZE = 30*1024*1024;

/**
 * @param array $file
 * @param string $target_dir
 * @param string $target_name
 * @param bool $check_image
 * @param array $extension_allow
 * @param bool $rewrite
 * @return false|string
 */
function upload_file(array $file, string $target_dir, string $target_name, bool $check_image = false, array $extension_allow = array(), bool $rewrite = true) {
    if ($file["size"] <= MAX_UPLOAD_FILE_SIZE) {
        $target_file = $target_dir.$target_name;
        $target_extension = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        if (!$check_image || getimagesize($file["tmp_name"])) {
            if (sizeof($extension_allow) == 0 || array_search($target_extension,$extension_allow)) {
                if ($rewrite || !file_exists($target_file)) {
                    if (move_uploaded_file($file["tmp_name"],$target_file)) {
                        return $target_file;
                    }
                }
            }
        }
    }
    return false;
}
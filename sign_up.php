<?php
require './config/app_info.php';
require './engine/processor/uri_handler.php';
require './config/router.php';
require './view/head.php';
require './view/wow_js.php';
require './view/navbar_section.php';
require './view/banner_section.php';
require $PAGE_URI;
require './view/footer_section.php';
require './view/back_to_top.php';
require './view/all_scripts_index.php';
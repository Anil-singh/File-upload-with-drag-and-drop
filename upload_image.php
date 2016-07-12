<?php
require_once("config.php");
$retVal = 0;
//Fetch the files from client and upload to server
if(!empty($_FILES)){
    if(isset($_FILES['drop-image']) && !($_FILES['drop-image']['error'])){
        $fileControl = $_FILES['drop-image'];
        $upFileName = $fileControl['name'];//name of profile pic send
        $outputDirectory = WEB_ROOT."uploads/";
        $outputFilePath = $outputDirectory.$upFileName;
        if(move_uploaded_file($fileControl['tmp_name'], $outputFilePath)){
            $retVal = 1;
        }
    }
}
echo $retVal;
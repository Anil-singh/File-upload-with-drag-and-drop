<link href="css/jquery.filer.css" type="text/css" rel="stylesheet" />
<link href="css/jquery.filer-dragdropbox-theme.css" type="text/css" rel="stylesheet" />
<link href="css/drag_drop.css" type="text/css" rel="stylesheet" />
<form action="upload_image.php" method="post" enctype="multipart/form-data">
    <div class="imageContainer">
        <!-- Accept only image files for now-->
      <input type="file" name="drop-image" id="image_input" accept='image/*'>
      <input type="submit" class= "submitButton" value="Upload">
    </div>
    <div class="text_align_center">
        <img src='' width='90px' id='image_input_show' style='display:none;'/>
    </div>
</form>
<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/jquery.filer.js" type="text/javascript"></script>
<script src="js/drag_drop.js" type="text/javascript"></script>
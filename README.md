## File Upload with Drag and Drop
User friendly file upload module with drag and drop functionality using Jquery and PHP, Uploader will show file info as soon as user browse or drag and drop a file.

## Example - Code sample
### Drag and drop js
    input.on('dragover',function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    input.on('dragenter',function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    input.on('drop', function(e){
        droppedFiles = [];
        name = $(this).find('input:file').attr('name') ;
        if(e.originalEvent.dataTransfer){
            if(e.originalEvent.dataTransfer.files.length) {
                e.preventDefault();
                e.stopPropagation();
                $("input[id="+ele+"]").prop("files", e.originalEvent.dataTransfer.files); 
                droppedFiles.push( {'file_name':name,'file_info':e.originalEvent.dataTransfer.files} );
                showImageOnScreen(ele,e.originalEvent.dataTransfer.files[0]);
            }
        }
    });

    <!-- asyncronous processing of file upload using ajax -->
    $("form").on("submit",function(event){
        event.preventDefault();
        if( droppedFiles )
        {   
            var form = $('form')[0]; // Create form object
            var formData = new FormData(form);
            $.each( droppedFiles, function(j,droppedFil){
                var droppedFile = droppedFiles[j]['file_info'] ; 
                var file_name = droppedFiles[j]['file_name'] ;
                $.each( droppedFile, function( i, file )
                {
                    formData.append( file_name , file );
                });
            });
            
            var url = "upload_image.php"; // server url for file upload processing
            $.ajax({
                url: url,
                type: 'POST',
                data : formData,
                enctype: 'multipart/form-data',
                cache:          false,
                contentType:    false,
                processData:    false,
                success : function(data){
                    if(data ==1 ){
                        alert("Image uploaded successfully");
                    }
                    else{
                        alert("Image could not be uploaded.Please check if the destination file path and permissions");
                    }
                }
            });
            droppedFiles = [];
        }
        return false;
    });

### file upload processing on server
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

## Installation

### Replace config parameter in config.php 
    // Web root for document upload
    define("WEB_ROOT","");

### File upload interface - index.php and js/drag_drop.js
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
    // js/drag_drop.js
    $('#image_input').filer({
       showThumbs: true,
        limit: 1,
        maxSize: 20,
        dragDrop: {
          dragEnter: null,
          dragLeave: null,
          drop: function(e){
            $('#image_input').validate();
            },
        },
        extensions: ['jpg', 'jpeg', 'png', 'gif'],//Only image files allowed,we can extend it to video files too
        changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"><i class="icon-jfi-cloud-up-o"></i></div><div class="jFiler-input-text"><h3>Drag&Drop files here</h3> <span style="display:inline-block; margin: 15px 0">or</span></div><a class="jFiler-input-choose-btn blue">Browse Files</a></div></div>',              
        theme: "dragdropbox" 
    });
    
    ## API References
        1.jquery.js
        2.jquery.filer.js

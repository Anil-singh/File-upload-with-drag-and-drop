    var droppedFiles = []; //This gloabal array contains the info of the file uploaded
    var ele = 'image_input';
    var input = $( '#'+ele ).parent();
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
    $('#image_input').change(function(){
       var id = this.id;
       if (this.files && this.files[0]) {
           showImageOnScreen(id,this.files[0]);
       } 
    });
    function showImageOnScreen(id,file){
        var ValidImageTypes = ["image/jpeg", "image/png"];
        if ($.inArray(file.type, ValidImageTypes) < 0) { //invalid filetype
           return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            if($('#'+id+'_show').attr('src') == ""){
                $('#'+id+'_show').css('display','initial');
            }
            $('#'+id+'_show')
            .attr('src', e.target.result)
            .width('auto')
            .height(320);
        };
        reader.readAsDataURL(file);
    }
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
            
            var url = "upload_image.php";
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
import React from 'react'

export const CustomFileUploader = ({ video = false, image = true, changeFile }) => {
    const changePhoto = (event) => {
        console.log(event.target.files[0].name);
        if (video) {
            if (!isVideo(event.target.files[0].name)) {
                event.preventDefault();
                alert('file is not video');
                return;
            }
        }

        if (image){
            if (!isImage(event.target.files[0].name)){
                event.preventDefault();
                alert('file is not image');
                return;
            }
        }

        changeFile(event.target.files[0]);
    }

    function getExtension(filename){
        var parts=filename.split('.');
        return parts[parts.length-1];
    }
    function isImage(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                //etc
                return true;
        }
        return false;
    }

    function isVideo(filename) {
        var ext = getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'm4v':
            case 'avi':
            case 'mpg':
            case 'mp4':
                // etc
                return true;
        }
        return false;
    }
    return (
        <div>
            <input type="file" onChange={(event)=>changePhoto(event)} className="form-control"/>
        </div>
    )
}

import React, { useRef } from 'react'
import axios from 'axios'
import { CustomFileUploader } from '../FileUploaders/CustomFileUploader';
import { ProgressBar } from '../ProgressBar';

export const UserInfo = () => {
    const userName = useRef('');
    const password = useRef('');
    const [userPhoto, setUserPhoto] = React.useState(null);
    const [previewFile, setPreviewFile] = React.useState(null);
    const [fileProgress, setFileProgress] = React.useState(0);
    const [isUpload, setIsUpload] = React.useState(false);
    const changeFile = (file) => {
        setUserPhoto(file);
        setPreviewFile(URL.createObjectURL(file));
    }
    const save = () => {

        try {
            let formData = new FormData();
            formData.append("userPhoto", userPhoto, userPhoto.name);
            console.log(formData.get("userPhoto"));

            const apiUrl = `https://localhost:44364/api/User?username=${userName.current.value}&password=${password.current.value}`;
            const requestOptions = {
                method: 'POST',
                //headers: { "Content-Type": "multipart/form-data" },
                body: formData
            };

            fetch(apiUrl, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
        }
        catch (error) {
            //....
        }
        finally{
            //در هر حالتی اجرا می شود
        }
    }

    const saveWithAxios = () => {

        let formData = new FormData();
        formData.append("userPhoto", userPhoto, userPhoto.name);
        console.log(formData.get("userPhoto"));

        const apiUrl = `https://localhost:44364/api/User?username=${userName.current.value}&password=${password.current.value}`;

        axios.request({
            method: "post",
            url: apiUrl,
            data: formData,
            onUploadProgress: (p) => {
                console.log(p);
                setFileProgress(Math.round((p.loaded / p.total) * 100));
                setIsUpload(true);
                if (p.loaded == p.total) {
                    setIsUpload(false);
                }
            }
        }).then(data => {
            //data...
        })
    }
    return (
        <div className="card m-3">
            <div className="card-header">
                UserInfo
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>User Name:</label>
                    <input ref={userName} className="form-control" />
                </div>
            
            <div className="form-group">
                <label>Password :</label>
                <input ref={password} type="password" className="form-control" />
            </div>
            <div className="form-group">
                <label>Photo:</label>
                <CustomFileUploader image={true} video={false} changeFile={changeFile} />
                <ProgressBar bgcolor="orange" completed={fileProgress} />
                <img src={previewFile} style={{ width: "200px" }} />
            </div>
            <div className="form-group">
                <button disabled={isUpload} className="btn btn-success" onClick={saveWithAxios}>Save</button>
            </div>
        </div>
        </div>
    )
}

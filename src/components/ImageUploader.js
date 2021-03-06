import React, { useEffect, useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import FilerobotImageEditor from 'filerobot-image-editor';

const ImageUploader = ({onSetImage}) => {
  
  const [show, toggle] = useState(false);  
  const [fileData, setFileData] = useState({});
  const [imageError, setImageError] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');  
  const dropRef = useRef(); 

  const editorConfig = {
    tools: ['adjust', 'effects', 'filters', 'rotate', 'crop', 'resize'],
    translations: {
      en: {
        'toolbar.download': 'Accept',
      }
    }
  }

  useEffect(() => {
    
    if(previewSrc.length > 0 && Object.keys(fileData).length > 0) {
      onSetImage(previewSrc, fileData);
    }
    
  }, [previewSrc, fileData]);

  const onCloseEditor = () => {
    toggle(false);
  }

  const onBeforeEditor = ({ canvas }) => {
    
    const editedImageData = canvas.toDataURL();
    setPreviewSrc(editedImageData);   
        
    return false;
  }  
  
  const onDropAccepted = (acceptedFiles) => {    
    // onDrop always returns an array 
    // take the first element 
    const [ uploadedFile ] = acceptedFiles;

    const {name, size, type, lastModified} = uploadedFile;
    
    setFileData({
      name,
      size,
      type,
      lastModified
    }); 

    const fileReader = new FileReader();
    // base64 string 
    fileReader.readAsDataURL(uploadedFile); 
    
    fileReader.onload = (e) => { 
      // convert then save      
      setPreviewSrc(fileReader.result);
    };
    
    setImageError('');
    dropRef.current.style.border = '5px dashed #f3e6ef';
  }

  const onDropRejected = () => {    
    setImageError('File type must be image');
  }

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '5px solid #723c62';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '5px dashed #f3e6ef';
    }
  };

  return (
    <div className="drop-zone-container">    
      <Dropzone       
        accept={"image/*"}
        maxFiles={1}
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected} 
        onDragOver={() => updateBorder('over')}             
        onDragEnter={() => updateBorder('over')}
        onDragLeave={() => updateBorder('leave')}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef} >
            <input {...getInputProps()} />
            <p>Drag and drop a image OR click here to select a image</p>
            {fileData && (
              <div>
                <strong>Selected file:</strong> {fileData.name}
              </div>
            )}
          </div>
        )}
      </Dropzone> 
      { imageError && (
        <span className="error-message">{imageError}</span>
      )}
      <FilerobotImageEditor
        show={show}
        src={previewSrc}
        config={editorConfig}
        onClose={onCloseEditor}        
        onBeforeComplete= {onBeforeEditor}
      /> 
      { previewSrc ? (
        <span>
          <div className="preview-area">
            <img src={previewSrc} alt="Preview" />
            <div className="button-positioner">
              <button type="button" onClick={() =>{ toggle(true) }}>Edit</button>  
            </div>
          </div>
        </span>
      ) : (
        <span className="preview-message">
          <p>
            Image preview will be shown here after selection.  
            <strong> If no image is loaded a default would be in place.</strong>
          </p>
        </span>
      )} 
    </div>
  )
}

export default ImageUploader;
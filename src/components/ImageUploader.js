import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import FilerobotImageEditor from 'filerobot-image-editor';

const ImageUploader = () => {
  
  const [show, toggle] = useState(false);
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState('');
  const [previewSrc, setPreviewSrc] = useState(''); 

  const editorConfig = {
    tools: ['adjust', 'effects', 'filters', 'rotate', 'crop', 'resize'],
    translations: {
      en: {
        'toolbar.download': 'Accept',
      }
    }
  }

  const onCloseEditor = () => {
    toggle(false);
  }

  const onBeforeEditor = ({ canvas }) => {
    const editedImageData = canvas.toDataURL();
    setFile(editedImageData);
    setPreviewSrc(editedImageData);    
    
    return false;
  }
  
  const onDrop = (acceptedFiles) => {
    // onDrop always returns an array 
    const [uploadedFile] = acceptedFiles;
    
    setFileName(uploadedFile.name);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedFile);
    fileReader.onload = () => {           
      setPreviewSrc(fileReader.result);
    };
  }

  return (
    <div className="drop-zone-container">    
      <Dropzone       
        accept={"image/*"}
        onDrop={onDrop}
        // onDrop={onDrop}
        // onDragEnter={() => updateBorder('over')}
        // onDragLeave={() => updateBorder('leave')}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'drop-zone' })} >
            <input {...getInputProps()} />
            <p>Drag and drop a image OR click here to select a image</p>
            {fileName && (
              <div>
                <strong>Selected file:</strong> {fileName}
              </div>
            )}
          </div>
        )}
      </Dropzone> 
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
            <img src={previewSrc} alt="Preview" onClick={() =>{ toggle(true) }}/>
          </div>
        </span>
      ) : (
        <span className="preview-message">
          <p>Image preview will be shown here after selection</p>
        </span>
      )} 
    </div>
  )
}

export default ImageUploader;


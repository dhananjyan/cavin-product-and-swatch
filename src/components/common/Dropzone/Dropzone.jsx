import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone(props) {
    const { className, children, onChange } = props;
    const onDrop = useCallback(acceptedFiles => {
        // console.log("acc fil", acceptedFiles)
        if (typeof onChange === "function")
            onChange(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className={className}>
            <input {...getInputProps()} />
            {children ? children : isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}
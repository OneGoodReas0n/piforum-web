import React, { CSSProperties, useMemo } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

interface DropzoneFieldProps {
  setFile: (file: File) => void;
}

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};
const style = {
  ...baseStyle,
};

const DropzoneField: React.FC<DropzoneFieldProps> = ({ setFile }) => {
  return (
    <main>
      <Dropzone
        accept="image/jpeg, image/img"
        multiple={false}
        onDrop={([file]) => {
          setFile(file);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="container">
            <div
              {...getRootProps({
                className: "dropzone",
                onDrop: (event) => event.stopPropagation(),
                style,
              })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
        )}
      </Dropzone>
    </main>
  );
};

export default DropzoneField;

import { Box, Image } from "@chakra-ui/core";
import React, { CSSProperties, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileWithPreview from "../interfaces/FileWithPreview";

interface DropzoneFieldProps {
  name: string;
  setField: (field: string, value: any, shouldValidate?: boolean) => void;
}

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 50,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  lineHeight: "36px",
};
const style = {
  ...baseStyle,
};

const DropzoneField: React.FC<DropzoneFieldProps> = ({ name, setField }) => {
  const [photo, setPhoto] = useState({} as FileWithPreview);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: ([file]) => {
      const updatedPhoto = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setPhoto(updatedPhoto);
      setField(name, updatedPhoto);
    },
  });

  return (
    <Box w="80px" h="80px" my={2}>
      {photo.preview ? (
        <Image src={photo.preview} />
      ) : (
        <section className="container">
          <div {...getRootProps({ className: "dropzone", style })}>
            <input {...getInputProps()} />
            <p>64x64</p>
          </div>
        </section>
      )}
    </Box>
  );
};

export default DropzoneField;

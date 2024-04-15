import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

function CarImagePreview({ formik }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("carImage", acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const img = {
    display: "block",
    // width: "auto",
    height: 400,
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          alt="user"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  const container = {
    border: "2px dotted #CCC",
    // backgroundColor: theme.palette.secondary.main,
    paddingY: 5,
  };
  return (
    <Box component={"center"} sx={container}>
      <Box {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} id="carImage" />
        {files.length > 0 ? (
          <Box sx={thumbsContainer}>{thumbs}</Box>
        ) : (
          <Typography
            color={() => {
              return formik.touched.carImage && formik.errors.carImage
                ? "#D44949"
                : "red";
            }}
          >
            {formik.touched.carImage && formik.errors.carImage
              ? formik.errors.carImage
              : " Click here or Drop your a Car"}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default CarImagePreview;

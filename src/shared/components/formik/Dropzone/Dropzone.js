import React from "react";
import { useDropzone } from "react-dropzone";
import "./Dropzone.css";

export function DropzoneFormik({
  acceptedFileExtension,
  maxFiles,
  queryClient,
  uploadMutation,
  tempArtikelId,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFileExtension,
    maxFiles: maxFiles,
    onDrop: (acceptedFiles) => {
      uploadMutation.mutate({ tempArtikelId, acceptedFiles, queryClient });
    },
  });

  return (
    <div
      {...getRootProps({
        className: "dropzone container-drop-file",
      })}
    >
      <input {...getInputProps()} />
      <i className="feather icon-upload-cloud" style={{ fontSize: "50px" }} />
      <p>
        Tarik dan masukkan file kedalam box / klik untuk meng-unggah gambar.
      </p>
    </div>
  );
}

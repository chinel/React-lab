"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface UploadResult {
  info: {
    public_id: string;
  };
  event: "success";
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState(""); //if handling multiple then it will be an array of strings
  return (
    <>
      {publicId && (
        <CldImage
          width="250"
          height="250"
          crop="thumb"
          src={publicId}
          alt="Uploaded image"
        />
      )}
      <CldUploadWidget
        uploadPreset="next-fullstack-app"
        //  options={{sources: ["local"]}}
        onSuccess={(results, widget) => {
          console.log(results);
          const cloudinaryResults = results as UploadResult;
          if (results?.event === "success") {
            setPublicId(cloudinaryResults.info.public_id);
          }
        }}
      >
        {({ open, results, widget }) => {
          return (
            <button className="btn btn-primary" onClick={() => open()}>
              Upload
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;

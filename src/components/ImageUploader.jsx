import { useState, useEffect } from "react";

import {
  Avatar,
  Box,
  Button,
  Typography,
  Alert,
} from "@mui/material";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

function ImageUploader({
  image,
  setImage,
  existingImage = "",
}) {

  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");


  // =====================================================
  // EXISTING IMAGE
  // =====================================================

  useEffect(() => {

    if (existingImage) {
      setPreview(existingImage);
    }

  }, [existingImage]);


  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const handleImage = (event) => {

    const file = event.target.files[0];

    // Clear previous error
    setError("");

    if (!file) {
      return;
    }


    // ===================================================
    // CHECK FILE TYPE
    // ===================================================

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {

      setError(
        "Invalid image format. Please select JPG, JPEG or PNG."
      );

      event.target.value = "";

      return;
    }


    // ===================================================
    // CHECK FILE SIZE
    // Maximum 5 MB
    // ===================================================

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {

      setError(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";

      return;
    }


    // ===================================================
    // VALID IMAGE
    // ===================================================

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };


  return (

    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={2}
    >

      {/* =================================================
          PROFILE IMAGE
      ================================================= */}

      <Avatar
        src={preview}
        sx={{
          width: 130,
          height: 130,
          mb: 2,
          bgcolor: "#1976d2",
          fontSize: 45,
        }}
      />


      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (

        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>

      )}


      {/* =================================================
          UPLOAD BUTTON
      ================================================= */}

      <Button
        component="label"
        variant="contained"
        startIcon={
          <CloudUploadRoundedIcon />
        }
        sx={{
          borderRadius: 3,
          textTransform: "none",
        }}
      >

        Upload Profile Photo

        <input
          hidden
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleImage}
        />

      </Button>


      {/* =================================================
          HELP TEXT
      ================================================= */}

      <Typography
        variant="body2"
        color="text.secondary"
        mt={1}
      >
        JPG, JPEG or PNG • Maximum 5 MB
      </Typography>

    </Box>

  );

}

export default ImageUploader;
import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

function ImageUploader({
  image,
  setImage,
  existingImage = "",
}) {

  const [preview, setPreview] = useState("");

  useEffect(() => {

    if (existingImage) {

      setPreview(existingImage);

    }

  }, [existingImage]);

  const handleImage = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  return (

    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={2}
    >

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

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadRoundedIcon />}
        sx={{
          borderRadius: 3,
          textTransform: "none",
        }}
      >

        Upload Profile Photo

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

      </Button>

      <Typography
        variant="body2"
        color="text.secondary"
        mt={1}
      >
        JPG, PNG or JPEG
      </Typography>

    </Box>

  );

}

export default ImageUploader;
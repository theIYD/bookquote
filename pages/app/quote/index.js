import { useRef, useState } from "react";
import {
  Container,
  Flex,
  Heading,
  Divider,
  FormControl,
  Textarea,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";
import to from "await-to-js";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import fileReader from "../../../utils/file-reader";

export default function NewQuote() {
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [uncroppedImage, setUncroppedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [text, setText] = useState("");
  const [isCropper, setIsCropper] = useState(false);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 100,
    height: 40,
  });

  const imageFileRef = useRef(null);

  const onImageUploadWrapperClick = () => {
    imageFileRef.current.click();
  };

  const handleImageFileChange = async (e) => {
    let file = e.target.files[0];
    const [err, imageResult] = await to(fileReader(file));
    if (err) {
      console.log("Error", err);
      return;
    }

    setImageFile(file);
    setImage(imageResult);
  };

  const onImageLoaded = (image) => {
    setUncroppedImage(image);
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = async (crop) => {
    if (uncroppedImage && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        uncroppedImage,
        crop,
        `cropped.${imageFile.type.split("/")[1]}`
      );
      setCroppedImage(croppedImageUrl);
    }
  };

  const onProcessButtonClick = async () => {
    const res = await fetch("/api/process", {
      method: "POST",
      body: JSON.stringify({
        imageFile: croppedImage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data && !data.error && data.text) {
      setText(data.text);
      setIsCropper("none");
    }
  };

  const handleTextChange = async (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      const dataURL = canvas.toDataURL(imageFile.type, 1);
      resolve(dataURL);
    });
  };

  return (
    <Container my={4}>
      <Flex mb={4}>
        <Heading as="h2" size="2xl">
          Share a quote...
        </Heading>
      </Flex>
      <Divider />
      <Flex flexDirection="column">
        <Flex
          w="100%"
          backgroundColor="#eee"
          h="100px"
          onClick={onImageUploadWrapperClick}
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          my={4}
        >
          {image ? <Text>✅ Quoted!</Text> : <Text>🖼️ Add Image</Text>}
        </Flex>
        {image && (
          <>
            <ReactCrop
              src={image}
              crop={crop}
              style={{ display: !isCropper ? "block" : "none" }}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
            <Button
              style={{ display: isCropper }}
              onClick={onProcessButtonClick}
              colorScheme="teal"
              size="sm"
            >
              Process
            </Button>
          </>
        )}
        {!image && (
          <Flex alignItems="center" justifyContent="center">
            <Text as="b" fontSize="md">
              OR
            </Text>
          </Flex>
        )}
        <form onSubmit={() => {}}>
          <Flex mt={4}>
            <FormControl>
              <Textarea
                rows={10}
                value={text}
                onChange={handleTextChange}
                placeholder="Quote: It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known."
              ></Textarea>
            </FormControl>
          </Flex>
          <Flex>
            <FormControl>
              <Input placeholder="Book: A Tale of Two Cities" />
            </FormControl>
            <FormControl>
              <Input placeholder="Author: Charles Dickens" />
            </FormControl>
          </Flex>
          <Button
            mt={4}
            w="100%"
            type="submit"
            disabled
            colorScheme="teal"
            size="sm"
          >
            Share
          </Button>
        </form>
      </Flex>
      <input
        type="file"
        id="photo"
        ref={imageFileRef}
        style={{ display: "none" }}
        onChange={handleImageFileChange}
        accept="image/jpeg, image/png"
      />
    </Container>
  );
}

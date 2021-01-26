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
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import to from "await-to-js";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Nav from "../../../components/Nav";
import fileReader from "../../../utils/file-reader";

export default function NewQuote() {
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [uncroppedImage, setUncroppedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [text, setText] = useState("");
  const [isCropper, setIsCropper] = useState(false);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 100,
    height: 40,
  });

  const imageFileRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
    setIsCropper(true);
    onOpen();
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
    setLoading(true);
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
      setLoading(false);
      setText(data.text);
      onClose();
      setIsCropper(false);
    }
  };

  const handleTextChange = async (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };

  const getCroppedImg = (image, crop) => {
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

  const submitQuote = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/quote", {
      method: "POST",
      body: JSON.stringify({
        bookName,
        authorName,
        content: text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data && !data.error && data.message) {
      toast({
        title: data.message,
        status: "success",
        duration: 2000,
      });
    } else if (data && data.error) {
      toast({
        title: "An error occurred",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Container maxWidth="960px">
      <Nav />
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
            <Modal
              closeOnOverlayClick={false}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Crop</ModalHeader>
                <ModalBody>
                  <ReactCrop
                    src={image}
                    crop={crop}
                    style={{ display: !isCropper ? "none" : "block" }}
                    onImageLoaded={onImageLoaded}
                    onComplete={onCropComplete}
                    onChange={onCropChange}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    style={{ display: !isCropper ? "none" : "block" }}
                    onClick={onProcessButtonClick}
                    colorScheme="messenger"
                    isLoading={loading}
                    size="sm"
                    w="100%"
                  >
                    Process
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
        {!image && (
          <Flex alignItems="center" justifyContent="center">
            <Text as="b" fontSize="md">
              OR
            </Text>
          </Flex>
        )}
        <form onSubmit={submitQuote}>
          <Flex mt={4}>
            <FormControl>
              <Textarea
                rows={10}
                required
                value={text}
                onChange={handleTextChange}
                placeholder="Quote: It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known."
              ></Textarea>
            </FormControl>
          </Flex>
          <Flex>
            <FormControl mr={4}>
              <Input
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                required
                placeholder="Book: A Tale of Two Cities"
              />
            </FormControl>
            <FormControl>
              <Input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                placeholder="Author: Charles Dickens"
              />
            </FormControl>
          </Flex>
          <Button
            mt={4}
            w="100%"
            type="submit"
            disabled={!text || !bookName || !authorName}
            colorScheme="messenger"
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

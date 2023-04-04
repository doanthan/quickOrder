import {
  Tr,
  Td,
  Button,
  VStack,
  Textarea,
  ModalOverlay,
  Input,
  FormControl,
  Switch,
  Modal,
  Text,
  useDisclosure,
  Spinner,
  useMultiStyleConfig,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { uploadProduct } from "../../redux/actions/adminActions";
import FileInput from "./FileInput";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import CropPreview from "./CropPreview";
import axios from "axios";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 160,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const admin = useSelector((state) => state.admin);

  //IMAGE RENDER
  //useRef is erased on render- use croppedImage instead
  const imgRef = useRef("");
  const [crop, setCrop] = useState();
  const [imgSrc, setImgSrc] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [aspect, setAspect] = useState(5 / 6);
  const [loading, setLoading] = useState(false);
  const previewRef = useRef();
  // croppedImage is not the croppedImage, it's just the image to pas into the canvas preview
  const [croppedImage, setCroppedImage] = useState();

  const createNewProduct = async () => {
    setLoading(true);
    const formData = new FormData();
    // get the preview ref, changes the canvas to BASE64 URL and posts to cloudinary babyayyy
    formData.append("file", previewRef.current.toDataURL());
    formData.append("upload_preset", "jxudlph4");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/referable/image/upload",
      formData
    );
    const image = response.data.url;
    const slug = JSON.parse(localStorage.getItem("userInfo")).store.slug;

    dispatch(
      uploadProduct({
        brand,
        name,
        category,
        stock,
        price,
        productIsNew,
        description,
        image,
        slug,
      })
    );
    setCroppedImage(null);
    setImgSrc(null);
    setCompletedCrop(null);
    setLoading(false);
    setBrand("");
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setStock("");
  };

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  return (
    <Tr>
      {imgSrc ? (
        <>
          <CropPreview
            img={imgRef?.current ? imgRef.current : croppedImage}
            crop={completedCrop}
            canvasRef={previewRef}
          />
          <Button
            colorScheme="red"
            variant="outline"
            m={3}
            onClick={() => {
              setCroppedImage(null);
              setImgSrc(null);
              setCompletedCrop(null);
            }}
          >
            Cancel Photo
          </Button>
        </>
      ) : (
        <FileInput setImgSrc={setImgSrc} onOpen={onOpen} />
      )}

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crop Product Image</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setImgSrc("");
              onClose();
            }}
          />
          <ModalBody>
            {!!imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
              >
                <img
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  ref={imgRef}
                />
              </ReactCrop>
            )}
          </ModalBody>
          <ModalFooter>
            {completedCrop && (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  console.log(completedCrop);
                  setCroppedImage(imgRef.current);
                  onClose();
                }}
              >
                Save Photo
              </Button>
            )}
            <Button
              onClick={() => {
                setImgSrc("");
                onClose();
              }}
              variant="ghost"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Td>
        <Text fontSize="sm">Description</Text>
        <Textarea
          value={description}
          w="270px"
          h="120px"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Description"
          size="sm"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Brand</Text>
        <Input
          size="sm"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Apple or Samsung etc."
        />
        <Text fontSize="sm">Name</Text>
        <Input
          size="sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Samsung S30"
        />
      </Td>

      <Td>
        <Text fontSize="sm">Category</Text>
        <Input
          size="sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Electronics"
        />
        <Text fontSize="sm">Price</Text>
        <Input
          size="sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="299.99"
        />
      </Td>

      <Td>
        <Text fontSize="sm">Stock</Text>
        <Input
          size="sm"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <Text fontSize="sm">New?</Text>
        <FormControl display="flex" alignItems="center">
          <Switch
            id="productIsNewFlag"
            onChange={() => setProductIsNew(!productIsNew)}
            isChecked={productIsNew}
          />
        </FormControl>
      </Td>
      <Td>
        {loading ? (
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        ) : (
          <VStack>
            <Button
              variant="outline"
              w="160px"
              colorScheme="orange"
              disabled={!loading}
              onClick={() => createNewProduct()}
            >
              <MdDriveFolderUpload />

              <Text ml="2">Save Product</Text>
            </Button>
          </VStack>
        )}
      </Td>
    </Tr>
  );
};

export default AddNewProduct;

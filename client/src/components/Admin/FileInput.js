import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Center, useColorModeValue, Icon } from "@chakra-ui/react";
import { AiFillFileAdd } from "react-icons/ai";

export default function Dropzone({ onOpen, setImgSrc }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(acceptedFiles[0]);
      onOpen();
    },
    [onOpen, setImgSrc]
  );

  const fileValidator = (file) => {
    if (file.size > 5242880) {
      return {
        code: "size-too-large",
        message: `file is larger than 5MB`,
      };
    }
    return null;
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      type: "file",
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/jpg": [],
      },
      maxFiles: 1,
      multiple: false,
      maxSize: 5242880,
      validator: fileValidator,
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const dropText = isDragActive
    ? "Drop the image here ..."
    : "Drag 'n' drop image here, or click to select image";

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  return (
    <>
      <Center
        p={10}
        cursor="pointer"
        bg={isDragActive ? activeBg : "transparent"}
        _hover={{ bg: activeBg }}
        transition="background-color 0.2s ease"
        borderRadius={4}
        border="3px dashed"
        borderColor={borderColor}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Icon as={AiFillFileAdd} mr={2} />
        <p>{dropText}</p>
      </Center>
      <ul>{fileRejectionItems}</ul>
    </>
  );
}

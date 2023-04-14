import { patchData } from "@/api/notes.api";
import { NCard } from "@/styles/NoteCard.styles";
import { Update } from "@/styles/Update.style";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RxPencil2 } from "react-icons/rx";

const UpdateNotePopup = ({ obj, getNotesData }) => {
  const { _id } = obj;

  // React Form Hook
  const { register, handleSubmit } = useForm();

  //ChakraUI Toast
  const toast = useToast();

  // Chakra Modal Toggler
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Reponse Handeling
  const [token, setToken] = useState("");
  const [forceRender, setForceRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState("");

  // custom Chakra Toast
  const customToast = useCallback((title = "Hello World", status = "success", position = "bottom-left") => {
    toast({
      title,
      status,
      position,
      isClosable: true,
    });
  },[toast])

  // catch the token onMount
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, [customToast,res]);

  // Handle response status according to force update
  useEffect(() => {
    if (res === "SUCCESS") {
      customToast("Ok!...");
    } else if (res === "ERROR") {
      customToast("Something Went Wrong...", "error");
    }
  }, [forceRender,customToast,res]);


  // Update the data
  const submitData = async (data) => {
    const myData = await patchData(_id, data, token);
    setRes(myData.flag);
    setForceRender(!forceRender);
    setLoading(true);
    await getNotesData(token);
  };

  return (
    <>
      <IconButton {...NCard.icon} onClick={onOpen} icon={<RxPencil2 />} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(submitData)}>
            <ModalBody>
              <FormControl>
                <Flex {...Update.flex}>
                  <FormLabel {...Update.label}>Title</FormLabel>
                  <Input {...register("title")} {...Update.input} placeholder="Enter the Title" />
                </Flex>
                <Flex {...Update.flex}>
                  <FormLabel {...Update.label}>Body</FormLabel>
                  <Textarea {...register("body")} {...Update.input} placeholder="Enter your Text" />
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button isDisabled={loading} type="submit" {...Update.btn} onClick={onClose}>
                {loading ? <Spinner /> : "Save"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateNotePopup;

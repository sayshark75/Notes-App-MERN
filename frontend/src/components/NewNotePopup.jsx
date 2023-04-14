import { postData } from "@/api/notes.api";
import { MyHome } from "@/styles/Home.styles";
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
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircleFill } from "react-icons/bs";

const NewNotePopup = ({ getNotesData }) => {
  // Handle a Modal chakraUI
  const { isOpen, onOpen, onClose } = useDisclosure();

  // React Form Hook
  const { register, handleSubmit } = useForm();

  //Chakra Toast hook
  const toast = useToast();

  // Navigation
  const router = useRouter();

  // response Handling
  const [res, setRes] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  // Chakraui Toast config
  const customToast = useCallback(
    (title = "Hello World", status = "success", position = "bottom-left") => {
      toast({
        title,
        status,
        position,
        isClosable: true,
      });
    },
    [toast]
  );

  // catch Token onMount
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, [customToast, res]);

  // Handle API responses, by Force rendering.
  useEffect(() => {
    console.log("res: ", res);
    if (res === "SUCCESS") {
      customToast("Note Saved...");
    } else if (res === "ERROR") {
      customToast("Something Went Wrong...", "error");
    }
    setLoading(false);
    return () => {
      setLoading(false);
    };
  }, [forceRender, customToast, res]);

  // Make a new Note
  const submitData = async (data) => {
    if (token) {
      setLoading(true);
      const myData = await postData(data, token);
      setRes(myData.flag);
      setForceRender(!forceRender);
      await getNotesData(token);
    } else {
      customToast("Please Login First", "info");
      setTimeout(() => {
        router.post("/login");
      }, 2000);
    }
  };

  return (
    <>
      <IconButton {...MyHome.newBtn} onClick={onOpen} icon={<BsPlusCircleFill />} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Note</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(submitData)}>
            <ModalBody>
              <FormControl>
                <Flex direction={"column"}>
                  <FormLabel fontSize={"sm"} color={"#727272"}>
                    Title
                  </FormLabel>
                  <Input
                    {...register("title", {
                      required: true,
                    })}
                    variant="filled"
                    placeholder="Enter the Title"
                  />
                </Flex>
                <Flex direction={"column"}>
                  <FormLabel fontSize={"sm"} color={"#727272"}>
                    Body
                  </FormLabel>
                  <Textarea {...register("body", { required: true })} variant="filled" placeholder="Enter your Text" />
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button isDisabled={loading} colorScheme="blue" type="submit" mr={3} onClick={onClose}>
                {loading ? <Spinner /> : "Save"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewNotePopup;

import { Flex, Heading, IconButton, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RxPencil2 } from "react-icons/rx";
import UpdateNotePopup from "./UpdateNotePopup";
import { NCard } from "@/styles/NoteCard.styles";
import { deleteData } from "@/api/notes.api";
import { useRouter } from "next/router";
import { useCallback } from "react";

const NoteCard = ({ obj, getNotesData }) => {
  const { _id, title, body } = obj;

  // Chakra Toast
  const toast = useToast();

  // Navigation
  const router = useRouter();

  // Response Handling
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState("");

  // Chakra ui Toast
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

  // Catch the Token onMount
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, [customToast, router]);

  // Perform Action Based on response on Updater Phase
  useEffect(() => {
    let id;
    if (res === "SUCCESS") {
      customToast("Deleted Successfully...");
      setLoading(false);
    } else if (res === "ERROR") {
      customToast("Something Went Wrong...", "error");
      setLoading(false);
    } else if (res === "WARNING") {
      customToast("Session End, Please Login", "warning");
      setLoading(false);
      id = setTimeout(() => {
        router.push("/login");
      }, 2000);
    }

    // cleanup
    return () => {
      clearTimeout(id);
    };
  }, [res, customToast, router]);

  // Delete a Note
  const handleDelete = async () => {
    if (token) {
      setLoading(true);
      const myData = await deleteData(_id, token);
      console.log("myData: ", myData);
      setRes(myData.flag);
      await getNotesData(token);
    } else {
      customToast("Please Login First", "info");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <Flex {...NCard.main}>
      <Heading {...NCard.heading}>{title}</Heading>
      <Text {...NCard.text}>{body}</Text>
      <Flex {...NCard.sub}>
        <UpdateNotePopup obj={obj} getNotesData={getNotesData} />
        <IconButton isDisabled={loading} {...NCard.icon} onClick={handleDelete} icon={loading ? <Spinner /> : <MdDelete />} />
      </Flex>
    </Flex>
  );
};

export default NoteCard;

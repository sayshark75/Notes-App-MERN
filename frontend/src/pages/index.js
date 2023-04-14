import Head from "next/head";
import { Flex, Heading, Image, SimpleGrid, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NewNotePopup from "../components/NewNotePopup";
import NoteCard from "../components/NoteCard";
import { useRouter } from "next/router";
import { getData } from "@/api/notes.api";
import { MyHome } from "@/styles/Home.styles";
import Navbar from "@/components/Navbar";
import { useCallback } from "react";

export default function Home() {
  // Handle Response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notes, setNotes] = useState([]);

  // Navigation
  const router = useRouter();

  // ChakraUI Toast
  const toast = useToast();

  // Chakra Ui toast
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

  // show Notes on Screen according to User token
  const getNotesData = useCallback(async (myToken) => {
    try {
      const myData = await getData(myToken);
      if (myData.flag === "SUCCESS") {
        setNotes(myData.notes);
        setLoading(false);
        setError(false);
      } else if (myData.flag === "ERROR") {
        setError(true);
        setLoading(false);
        customToast("Something Went Wrong...", "error");
      }
    } catch (error) {
      console.log("error: ", error);
      customToast("Something Went Wrong...", "error");
    }
  }, [customToast]);

  // Gather Token and Perform onMount Actions
  useEffect(() => {
    const myToken = localStorage.getItem("token") || "";
    let id;
    if (myToken) {
      setLoading(true);
      getNotesData(myToken);
    } else {
      customToast("Plese Login First... Redirecting", "info");
      id = setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
    //clean up
    return () => {
      clearTimeout(id);
    };
  }, [customToast, getNotesData, router]);

  return (
    <>
      <Head>
        <title>Notes App</title>
        <meta name="description" content="Simple and Secure Notes App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Flex {...MyHome.main}>
          <Heading {...MyHome.heading}>Notes App</Heading>
          <Flex {...MyHome.newBtnFlex}>
            {/* New Note */}
            <NewNotePopup getNotesData={getNotesData} />
          </Flex>
          {loading ? (
            <Flex {...MyHome.loadFlex}>
              <Image {...MyHome.loadImg} src={"https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"} alt={"img"} />
            </Flex>
          ) : !error ? (
            notes.length === 0 ? (
              <Flex {...MyHome.emptyFlex}>
                <Heading {...MyHome.emptyHeading}>No Notes?, Create One!</Heading>
                <Image {...MyHome.emptyImg} src={"https://user-images.githubusercontent.com/112304655/219552917-1994c750-b307-4f26-a975-d0f97c20b8b9.gif"} alt={"Empty"} />
              </Flex>
            ) : (
              <SimpleGrid {...MyHome.grid}>
                {notes?.map((el, id) => {
                  return <NoteCard key={id} getNotesData={getNotesData} obj={el} />;
                })}
              </SimpleGrid>
            )
          ) : (
            <Flex {...MyHome.errorFlex}>
              <Heading {...MyHome.errHeading}>Error, Something Went Wrong</Heading>
              <Image {...MyHome.emptyImg} src={"https://user-images.githubusercontent.com/112304655/219552917-1994c750-b307-4f26-a975-d0f97c20b8b9.gif"} alt={"Empty"} />
            </Flex>
          )}
        </Flex>
      </main>
    </>
  );
}

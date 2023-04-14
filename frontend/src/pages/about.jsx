import Navbar from "@/components/Navbar";
import { About } from "@/styles/About.styles";
import { Box, Flex, Heading, Image, List, ListIcon, ListItem, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaFeatherAlt } from "react-icons/fa";

const AboutPage = () => {
  const ProjectDescription = [
    {
      imgsrc: "https://user-images.githubusercontent.com/112304655/209445931-9b63ab2d-c752-40e6-a49e-4aaa54113d2b.svg",
      title: "ReactJS",
    },
    {
      imgsrc: "https://user-images.githubusercontent.com/112304655/209445986-290b2b16-0728-4697-9596-bc4c964ab47c.svg",
      title: "NodeJS",
    },
    {
      imgsrc: "https://user-images.githubusercontent.com/112304655/209445988-e24ead22-e7f5-42d3-be49-5dc217e4236c.svg",
      title: "ExpressJS",
    },
    {
      imgsrc: "https://user-images.githubusercontent.com/112304655/209445995-cfdc6ab0-7053-4a99-ae0b-211a753df499.svg",
      title: "Mongo DB",
    },
    {
      imgsrc: "https://user-images.githubusercontent.com/112304655/209447089-14d77899-1cfb-4d60-b96b-7c09d99942dd.svg",
      title: "Chakra UI",
    },
  ];

  const npmPackages = ["React Icons", "React Forms", "Axios", "Express", "Mongoose", "Dotenv", "Nodemon", "Jsonwebtoken", "CORS", "Bcrypt"];
  const features = [
    "Responsive Design",
    "Login and Signup Features",
    "Form Validations",
    "Database Management",
    "Environment Variables",
    "Web Tokens to authorise",
    "Maintained Privacy",
    "Data Encryptions",
  ];
 
  return (
    <>
      <Navbar />
      <Flex {...About.main}>
        <Heading {...About.heading}> ABOUT PAGE</Heading>
        <Image alt={"Hello"} src={"https://user-images.githubusercontent.com/112304655/218937503-577c9cc7-9f28-4124-aacd-4bc83f2d9a80.gif"} />
        <Box {...About.border}></Box>
        <Text {...About.heading}> Crafted Using</Text>
        <SimpleGrid {...About.grid}>
          {ProjectDescription.map((el, id) => {
            return (
              <Flex key={id} {...About.iconMain}>
                <Image alt={"Hello"} {...About.iconImg} src={el.imgsrc} />
                <Heading {...About.iconHeading}>{el.title}</Heading>
              </Flex>
            );
          })}
        </SimpleGrid>
        <Box {...About.border}></Box>
        <Image alt={"Hello"} w={"100px"} src={"https://user-images.githubusercontent.com/112304655/209446056-f6fa3b7e-c294-4628-8f53-55b36e3bdc7f.svg"} />
        <Heading {...About.heading}>Packages Used</Heading>
        <List spacing={3}>
          {npmPackages.map((el, id) => {
            return (
              <ListItem key={id} {...About.listMain}>
                <ListIcon as={BsFillCheckCircleFill} {...About.list} />
                {el}
              </ListItem>
            );
          })}
        </List>
        <Box {...About.border}></Box>
        <Image alt={"Hello"} w={"100px"} src={"https://user-images.githubusercontent.com/112304655/218950656-e655a193-f636-4c89-8bcf-842d7b44f244.svg"} />
        <Heading mb={"8"}>Features</Heading>
        <List spacing={3}>
          {features.map((el, id) => {
            return (
              <ListItem key={id} {...About.listMain}>
                <ListIcon as={FaFeatherAlt} {...About.list} />
                {el}
              </ListItem>
            );
          })}
        </List>
        <Box {...About.border}></Box>
      </Flex>
    </>
  );
};

export default AboutPage;

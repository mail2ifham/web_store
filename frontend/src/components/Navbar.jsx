import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { FiPlusSquare } from "react-icons/fi";
import { ColorModeButton } from "./ui/color-mode";
import { CiPen } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import {
  Container,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Container maxW={1140} px={4}  >
      <Flex
        h={160}
        align={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack
          gap={2}
          alignItems={"center"}
          // borderWidth="5px"
        >
          <Link to={"/create"}>
            <IconButton aria-label="Add Item" size={"lg"}>
              <FiPlusSquare />
            </IconButton>
          </Link>

          <ColorModeButton size={"lg"} variant="solid"  sun={<CiPen />} moon={<FaBookOpen />}/>
         
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;

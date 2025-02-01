import { useProductStore } from "@/store/products";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const createProduct = useProductStore((state) => state.createProduct);
  const handleAddProducts = async () => {
    const { success, message } = await createProduct(newProduct);
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        action: { label: "close", onClick: () => toaster.dismiss() },
      });
      return;
    } else {
      toaster.create({
        title: "Success",
        description: "Product created successfully",
        type: "success",
        action: { label: "close", onClick: () => toaster.dismiss() },
      });
    }
  };

  return (
    <Container maxW={"xl"}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"4xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          mb={8}
        >
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder={"Product Name"}
              name={"name"}
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder={"Product Price"}
              name={"price"}
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder={"Product Image URL"}
              name={"image"}
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              colorPalette={"blue"}
              onClick={handleAddProducts}
              w={"full"}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
      <Toaster />
    </Container>
  );
};

export default CreatePage;

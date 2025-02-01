import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/products";
import { Toaster, toaster } from "./ui/toaster";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Input,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "./ui/dialog";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [open, setOpen] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");

  const delProduct = useProductStore((product) => product.deleteProduct);
  const handleDelete = async (id) => {
    const { success, message } = await delProduct(id);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        action: { label: "close", onClick: () => toaster.dismiss() },
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        action: { label: "close", onClick: () => toaster.dismiss() },
      });
    }
  };

  const updateProduct = useProductStore((state) => state.updateProduct);

  const handleUpdateProduct = async (id, updatedProduct) => {
    console.log(updatedProduct);
    const { success, message } = await updateProduct(id, updatedProduct);
    setOpen(!open);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        action: { label: "close", onClick: () => toaster.dismiss() },
      });
    } else {
      console.log(success);
      toaster.create({
        title: "Success",
        description: "Product updated successfully",
        type: "success",
        action: { label: "close", onClick: () => toaster.dismiss() },
      });
    }
  };

  return (
    <Box
      shadow={"md"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
      }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={"white.500"} mb={4}>
          ${product.price}
        </Text>
        <HStack gap={2}>
          <IconButton onClick={() => setOpen(!open)} bg={"blue.300"}>
            <FaEdit />
          </IconButton>
          <IconButton onClick={() => handleDelete(product._id)} bg={"red.300"}>
            <FaTrash />
          </IconButton>
        </HStack>
      </Box>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack gap={4}>
              <Input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                value={updatedProduct.price}
                type="text"
                name="price"
                placeholder="Price"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Textarea
                value={updatedProduct.image}
                type="t"
                name="imageURL"
                placeholder="Image URL"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Toaster />
    </Box>
  );
};

export default ProductCard;

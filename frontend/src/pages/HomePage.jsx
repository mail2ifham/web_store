import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useProductStore } from "../store/products";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"4xl"}>
      <VStack gap={8}>
        <Text
          fontSize={28}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          Current Products
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontweight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;

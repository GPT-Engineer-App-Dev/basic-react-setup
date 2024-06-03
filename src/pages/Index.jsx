import { Container, Text, VStack, Heading, Button, Box, Input } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";
import { useDishes, useAddDish, useUpdateDish, useDeleteDish } from "../integrations/supabase/index.js";
import { useState } from "react";

const Index = () => {
  const { data: dishes, isLoading, isError } = useDishes();
  const addDish = useAddDish();
  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();

  const [newDish, setNewDish] = useState({ name: "", country: "", size: "", type: "", price: 0 });

  const handleAddDish = () => {
    addDish.mutate(newDish);
    setNewDish({ name: "", country: "", size: "", type: "", price: 0 });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Welcome to Your New React App</Heading>
        <Text fontSize="xl">This is your starting point. Customize it to make it your own!</Text>
        <Button leftIcon={<FaRocket />} colorScheme="teal" size="lg" mt={6}>
          Get Started
        </Button>
        <Box mt={10}>
          <Heading as="h2" size="lg" mb={4}>Dishes</Heading>
          {isLoading && <Text>Loading...</Text>}
          {isError && <Text>Error loading dishes</Text>}
          {dishes && dishes.map(dish => (
            <Box key={dish.id} p={4} shadow="md" borderWidth="1px">
              <Text>Name: {dish.name}</Text>
              <Text>Country: {dish.country}</Text>
              <Text>Size: {dish.size}</Text>
              <Text>Type: {dish.type}</Text>
              <Text>Price: {dish.price}</Text>
              <Button colorScheme="red" onClick={() => deleteDish.mutate(dish.id)}>Delete</Button>
            </Box>
          ))}
          <Box mt={4}>
            <Heading as="h3" size="md" mb={2}>Add New Dish</Heading>
            <Input placeholder="Name" value={newDish.name} onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} />
            <Input placeholder="Country" value={newDish.country} onChange={(e) => setNewDish({ ...newDish, country: e.target.value })} />
            <Input placeholder="Size" value={newDish.size} onChange={(e) => setNewDish({ ...newDish, size: e.target.value })} />
            <Input placeholder="Type" value={newDish.type} onChange={(e) => setNewDish({ ...newDish, type: e.target.value })} />
            <Input placeholder="Price" type="number" value={newDish.price} onChange={(e) => setNewDish({ ...newDish, price: parseFloat(e.target.value) })} />
            <Button colorScheme="teal" onClick={handleAddDish}>Add Dish</Button>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
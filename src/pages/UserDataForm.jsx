import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { 
  Box, Button, Input, FormLabel, FormControl, VStack, Heading, FormErrorMessage, useToast 
} from "@chakra-ui/react";

function UserDataForm() {
  const initialState = { id: uuidv4(), name: "", address: "", email: "", phone: "" };
  
  const [formData, setFormData] = useState(initialState);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty && Object.values(formData).every((val) => val.trim() !== "")) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formData, isDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
    
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    localStorage.setItem("userData", JSON.stringify(formData));
    setFormData(initialState);
    setIsDirty(false);
    setErrors({});
    
    toast({
      title: "Data Saved!",
      description: "You can visualize your info by navigating to the Text Editor or Dashboard.",
      status: "success",
      duration: 4000, 
      isClosable: true,
      position:"top",
    });
  };

  return (
    <Box p={8} maxWidth="400px" mx="auto">
      <Heading as="h1" mb={4}>User Form</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={errors.name}>
            <FormLabel fontWeight="bold" fontSize="sm">Name</FormLabel>
            <Input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter your name"
              borderRadius="md"
              boxShadow="sm"
              borderColor="gray.500"
              _hover={{borderColor:"blue.500"}}
              _focus={{ borderColor: "teal.600", boxShadow: "0 0 0 2px teal.700" }}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.address}>
            <FormLabel fontWeight="bold" fontSize="sm">Address</FormLabel>
            <Input 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              placeholder="Enter your address"
              borderRadius="md"
              borderColor="gray.500"
              _hover={{borderColor:"blue.500"}}
              boxShadow="sm"
              _focus={{ borderColor: "teal.600", boxShadow: "0 0 0 2px teal.700" }}
            />
            <FormErrorMessage>{errors.address}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel fontWeight="bold" fontSize="sm">Email</FormLabel>
            <Input 
              type="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email"
              borderRadius="md"
              boxShadow="sm"
              borderColor="gray.500"
              _hover={{borderColor:"blue.500"}}
              _focus={{ borderColor: "teal.600", boxShadow: "0 0 0 2px teal.700" }}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.phone}>
            <FormLabel fontWeight="bold" fontSize="sm">Phone</FormLabel>
            <Input 
              type="tel"
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Enter your phone number"
              borderRadius="md"
              borderColor="gray.500"
              _hover={{borderColor:"blue.500"}}
              
              boxShadow="sm"
              _focus={{ borderColor: "teal.600", boxShadow: "0 0 0 2px teal.700" }}
            />
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="blue" 
            width="full" 
            borderRadius="md"
            _hover={{ bg: "blue.600" }}
          >
            Save
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default UserDataForm; 





// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserData } from '../store/userSlice';
// import { v4 as uuidv4 } from 'uuid';
// import { Box, Button, Input, FormLabel, FormControl } from '@chakra-ui/react';

// function UserDataForm() {
//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.user.userData);
//   const [formData, setFormData] = useState(userData || { id: uuidv4(), name: '', address: '', email: '', phone: '' });

//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (JSON.stringify(formData) !== JSON.stringify(userData)) {
//         e.preventDefault();
//         e.returnValue = '';
//       }
//     };
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, [formData, userData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(setUserData(formData));
//     localStorage.setItem('userData', JSON.stringify(formData));
//   };

//   return (
//     <Box p={5}>
//       <form onSubmit={handleSubmit}>
//         <FormControl>
//           <FormLabel>Name</FormLabel>
//           <Input name="name" value={formData.name} onChange={handleChange} />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Address</FormLabel>
//           <Input name="address" value={formData.address} onChange={handleChange} />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Email</FormLabel>
//           <Input name="email" value={formData.email} onChange={handleChange} />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Phone</FormLabel>
//           <Input name="phone" value={formData.phone} onChange={handleChange} />
//         </FormControl>
//         <Button type="submit">Save</Button>
//       </form>
//     </Box>
//   );
// }

// export default UserDataForm;



// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserData } from "../store/userSlice";
// import { v4 as uuidv4 } from "uuid";
// import { Box, Button, Input, FormLabel, FormControl, useToast } from "@chakra-ui/react";

// function UserDataForm() {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.user.userData); // Redux users array
//   const toast = useToast();

//   // Initialize empty form data
//   const [formData, setFormData] = useState({
//     id: uuidv4(),
//     name: "",
//     address: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
//     if (savedUsers.length > 0) {
//       dispatch(setUserData(savedUsers));
//     }
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check for existing user by email or phone
//     const existingUser = users.find(
//       (user) => user.email === formData.email || user.phone === formData.phone
//     );
//     if (existingUser) {
//       toast({
//         title: "User already exists",
//         description: "This email or phone number is already taken.",
//         status: "error",
//         duration: 4000,
//         isClosable: true,
//       });
//       return;
//     }

//     const newUser = { ...formData, id: uuidv4() };

//     // Update Redux state
//     dispatch(setUserData(newUser));

//     // Update Local Storage
//     const updatedUsers = [...users, newUser];
//     localStorage.setItem("userData", JSON.stringify(updatedUsers));

//     toast({
//       title: "User saved successfully!",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });

//     // Reset form
//     setFormData({
//       id: uuidv4(),
//       name: "",
//       address: "",
//       email: "",
//       phone: "",
//     });
//   };

//   return (
//     <Box p={5}>
//       <form onSubmit={handleSubmit}>
//         <FormControl>
//           <FormLabel>Name</FormLabel>
//           <Input name="name" value={formData.name} onChange={handleChange} required />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Address</FormLabel>
//           <Input name="address" value={formData.address} onChange={handleChange} required />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Email</FormLabel>
//           <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Phone</FormLabel>
//           <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//         </FormControl>
//         <Button type="submit" colorScheme="blue" mt={4}>
//           Save
//         </Button>
//       </form>
//     </Box>
//   );
// }

// export default UserDataForm;



//useReducer
// import React, { useReducer, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { Box, Button, Input, FormLabel, FormControl } from "@chakra-ui/react";

// // Initial form state
// const initialState = {
//   id: uuidv4(),
//   name: "",
//   address: "",
//   email: "",
//   phone: "",
// };

// // Reducer function for managing form state
// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_FIELD":
//       return { ...state, [action.field]: action.value };
//     case "SUBMIT":
//       localStorage.setItem("userData", JSON.stringify(state));
//       return initialState; // Reset form after save
//     default:
//       return state;
//   }
// };

// function UserDataForm() {
//   const [formData, dispatch] = useReducer(formReducer, initialState);

//   useEffect(() => {
//     // Prevent page exit if there are unsaved changes
//     const handleBeforeUnload = (e) => {
//       const savedData = localStorage.getItem("userData");
//       if (JSON.stringify(formData) !== savedData) {
//         e.preventDefault();
//         e.returnValue = "";
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch({ type: "UPDATE_FIELD", field: name, value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch({ type: "SUBMIT" }); // Save to localStorage & reset form
//   };

//   return (
//     <Box p={5}>
//       <form onSubmit={handleSubmit}>
//         <FormControl>
//           <FormLabel>Name</FormLabel>
//           <Input name="name" value={formData.name} onChange={handleChange} />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Address</FormLabel>
//           <Input name="address" value={formData.address} onChange={handleChange} />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Email</FormLabel>
//           <Input name="email" value={formData.email} onChange={handleChange} />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Phone</FormLabel>
//           <Input name="phone" value={formData.phone} onChange={handleChange} />
//         </FormControl>
//         <Button type="submit" colorScheme="blue" mt={4}>
//           Save
//         </Button>
//       </form>
//     </Box>
//   );
// }

// export default UserDataForm;

//useState
// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { 
//   Box, Button, Input, FormLabel, FormControl, VStack, Heading, FormErrorMessage, useToast 
// } from "@chakra-ui/react";

// function UserDataForm() {
//   const initialState = { id: uuidv4(), name: "", address: "", email: "", phone: "" };
  
//   const [formData, setFormData] = useState(initialState);
//   const [isDirty, setIsDirty] = useState(false);
//   const [errors, setErrors] = useState({});
//   const toast = useToast(); // Chakra UI toast

//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (isDirty && Object.values(formData).every((val) => val.trim() !== "")) {
//         e.preventDefault();
//         e.returnValue = "";
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [formData, isDirty]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setIsDirty(true);
    
//     if (value.trim() !== "") {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     let newErrors = {};
    
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     localStorage.setItem("userData", JSON.stringify(formData));
//     setFormData(initialState);
//     setIsDirty(false);
//     setErrors({});
    
//     // Show success popup
//     toast({
//       title: "Data Saved!",
//       description: "You can visualize your info by navigating to the Text Editor or Dashboard.",
//       status: "success",
//       duration: 5000, // 4 seconds
//       isClosable: true,
//       position: "top",
//     });
//   };

//   return (
//     <Box p={8} maxWidth="400px" mx="auto">
//       <Heading as="h1" mb={4}>Fill the form</Heading>
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={4} align="stretch">
//           <FormControl isInvalid={errors.name}>
//             <FormLabel fontWeight="bold" fontSize="sm">Name</FormLabel>
//             <Input 
//               name="name" 
//               value={formData.name} 
//               onChange={handleChange} 
//               placeholder="Enter your name"
//               borderRadius="md"
//               boxShadow="sm"
//               _focus={{ borderColor: "blue.500", boxShadow: "md" }}
//             />
//             <FormErrorMessage>{errors.name}</FormErrorMessage>
//           </FormControl>

//           <FormControl isInvalid={errors.address}>
//             <FormLabel fontWeight="bold" fontSize="sm">Address</FormLabel>
//             <Input 
//               name="address" 
//               value={formData.address} 
//               onChange={handleChange} 
//               placeholder="Enter your address"
//               borderRadius="md"
//               boxShadow="sm"
//               _focus={{ borderColor: "blue.500", boxShadow: "md" }}
//             />
//             <FormErrorMessage>{errors.address}</FormErrorMessage>
//           </FormControl>

//           <FormControl isInvalid={errors.email}>
//             <FormLabel fontWeight="bold" fontSize="sm">Email</FormLabel>
//             <Input 
//               type="email"
//               name="email" 
//               value={formData.email} 
//               onChange={handleChange} 
//               placeholder="Enter your email"
//               borderRadius="md"
//               boxShadow="sm"
//               _focus={{ borderColor: "blue.500", boxShadow: "md" }}
//             />
//             <FormErrorMessage>{errors.email}</FormErrorMessage>
//           </FormControl>

//           <FormControl isInvalid={errors.phone}>
//             <FormLabel fontWeight="bold" fontSize="sm">Phone</FormLabel>
//             <Input 
//               type="tel"
//               name="phone" 
//               value={formData.phone} 
//               onChange={handleChange} 
//               placeholder="Enter your phone number"
//               borderRadius="md"
//               boxShadow="sm"
//               _focus={{ borderColor: "blue.500", boxShadow: "md" }}
//             />
//             <FormErrorMessage>{errors.phone}</FormErrorMessage>
//           </FormControl>

//           <Button 
//             type="submit" 
//             colorScheme="blue" 
//             width="full" 
//             borderRadius="md"
//             _hover={{ bg: "blue.600" }}
//           >
//             Save
//           </Button>
//         </VStack>
//       </form>
//     </Box>
//   );
// }

// export default UserDataForm;

//////////
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




// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserData } from '../store/userSlice';
// import { v4 as uuidv4 } from 'uuid';
// import { 
//   Box, 
//   Button, 
//   Input, 
//   FormLabel, 
//   FormControl, 
//   Heading, 
//   VStack, 
//   useToast, 
//   Card, 
//   CardBody 
// } from '@chakra-ui/react';

// function UserDataForm() {
//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.user.userData);
//   const toast = useToast();

//   // Initialize form state (excluding user ID from UI)
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     address: '',
//     email: '',
//     phone: ''
//   });

//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (JSON.stringify(formData) !== JSON.stringify(userData)) {
//         e.preventDefault();
//         e.returnValue = '';
//       }
//     };
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, [formData, userData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Generate a new user ID
//     const newUser = { ...formData, id: uuidv4() };

//     // Save to Redux & Local Storage
//     dispatch(setUserData(newUser));
//     localStorage.setItem('userData', JSON.stringify(newUser));

//     // Show confirmation pop-up with user details
//     toast({
//       title: "User Data Saved!",
//       description: `User ID: ${newUser.id}\nName: ${newUser.name}\nEmail: ${newUser.email}`,
//       status: "success",
//       duration: 5000,
//       isClosable: true,
//     });

//     // Clear the form
//     setFormData({
//       id: '',
//       name: '',
//       address: '',
//       email: '',
//       phone: ''
//     });
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//       <Card width={{ base: "90%", md: "400px" }} p={5} shadow="md" borderRadius="md">
//         <CardBody>
//           <Heading as="h2" size="lg" textAlign="center" mb={4}>
//             User Data Form
//           </Heading>
//           <form onSubmit={handleSubmit}>
//             <VStack spacing={4}>
//               <FormControl>
//                 <FormLabel>Name</FormLabel>
//                 <Input 
//                   name="name" 
//                   value={formData.name} 
//                   onChange={handleChange} 
//                   required 
//                   placeholder="Enter your name"
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Address</FormLabel>
//                 <Input 
//                   name="address" 
//                   value={formData.address} 
//                   onChange={handleChange} 
//                   required 
//                   placeholder="Enter your address"
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Email</FormLabel>
//                 <Input 
//                   type="email" 
//                   name="email" 
//                   value={formData.email} 
//                   onChange={handleChange} 
//                   required 
//                   placeholder="Enter your email"
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Phone</FormLabel>
//                 <Input 
//                   type="tel" 
//                   name="phone" 
//                   value={formData.phone} 
//                   onChange={handleChange} 
//                   required 
//                   placeholder="Enter your phone number"
//                 />
//               </FormControl>

//               <Button 
//                 type="submit" 
//                 width="full"
//               >
//                 Save
//               </Button>
//             </VStack>
//           </form>
//         </CardBody>
//       </Card>
//     </Box>
//   );
// }

// export default UserDataForm;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserData } from '../store/userSlice';
// import { v4 as uuidv4 } from 'uuid';
// import { 
//   Box, 
//   Button, 
//   Input, 
//   FormLabel, 
//   FormControl, 
//   Heading, 
//   VStack, 
//   useToast, 
//   Card, 
//   CardBody 
// } from '@chakra-ui/react';

// function UserDataForm() {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.user.userData);  // Get all users
//   const toast = useToast();

//   Initialize empty form
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     address: '',
//     email: '',
//     phone: ''
//   });

//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (formData.name || formData.address || formData.email || formData.phone) {
//         e.preventDefault();
//         e.returnValue = '';
//       }
//     };
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     Check for existing email or phone number
//     const existingUser = users.find(
//       (user) => user.email === formData.email || user.phone === formData.phone
//     );

//     if (existingUser) {
//       Show toast error message if email or phone is already taken
//       toast({
//         title: "Hi! We are already connected :)",
//         description: "This email or phone number already exists.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       return;
//     }

//     Generate new user ID
//     const newUser = { ...formData, id: uuidv4() };

//     Save to Redux (push into array)
//     dispatch(setUserData(newUser));

//     Save to Local Storage
//     const updatedUsers = [...users, newUser];  // Get existing users + new one
//     localStorage.setItem('userData', JSON.stringify(updatedUsers));

//     Show confirmation toast
//     toast({
//       title: "User Saved!",
//       description: `Name: ${newUser.name}`,
//       status: "success",
//       duration: 5000,
//       isClosable: true,
//       position: "top",
//     });

//     Clear form after saving
//     setFormData({
//       id: '',
//       name: '',
//       address: '',
//       email: '',
//       phone: ''
//     });
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//       <Card width={{ base: "90%", md: "400px" }} p={5} shadow="md" borderRadius="md" border="2px solid #2a4365">
//         <CardBody>
//           <Heading as="h2" size="lg" textAlign="center" mb={4}>
//             User Data Form
//           </Heading>
//           <form onSubmit={handleSubmit}>
//             <VStack spacing={4}>
//               <FormControl>
//                 <FormLabel>Name</FormLabel>
//                 <Input 
//                   name="name" 
//                   value={formData.name} 
//                   onChange={handleChange} 
//                   required 
//                   placeholder="Enter name" 
//                   border="2px solid #2a4365"  // Dark blue border for input
//                   _focus={{ borderColor: "#319795" }}  // Highlight with dark teal on focus
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Address</FormLabel>
//                 <Input 
//                   name="address" 
//                   value={formData.address} 
//                   onChange={handleChange} 
//                   required 
//                   placeholder="Enter address"
//                   border="2px solid #2a4365"  // Dark blue border for input
//                   _focus={{ borderColor: "#319795" }}  // Highlight with dark teal on focus
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Email</FormLabel>
//                 <Input 
//                   type="email" 
//                   name="email" 
//                   value={formData.email} 
//                   onChange={handleChange} 
//                   required 
//                   placeholder="Enter email" 
//                   border="2px solid #2a4365"  // Dark blue border for input
//                   _focus={{ borderColor: "#319795" }}  // Highlight with dark teal on focus
//                 />
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Phone</FormLabel>
//                 <Input 
//                   type="tel" 
//                   name="phone" 
//                   value={formData.phone} 
//                   onChange={handleChange} 
//                   required 
//                   placeholder="Enter phone" 
//                   border="2px solid #2a4365"  // Dark blue border for input
//                   _focus={{ borderColor: "#319795" }}  // Highlight with dark teal on focus
//                 />
//               </FormControl>

//               <Button 
//                 type="submit" 
//                 width="full" 
//                 backgroundColor="#319795"  // Dark teal button background
//                 color="white" 
//                 _hover={{ backgroundColor: "#2c7a7b" }}  // Hover effect for button
//               >
//                 Save
//               </Button>
//             </VStack>
//           </form>
//         </CardBody>
//       </Card>
//     </Box>
//   );
// }

// export default UserDataForm;



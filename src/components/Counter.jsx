// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { increment, decrement, reset } from '../store/counterSlice';
// import { useSpring, animated } from 'react-spring';
// import { Button, Box } from '@chakra-ui/react';

// function Counter() {
//   const dispatch = useDispatch();
//   const count = useSelector((state) => state.counter.count);

//   Define the background color and trigger the animation based on count value
//   const props = useSpring({
//     background: count > 0
//       ? `linear-gradient(10deg, rgba(25, 25, 112, ${(count / 2)}) 0%, rgba(255, 165, 0, ${(count / 5)}) 100%)`
//       :  `linear-gradient(135deg, rgba(50, 20, 139, 1) 0%, rgba(200, 150, 200, 10) ${Math.abs(count)}%)`,  // Initial dark blue when count is 0
//     config: { tension: 400, friction: 400 },  // Use a quicker transition for responsiveness
//   });

//   Reset function
//   const handleReset = () => {
//     dispatch(reset());  // Reset count to 0
//   };

//   useEffect(() => {
//     You can perform additional side effects here if necessary, but since we're using `useSpring`,
//     this might not be required. The props should update automatically when count changes.
//   }, [count]);

//   return (
//     <animated.div
//       style={{
//         ...props,
//         height: '50vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         transition: 'background 0.2s ease-out',  // Smooth transition for the background
//       }}
//     >
//       <Box textAlign="center" p={5} maxWidth="400px" width="100%">
//       <Box mb={5} fontSize="3xl" color="black">
//           {count}
//         </Box>
//         <Button
//           onClick={() => dispatch(increment())}
//           mb={4}
//           w="100%"
//           colorScheme="blue"
//         >
//           Increment
//         </Button>
//         <Button
//           onClick={() => dispatch(decrement())}
//           mb={4}
//           w="100%"
//           colorScheme="blue"
//         >
//           Decrement
//         </Button>
//         <Button
//           onClick={handleReset}
//           mb={4}
//           w="100%"
//           colorScheme="red"
//         >
//           Reset
//         </Button>
        
//       </Box>
//     </animated.div>
//   );
// }

// export default Counter;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement, reset } from "../store/counterSlice";
// import { useSpring, animated } from "react-spring";
// import { Button, Box } from "@chakra-ui/react";

// function Counter() {
//   const dispatch = useDispatch();
//   const count = useSelector((state) => state.counter.count);

//   // Spring-based background transition
//   const { countSpring } = useSpring({
//     countSpring: count, // Animate based on count
//     config: {
//       mass: 1,
//       tension: 280,
//       friction: 30,
//       clamp: false, // Keeps motion natural
//     },
//   });

//   // Interpolating count into a background gradient
//   const animatedBackground = countSpring.to((val) => {
//     const progress = Math.min(Math.abs(val) / 10, 1); // Normalize between 0 and 1

//     return val > 0
//       ? `linear-gradient(135deg, rgba(25, 25, 112, ${progress}) 0%, rgba(255, 165, 0, ${progress}) 100%)`
//       : `linear-gradient(135deg, rgba(50, 20, 139, 1) 0%, rgba(200, 150, 200, ${progress}))`;
//   });

//   return (
//     <animated.div
//       style={{
//         background: animatedBackground,
//         height: "50vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         transition: "background 0.5s cubic-bezier(0.25, 1, 0.5, 1)", // Bezier transition
//       }}
//     >
//       <Box textAlign="center" p={5} maxWidth="250px" width="100%" >
//         <Button onClick={() => dispatch(increment())} mb={4} w="100%" colorScheme="blue">
//           Increment
//         </Button>
//         <Button onClick={() => dispatch(decrement())} mb={4} w="100%" colorScheme="blue">
//           Decrement
//         </Button>
//         <Button onClick={() => dispatch(reset())} mb={4} w="100%" colorScheme="red">
//           Reset
//         </Button>
//         <Box mt={5} fontSize="3xl" color="white">
//           {count}
//         </Box>
//       </Box>
//     </animated.div>
//   );
// }

// export default Counter;

// import React, { useState } from "react";
// import { useSpring, animated } from "react-spring";
// import { Button, Box } from "@chakra-ui/react";

// function Counter() {
//   const [count, setCount] = useState(0);

//   // Spring-based background transition
// //   const { countSpring } = useSpring({
// //     countSpring: count, // Animate based on count
// //     config: {
// //       mass: 1,
// //       tension: 280,
// //       friction: 30,
// //       clamp: false, // Keeps motion natural
// //     },
// //   });
//   const countSpring = useSpring({ 
//     countSpring: count, 
//     config: { mass: 1, tension: 120, friction: 60, clamp: false }
//   }).countSpring;
  

//   // Interpolating count into a background gradient
//   const animatedBackground = countSpring.to((val) => {
//     const progress = Math.min(Math.abs(val) / 10, 1); // Normalize between 0 and 1

//     return val > 0
//       ? `linear-gradient(135deg, rgba(25, 25, 112, ${progress}) 0%, rgba(255, 165, 0, ${progress}) 100%)`
//       : `linear-gradient(135deg, rgba(50, 20, 139, 1) 0%, rgba(200, 150, 200, ${progress}))`;
//   });

//   return (
//     <animated.div
//       style={{
//         background: animatedBackground,
//         height: "40vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//          // Bezier transition
//       }}
//     >
//       <Box textAlign="center" p={5} maxWidth="250px" width="100%">
//       <Box mb={5} fontSize="3xl" color="white">
//           {count}
//         </Box>
//         <Button onClick={() => setCount(count + 1)} mb={4} w="100%" colorScheme="blue">
//           Increment
//         </Button>
//         <Button onClick={() => setCount(count - 1)} mb={4} w="100%" colorScheme="blue">
//           Decrement
//         </Button>
//         <Button onClick={() => setCount(0)} mb={4} w="100%" colorScheme="red">
//           Reset
//         </Button>
        
//       </Box>
//     </animated.div>
//   );
// }

// export default Counter;

// import React, { useState, useEffect } from "react";
// import { useSpring, animated } from "react-spring";
// import { Button, Box } from "@chakra-ui/react";

// function Counter() {
//   const [count, setCount] = useState(() => {
//     return Number(localStorage.getItem("count")) || 0; // Load from localStorage
//   });

//   useEffect(() => {
//     localStorage.setItem("count", count); // Save count to localStorage on change
//   }, [count]);

//   const countSpring = useSpring({ 
//     countSpring: count, 
//     config: { mass: 1, tension: 120, friction: 60, clamp: false }
//   }).countSpring;

//   const animatedBackground = countSpring.to((val) => {
//     const progress = Math.min(Math.abs(val) / 10, 1); // Normalize between 0 and 1

//     return val > 0
//       ? `linear-gradient(135deg, rgba(25, 25, 112, ${progress}) 0%, rgba(255, 165, 0, ${progress}) 100%)`
//       : `linear-gradient(135deg, rgba(50, 20, 139, 1) 0%, rgba(200, 150, 200, ${progress}))`;
//   });

//   return (
//     <animated.div
//       style={{
//         background: animatedBackground,
//         height: "40vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Box textAlign="center" p={5} maxWidth="250px" width="100%">
//         <Box mb={5} fontSize="3xl" color="white">
//           {count}
//         </Box>
//         <Button onClick={() => setCount(count + 1)} mb={4} w="100%" colorScheme="blue">
//           Increment
//         </Button>
//         <Button onClick={() => setCount(count - 1)} mb={4} w="100%" colorScheme="blue">
//           Decrement
//         </Button>
//         <Button onClick={() => setCount(0)} mb={4} w="100%" colorScheme="red">
//           Reset
//         </Button>
//       </Box>
//     </animated.div>
//   );
// }

// export default Counter;

import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Button, Box } from "@chakra-ui/react";

function Counter() {
  const [count, setCount] = useState(0); // No need for localStorage

  const countSpring = useSpring({ 
    countSpring: count, 
    config: { mass: 1, tension: 120, friction: 60, clamp: false }
  }).countSpring;

  const animatedBackground = countSpring.to((val) => {
    const progress = Math.min(Math.abs(val) / 10, 1);

    return val > 0
      ? `linear-gradient(135deg, rgba(25, 25, 112, ${progress}) 0%, rgba(255, 165, 0, ${progress}) 100%)`
      : `linear-gradient(135deg, rgba(50, 20, 139, 1) 0%, rgba(200, 150, 200, ${progress}))`;
  });

  return (
    <animated.div
      style={{
        background: animatedBackground,
        height: "40vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box textAlign="center" p={5} maxWidth="250px" width="100%">
        <Box mb={5} fontSize="3xl" color="white">
          {count}
        </Box>
        <Button onClick={() => setCount(count + 1)} mb={4} w="100%" colorScheme="blue">
          Increment
        </Button>
        <Button onClick={() => setCount(count - 1)} mb={4} w="100%" colorScheme="blue">
          Decrement
        </Button>
        <Button onClick={() => setCount(0)} mb={4} w="100%" colorScheme="red">
          Reset
        </Button>
      </Box>
    </animated.div>
  );
}

export default Counter;


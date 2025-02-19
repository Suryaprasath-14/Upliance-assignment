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
      ? `linear-gradient(135deg, rgba(25, 25, 112, 1) 0%, rgba(255, 165, 0, ${progress}) )`
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


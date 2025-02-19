// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Box } from '@chakra-ui/react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// import Counter from '../components/Counter';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function Dashboard() {
//   const userData = useSelector((state) => state.user.userData);

//   const data = {
//     labels: Object.keys(userData),
//     datasets: [
//       {
//         label: 'User Data',
//         data: Object.values(userData).map((value) => (typeof value === 'string' ? value.length : 0)),
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <Box p={5}>
      
      
     
//       <Counter/>
//       <Bar data={data} />
//     </Box>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Counter from "../components/Counter";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  if (!userData) {
    return <Box p={4}>
         <Heading size="md" mb={3}> Counter</Heading>
        <Counter/> 
        <Heading size="md" textAlign="center" mt={4}  >No user data available.Please fill the form.</Heading>
        </Box>
  }

  const { name, email, address, phone } = userData;

  // Bar Chart: Field Lengths
  const barData = {
    labels: ["Name", "Email", "Address", "Phone"],
    datasets: [
      {
        label: "Character Length",
        data: [name?.length || 0, email?.length || 0, address?.length || 0, phone?.length || 0],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  // **Teal Grid Lines for Bar Chart**
  const barOptions = {
    scales: {
      x: {
        grid: {
          color: "teal", // **Teal grid lines**
        },
      },
      y: {
        grid: {
          color: "teal", // **Teal grid lines**
        },
      },
    },
  };

  // Pie Chart: Data Distribution
  const totalLength = (name?.length || 0) + (email?.length || 0) + (address?.length || 0) + (phone?.length || 0);
  const pieData = {
    labels: ["Name", "Email", "Address", "Phone"],
    datasets: [
      {
        data: [
          (name?.length / totalLength) * 100 || 0,
          (email?.length / totalLength) * 100 || 0,
          (address?.length / totalLength) * 100 || 0,
          (phone?.length / totalLength) * 100 || 0,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
      },
    ],
  };

  return (
    <Box p={4}>
      <Heading size="md" mb={3}>
        Counter
      </Heading>

      {/* Counter Component */}
      <Counter />

      <Heading size="md" mt={8} mb={6}>
        User Dashboard
      </Heading>
      {/* Compact Grid Layout */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={4}>
        <Box maxW="600px">
          <Heading size="sm" mb={2}>
            Field Data Lengths:
          </Heading>
          <Bar data={barData} options={barOptions} height={220} />
        </Box>

        <Box maxW="450px">
          <Heading size="sm" mb={2}>
            User Data Contribution:
          </Heading>
          <Pie data={pieData}  height={150} />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;

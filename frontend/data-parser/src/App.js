import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dasboard from "./page/Dashboard";
import Home from "./page/Home";
import Navbar from "./component/Navbar";
import {
  ChakraBaseProvider,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import Dashboard from "./page/Dashboard";
import Result from "./page/Result";
import Display from "./page/Display";
import Login from "./component/Login";


const theme = extendTheme({
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: "36px",
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: "24px",
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
});

function App() {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { colorScheme: "teal" } }}
    >
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/search/:query/:type" element={<Result />} />
          <Route exact path="/data/:ownerId/:addressId" element={<Display />} />
          <Route exact path="/data/:ownerId/" element={<Display />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

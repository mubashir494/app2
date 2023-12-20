import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";

const Home = () => {
  const navigate = useNavigate();
  const [value, setvalue] = useState(null);
  const [type,setType] = useState("Street");
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      mt={"90px"}
      p={8}
      color={"teal"}
      textStyle="h1"
      textAlign={"center"}
    >
      Address Seach Engine
      <InputGroup mt={"10"} mb={"0px"} w={"50%"}>
        <InputLeftAddon children={<SearchIcon />} />
        <Input
          onChange={(e) => setvalue(e.target.value)}
          type="text"
          placeholder="Search Address"
        />
        <InputRightElement
          w={"15%"}
          children={
            <>
              <Select
                placeholder="Select"
                defaultValue={"Street"}
                variant={"filled"}
                onChange={(e) =>{setType(e.target.value)}}

              >
                <option value="Street">Street</option>
                <option value="zipCode">Zip Code</option>
              </Select>
            </>
          }
        />
      </InputGroup>
      <Button
        leftIcon={<SearchIcon />}
        mt={"50px"}
        colorScheme="teal"
        variant="solid"
        onClick={() => {
          navigate(`/search/${value}/${type}`);
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default Home;

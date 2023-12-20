import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Spinner, useToast } from "@chakra-ui/react";
import AddressForm from "../component/AddressForm";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import OwnershipForm from "../component/OwnershipForm";
import { getData, deleteCounty } from "../api/data";
import CountyForm from "../component/CountyForm";

const Dashboard = () => {
  const [counties, setCounties] = useState([]);
  const toast = useToast();
  const [load,setload] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const Fetch = async () => {
    try {
      const county = await getData();
      setCounties(county.data);
    } catch (e) {
      if (e.response.data.message) {
        toast({ title: e.response.data.message });
      } else {
        toast({ title: e.message });
      }
    }
  };

  const delCounty = async (id) => {
    setload(true);
    deleteCounty({ id })
      .then((res) => {
        toast({ title: res.data.message });
        Fetch();
        setload(false)
      })
      .catch((err) => {
        setload(false)
        toast({ title: err.message });
      });
  };
  useEffect(() => {
    Fetch();
  }, []);

  return (
    <>

    {
      load == true ?
      <Spinner/>
      :
      <>
        <Box p={10}>
          <Flex
            as="span"
            flex="1"
            color="teal"
            textAlign="left"
            textStyle="h1"
            mx={4}
            >
            Stored County Data
            <Spacer />
            <Button onClick={onOpen} colorScheme="teal" variant="solid">
              <AddIcon />
            </Button>
          </Flex>
  
          <Accordion allowToggle allowMultiple marginY={5}>
            {counties.length > 0 ? (
              counties.map((element) => {
                return (
                  <AccordionItem
                  borderTopColor={"teal"}
                    borderBottomColor={"teal"}
                    >
                    <h2>
                      <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                        <Box as="span" flex="1" textAlign="left" textStyle="h2">
                          {element.name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Grid templateColumns="repeat(2, 5fr)" my={"10px"}>
                        <GridItem w="100%">
                          <OwnershipForm county={element} fetch={Fetch} />
                        </GridItem>
                        <GridItem w="100%">
                          <AddressForm county={element} fetch={Fetch} />
                        </GridItem>
                      </Grid>
                      <Button
                        mx={"2px"}
                        mt={4}
                        colorScheme="teal"
                        onClick={() => {
                        
                          delCounty(element.id);
                        }}
                      >
                        Delete
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })
            ) : (
              <h1>No County Data</h1>
            )}
          </Accordion>
        </Box>
        <CountyForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </>
    }
    </>
  );
};
export default Dashboard;

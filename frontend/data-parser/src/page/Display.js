import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Heading,
  Box,
  List,
  ListItem,
  Text,
  Divider,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import { getOwnerById } from "../api/data";
import Fttx from "../component/Fttx";
import Dsl from "../component/Dsl";
import Etherlink from "../component/Etherlink";
import Wireless from "../component/Wireless";

const Display = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [obj, setObj] = useState(null);
  const [load, setLoad] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const ownerId = param.ownerId;
    const addressId = param.addressId;
    fetchData(ownerId, addressId);
  }, []);

  const fetchData = (ownerId, addressId) => {
    setLoad(true);
    getOwnerById({ ownerId: ownerId, addressId: addressId })
      .then((res) => {
        console.log(res.data);
        setObj(res.data);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.message) {
          toast({ title: e.response.data.message });
        } else {
          toast({ title: e.message });
        }
        setLoad(false);
      });
  };
  return (
    <>
      {load == true ? (
        <Center mt={5}>
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <Box p={10} ml={10}>
          <Heading color={"teal"} textStyle="h1" size="xl">
            {obj && obj.street ? obj.street : <></>}
          </Heading>
          <Text color={"teal"} size={"md"}>
            {obj && obj.addresscsz ? obj.addresscsz : <></>}
          </Text>

          <Heading color={"teal"} mt={19} size="lg">
            Owner Details
          </Heading>
          <Divider mt={"10px"} />
          <List mt={"10px"} spacing={2}>
            <ListItem fontSize={20}>
              <Text
                fontSize={20}
                color={"teal"}
                as={"span"}
                fontWeight={"bold"}
              >
                Owner Name :
              </Text>{" "}
              {obj && obj.name ? obj.name : <></>}
            </ListItem>
            <ListItem fontSize={20}>
              <Text
                fontSize={20}
                color={"teal"}
                as={"span"}
                fontWeight={"bold"}
              >
                Mailing Address :
              </Text>{" "}
              {obj && obj.mailing ? obj.mailing : <></>}
            </ListItem>
            <ListItem fontSize={20}>
              <Text
                fontSize={20}
                color={"teal"}
                as={"span"}
                fontWeight={"bold"}
              >
                Zip Code :
              </Text>{" "}
              {obj && obj.postalCode ? obj.postalCode : <></>}
            </ListItem>
            <ListItem fontSize={20}>
              <Text
                fontSize={20}
                color={"teal"}
                as={"span"}
                fontWeight={"bold"}
              >
                Property Type :
              </Text>{" "}
              {obj && obj.type ? obj.type : <></>}
            </ListItem>
          </List>

          {obj && obj.address ? (
            <>
              <Heading color={"teal"} mt={19} size="lg">
                Address Details
              </Heading>
              <Divider mt={"10px"} />
              <List>
                <ListItem fontSize={20}>
                  <Text
                    fontSize={20}
                    color={"teal"}
                    as={"span"}
                    fontWeight={"bold"}
                  >
                    Street :
                  </Text>{" "}
                  {obj && obj.address.street ? obj.address.street : <></>}
                </ListItem>
                <ListItem fontSize={20}>
                  <Text
                    fontSize={20}
                    color={"teal"}
                    as={"span"}
                    fontWeight={"bold"}
                  >
                    City :
                  </Text>{" "}
                  {obj && obj.address.city ? obj.address.city : <></>}
                </ListItem>
                <ListItem fontSize={20}>
                  <Text
                    fontSize={20}
                    color={"teal"}
                    as={"span"}
                    fontWeight={"bold"}
                  >
                    Zip code :
                  </Text>{" "}
                  {obj && obj.address.postalCode ? (
                    obj.address.postalCode
                  ) : (
                    <></>
                  )}
                </ListItem>
              </List>
            </>
          ) : (
            <Heading color={"teal"} mt={19} size="lg">
              Address Detail Not available
            </Heading>
          )}
          <Heading color={"teal"} mt={19} size="lg">
            Customers
          </Heading>

          <Accordion allowMultiple>
            {obj && obj.customer && obj.customer.length > 0 ? (
              <>
                {obj.customer.map((element, index) => {
                  return (
                    <AccordionItem borderTopColor={"teal"}
                    borderBottomColor={"teal"}>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            textStyle="h2"
                          >
                            {`Customer ${index + 1}`}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel>
                        <List>
                          <ListItem fontSize={20}>
                            <Text
                              fontSize={20}
                              color={"teal"}
                              as={"span"}
                              fontWeight={"bold"}
                            >
                              Name :
                            </Text>{" "}
                            {element && element.name ? element.name : <></>}
                          </ListItem>

                          <ListItem fontSize={20}>
                            <Text
                              fontSize={20}
                              color={"teal"}
                              as={"span"}
                              fontWeight={"bold"}
                            >
                              Address :
                            </Text>{" "}
                            {element && element.addr1 ? element.addr1 : <></>}
                          </ListItem>

                          <ListItem fontSize={20}>
                            <Text
                              fontSize={20}
                              color={"teal"}
                              as={"span"}
                              fontWeight={"bold"}
                            >
                              Contact :
                            </Text>{" "}
                            {element && element.contact ? (
                              element.contact
                            ) : (
                              <></>
                            )}
                          </ListItem>
                          <ListItem fontSize={20}>
                            <Text
                              fontSize={20}
                              color={"teal"}
                              as={"span"}
                              fontWeight={"bold"}
                            >
                              email :
                            </Text>{" "}
                            {element && element.email ? element.email : <></>}
                          </ListItem>
                          <ListItem fontSize={20}>
                            <Text
                              fontSize={20}
                              color={"teal"}
                              as={"span"}
                              fontWeight={"bold"}
                            >
                              Active :
                            </Text>{" "}
                            {element && element.active ? element.active : <></>}
                          </ListItem>
                          <ListItem fontSize={20}>
                            <Text
                              fontSize={20}
                              color={"teal"}
                              as={"span"}
                              fontWeight={"bold"}
                            >
                              Close out Date :
                            </Text>{" "}
                            {element && element.closeoutdate ? (
                              element.closeoutdate
                            ) : (
                              <></>
                            )}
                          </ListItem>
                          <ListItem fontSize={20}>
                            <Text
                              fontSize={20}
                              color={"teal"}
                              as={"span"}
                              fontWeight={"bold"}
                            >
                              Phone no :
                            </Text>{" "}
                            {element && element.phone ? element.phone : <></>}
                          </ListItem>
                        </List>
                        <Box textStyle="h2" mt="10px">
                          Services
                        </Box>

                        {element.fttx_data && element.fttx_data.length > 0 ? (
                          element.fttx_data.map((element) => {
                            return <Fttx element={element} />;
                          })
                        ) : (
                          <></>
                        )}

                        {element.dsl_data && element.dsl_data.length > 0 ? (
                          element.dsl_data.map((element) => {
                            return <Dsl element={element} />;
                          })
                        ) : (
                          <></>
                        )}
                        {element.etherlink_data &&
                        element.etherlink_data.length > 0 ? (
                          element.etherlink_data.map((element) => {
                            return <Etherlink element={element} />;
                          })
                        ) : (
                          <></>
                        )}

                        {element.wireless_data &&
                        element.wireless_data.length > 0 ? (
                          element.wireless_data.map((element) => {
                            return <Wireless element={element} />;
                          })
                        ) : (
                          <></>
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </Accordion>
        </Box>
      )}
    </>
  );
};

export default Display;

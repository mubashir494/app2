import { List,Box,ListItem,Text } from "@chakra-ui/react";
import React from "react";
const Etherlink = ({ element }) => {
  return (
    <List>
       <Box textStyle="h2" color={"teal"} mt={3}>Etherlink  </Box>
      <ListItem fontSize={20}>
        <Text fontSize={20} color={"teal"} as={"span"} fontWeight={"bold"}>
          Speed :
        </Text>{" "}
        {element && element.speed ? element.speed : <></>}
      </ListItem>
      <ListItem fontSize={20}>
        <Text fontSize={20} color={"teal"} as={"span"} fontWeight={"bold"}>
          Customer Type :
        </Text>{" "}
        {element && element.customertype? element.customertype : <></>}
      </ListItem>
    </List>
  );
};
export default Etherlink
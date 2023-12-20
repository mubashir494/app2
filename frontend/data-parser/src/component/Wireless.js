import { List,Box,ListItem,Text } from "@chakra-ui/react";
import React from "react";
const Wireless = ({ element }) => {
  return (
    <List>
       <Box textStyle="h2" color={"teal"} mt={3}>DSL</Box>
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
        {element && element.statusvalue? element.statusvalue : <></>}
      </ListItem>
      
    </List>
  );
};
export default Wireless 
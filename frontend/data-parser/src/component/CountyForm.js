import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { createCounty } from "../api/data";

const CountyForm = ({ isOpen, onOpen, onClose }) => {
  const [input, setInput] = useState(null);
  const toast = useToast();
  const submit = () => {
    if (input) {
      createCounty({ name: input })
        .then((res) => {
          window.location.reload();
          toast({ title: "Success" });
          onClose();
        })
        .catch((err) => {
          if (err.res.data.message) {
            toast({ title: err.res.data.message });
          } else {
            toast({ title: err.message });
          }
          onClose();
        });
    } else {
      toast({ title: "Please fill the name field" });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new County</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>County name</FormLabel>
            <Input
              placeholder="Name"
              onChange={(e) => setInput(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={submit}>
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CountyForm;

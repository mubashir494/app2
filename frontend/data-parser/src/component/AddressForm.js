import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Select,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  deleteAddress,
  uploadAddress,
  getFieldAddress,
  parseAddress,
} from "../api/data";

const AddressForm = ({ county, fetch }) => {
  const toast = useToast();
  const [addressLoad, setaddressLoad] = useState(false);
  const [fields, setFields] = useState([]);
  const [obj, setobj] = useState({});
  const [load, setLoad] = useState(false);

  const reset = async (e) => {
    if (county.id) {
      setLoad(true);
      deleteAddress({ id: county.id })
        .then((res) => {
          toast({ title: res.data.message });
          fetch();
          setLoad(false);
        })
        .catch((error) => {
          if (error.response.data.message) {
            toast({ title: error.response.data.message });
          } else {
            toast({ title: error.message });
          }
          fetch();
          setLoad(false);
        });
    }
  };

  const upload = async (e) => {
    if (county.id) {
      const form = new FormData();
      form.append("address", e.target.files[0]);
      console.log(e.target.files[0]);
      form.append("id", county.id);
      setaddressLoad(true);
      uploadAddress(form)
        .then((res) => {
          fetch();
          setaddressLoad(false);
          toast({ title: res.data.message });
        })
        .catch((error) => {
          if (error.response.data.message) {
            toast({ title: error.response.data.message });
          } else {
            toast({ title: error.message });
          }
          fetch();
          setaddressLoad(false);
        });
    }
  };

  const getAddressFields = () => {
    if (county.addressFile) {
      getFieldAddress({ id: county.id })
        .then((res) => {
          console.log(res.data.fields);
          setFields(res.data.fields);
        })
        .catch((error) => {
          toast({ title: error.message });
        });
    }
  };

  useEffect(() => {
    getAddressFields();
  }, [county]);



  const submit = () => {
    let obj2 = {}
    Object.keys(obj).map((element) =>{ 
      if(obj[element] != ''){
        obj2[element] = obj[element]
      }
    })
    setLoad(true);
    parseAddress({ id: county.id, addressFields: obj2 })
      .then((res) => {
        fetch();
        setLoad(false);
        toast({ title: res.data.message });
      })
      .catch((err) => {
        fetch();
        setLoad(false);
        if (err.response.data.message) {
          toast({ title: err.response.data.message });
        } else {
          toast({ title: err.message });
        }
      });
  };
  return load == true ? (
    <Spinner size="xl" />
  ) : (
    <>
      <form action="">
        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          {county.addressFile == true ? (
            <FormHelperText>Uploaded</FormHelperText>
          ) : addressLoad == true ? (
            <Spinner size="sm" />
          ) : (
            <Input
              type="file"
              onChange={(e) => {
                upload(e);
              }}
              border={"none"}
            />
          )}
        </FormControl>

        {county.addressFile == false || county.addresses == true ? (
          <></>
        ) : (
          <>
            <FormControl isRequired>
              <FormLabel>Street Address</FormLabel>

              <Select
                w={"80%"}
                placeholder="Select Field"
                onChange={(e) => {
                  setobj({ ...obj, street: e.target.value });
                }}
              >
                {fields.length > 0 ? (
                  fields.map((element) => {
                    return <option value={element}>{element}</option>;
                  })
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
            
            <FormControl my={"10px"} isRequired>
              <FormLabel>City</FormLabel>
              <Select
                w={"80%"}
                placeholder="Select Field"
                onChange={(e) => {
                  setobj({ ...obj, city: e.target.value });
                }}
              >
                {fields.length > 0 ? (
                  fields.map((element) => {
                    return <option value={element}>{element}</option>;
                  })
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
            <FormControl my={"10px"} isRequired>
              <FormLabel>Zip</FormLabel>
              <Select
                w={"80%"}
                placeholder="Select Field"
                onChange={(e) => {
                  setobj({ ...obj, postalCode: e.target.value });
                }}
              >
                {fields.length > 0 ? (
                  fields.map((element) => {
                    return <option value={element}>{element}</option>;
                  })
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
          </>
        )}

        {county.addressFile == true && county.addresses == true ? (
          <Button
            mt={4}
            colorScheme="teal"
            onClick={(e) => {
              reset(e);
            }}
          >
            Reset
          </Button>
        ) : county.addressFile == true && county.addresses == false ? (
          <>
            <Button
              mt={4}
              colorScheme="teal"
              onClick={(e) => {
                reset(e);
              }}
            >
              Reset
            </Button>
            <Button mx={"5px"} mt={4} colorScheme="teal" onClick={submit}>
              Save
            </Button>
          </>
        ) : (
          <></>
        )}
      </form>
    </>
  );
};

export default AddressForm;

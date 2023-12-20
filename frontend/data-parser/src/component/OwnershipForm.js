import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Select,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  deleteOwnership,
  getFieldOwner,
  parseOwnership,
  uploadOwnership,
} from "../api/data";
import { useState, useEffect } from "react";

const OwnershipForm = ({ county, fetch }) => {
  const toast = useToast();
  const [ownerLoad, setownerLoad] = useState(false);
  const [fields, setFields] = useState([]);
  const [obj, setobj] = useState({});
  const [load, setLoad] = useState(false);

  const reset = async (e) => {
    if (county.id) {
      setLoad(true);
      deleteOwnership({ id: county.id })
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
      form.append("ownership", e.target.files[0]);
      console.log(e.target.files[0]);
      form.append("id", county.id);
      setownerLoad(true);
      uploadOwnership(form)
        .then((res) => {
          fetch();
          setownerLoad(false);
          toast({ title: res.data.message });
        })
        .catch((error) => {
          if (error.response.data.message) {
            toast({ title: error.response.data.message });
          } else {
            toast({ title: error.message });
          }
          fetch();
          setownerLoad(false);
        });
    }
  };
  const filter = (input) => {
    if (input == "") {
      return null;
    } else {
      return input;
    }
  };
  const getOwnerFields = () => {
    if (county.ownerFile) {
      getFieldOwner({ id: county.id })
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
    getOwnerFields();
  }, [county]);

  useEffect(() => {
    console.log(obj);
  }, [obj]);
  const submit = () => {
    let obj2 = {};
    Object.keys(obj).map((element) => {
      if (obj[element] != "") {
        obj2[element] = obj[element];
      }
    });
    setLoad(true);
    parseOwnership({ id: county.id, ownershipFields: obj2 })
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
      <FormControl isRequired>
        <FormLabel>Ownership Data</FormLabel>
        {county.ownerFile == true ? (
          <FormHelperText>Uploaded</FormHelperText>
        ) : ownerLoad == true ? (
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

      {county.ownerFile == false || county.Owner == true ? (
        <></>
      ) : (
        <>
          <FormControl isRequired>
            <FormLabel>Ownername</FormLabel>
            <Select
              w={"80%"}
              placeholder="Select Field"
              onChange={(e) => {
                setobj({ ...obj, name: e.target.value });
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
          <FormControl my={"10px"}>
            <FormLabel>Mailing Address</FormLabel>
            <Select
              w={"80%"}
              placeholder="Select Field"
              onChange={(e) => {
                setobj({ ...obj, mailing: e.target.value });
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
          <FormControl my={"10px"}>
            <FormLabel>Adresscsz</FormLabel>
            <Select
              w={"80%"}
              placeholder="Select Field"
              onChange={(e) => {
                setobj({ ...obj, addresscsz: e.target.value });
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
            <FormHelperText>Ex : GREEN RIVER, WY 82935-5507</FormHelperText>
          </FormControl>

          <FormControl my={"10px"}>
            <FormLabel>Property Type</FormLabel>
            <Select
              w={"80%"}
              placeholder="Select Field"
              onChange={(e) => {
                setobj({ ...obj, type: e.target.value });
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
          <FormControl my={"10px"}>
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

      {county.ownerFile == true && county.Owner == true ? (
        <Button
          mt={4}
          colorScheme="teal"
          onClick={(e) => {
            reset(e);
          }}
        >
          Reset
        </Button>
      ) : county.ownerFile == true && county.Owner == false ? (
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
    </>
  );
};

export default OwnershipForm;

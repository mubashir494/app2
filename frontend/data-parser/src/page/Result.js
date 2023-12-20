import React, { useEffect, useState } from "react";
import { resolvePath, useNavigate, useParams } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Button,
  Select,
  Box,
  Stack,
  Heading,
  Text,
  StackDivider,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import "../style/pagination.css";
import ReactPaginate from "react-paginate";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { search, searchZip } from "../api/data";

const Result = () => {
  const SIZE = 10;
  const param = useParams();
  const [query, setquery] = useState(param.query);
  const [result, setResult] = useState(null);
  const [load, setLoad] = useState(false);
  const [searchType, setSearchType] = useState(param.type);
  const [totalPages, settotalPages] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  const handlePageChange = (e) => {
    searchData(searchTerm, e.selected + 1, SIZE);
  };

  const searchData = (query, page, size) => {
    setLoad(true);
    if (searchType == "zipCode") {
      searchZip({ query: query }, page, size)
        .then((res) => {
          setSearchTerm(query);
          setResult(res.data.result);
          setLoad(false);
          settotalPages(res.data.totalPages);
          setCurrentPage(page);
        })
        .catch((e) => {
          if (e.res.data.message) {
            toast({ title: e.res.data.message });
          } else {
            toast({ title: e.message });
          }
        });
    } else {
      search({ query: query }, page, size)
        .then((res) => {
          setSearchTerm(query);
          setResult(res.data.result);
          settotalPages(res.data.totalPages);
          setLoad(false);
          setCurrentPage(page);
        })
        .catch((err) => {
          if (err.res.data) {
            toast({ title: err.res.data.message });
          } else {
            toast({ title: err.message });
          }
        });
    }
  };

  useEffect(() => {
    searchData(param.query, 1, 10);
  }, []);

  return (
    <>
      <Box display={"flex"} p={5} ml={5}>
        <InputGroup mt={"10"} mb={"0px"} w={"50%"}>
          <InputLeftAddon children={<SearchIcon />} />
          <Input
            value={query}
            onChange={(e) => {
              setquery(e.target.value);
            }}
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
                  value={searchType}
                  onChange={(e) => {
                    setSearchType(e.target.value);
                  }}
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
          mt={"40px"}
          ml={"20px"}
          colorScheme="teal"
          variant="solid"
          onClick={() => {
            navigate(`/search/${query}/${searchType}`)
            searchData(query, 1, SIZE);
          }}
        >
          Search
        </Button>
      </Box>
      <Box p={5} ml={5}>
        {load == true ? (
          <Center>
            <Spinner size="xl" />

          </Center>
        ) : (
          <Card>
            {result != null ? (
              <CardHeader>
                <Heading size="xl">{`No of Page: ${totalPages}`}</Heading>
              </CardHeader>
            ) : (
              <CardHeader>
                <Heading size="xl">{`Search Result`}</Heading>
              </CardHeader>
            )}

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {result != null ? (
                  result.map((element) => {
                    return (
                      <Box>
                        <Heading
                          cursor={"pointer"}
                          onClick={() => {
                            element && element.addressId
                              ? navigate(
                                  `/data/${element.id}/${element.addressId}`
                                )
                              : navigate(`/data/${element.id}/`);
                          }}
                          size="md"
                          textTransform="uppercase"
                        >
                          {element.street}
                        </Heading>
                        <Text pt="2" color="teal" fontSize="md">
                          {element.addresscsz ? element.addresscsz : <></>}
                        </Text>
                      </Box>
                    );
                  })
                ) : (
                  <></>
                )}
              </Stack>
            </CardBody>
          </Card>
        )}
      </Box>
      <Center>
        {totalPages && totalPages > 1 ? (
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        ) : (
          <></>
        )}
      </Center>
    </>
  );
};

export default Result;

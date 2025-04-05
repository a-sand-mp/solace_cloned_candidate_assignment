"use client";

import { Advocate, advocates } from "@/db/schema";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

export default function Home() {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [queryValue, setQueryValue] = useState<string | null>(null);
  const [selectedAdvocate, setSelectedAdvocate] = useState<Advocate | null>(
    null
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const advocateRequest = () => {
    console.log("fetching advocates...");
    fetch(
      queryValue === null
        ? "/api/advocates"
        : `/api/advocates?filter=${queryValue.toLowerCase()}`
    ).then((response) => {
      response.json().then((jsonResponse) => {
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  };

  const insertAdvocate = () => {
    if (selectedAdvocate !== null) {
      fetch("/api/advocates", {
        method: "POST",
        body: JSON.stringify({
          ...selectedAdvocate,
        }),
      }).then((resp) => {
        resp.json().then(() => {
          advocateRequest();
          toggle();
        });
      });
    }
  };

  const setAdvocateSelection = (advocate: Advocate) => {
    setSelectedAdvocate(advocate);
    toggle();
  };

  const addAdvocate = () => {
    setSelectedAdvocate(null);
    toggle();
  };

  const updateAdvocate = (propertyName: string, value: any) => {
    //const updatedAdvocate = {...selectedAdvocate}
    if (selectedAdvocate === null) {
      const newAdvocate: Advocate = {
        id: null,
        firstName: null,
        lastName: null,
        city: null,
        degree: null,
        yearsOfExperience: null,
        phoneNumber: null,
        specialties: [],
      };
      const udpatedNewAdvocate = { ...newAdvocate, [propertyName]: value };
      setSelectedAdvocate(udpatedNewAdvocate);
    } else {
      setSelectedAdvocate({ ...selectedAdvocate, [propertyName]: value });
    }
  };

  useEffect(() => {
    advocateRequest();
  }, [queryValue]);

  return (
    <>
      <Container fluid>
        <Row className="mt-2">
          <Col>
            <h3 className="display-3">Solace - Advocates</h3>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Card className="solace_border">
              <CardBody>
                <CardTitle>
                  <Row>
                    <Col xs={5} sm={5} md={3} lg={2} xl={2}>
                      <Input
                        placeholder={"Search Advocate"}
                        onChange={(e) => {
                          setQueryValue(e?.target?.value ?? null);
                        }}
                      />
                    </Col>
                    <Col xs={3} sm={3} md={2} lg={2} xl={1} className="p-1">
                      Results: {filteredAdvocates.length}
                    </Col>
                    <Col xs={1} sm={1} md={2} lg={7} xl={7}></Col>
                    <Col xs={5} sm={5} md={3} lg={2} xl={2}>
                      {isAdmin && (
                        <Button
                          className="solace"
                          block
                          onClick={() => addAdvocate()}
                        >
                          Add Advocate
                        </Button>
                      )}
                    </Col>
                  </Row>
                </CardTitle>
                <div style={{ height: "500px" }}>
                  <Table
                    // borderless
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <thead style={{ display: "block" }}>
                      <tr style={{ display: "flex" }}>
                        <th style={{ flex: "1" }}>First Name</th>
                        <th style={{ flex: "1" }}>Last Name</th>
                        <th style={{ flex: "1" }}>City</th>
                        <th style={{ flex: "1" }}>Degree</th>
                        {/* <th style={{ flex: "1" }}>Specialties</th> */}
                        <th style={{ flex: "1" }}>Years of Experience</th>
                        <th style={{ flex: "1" }}>Phone Number</th>
                        <th style={{ flex: "1" }}>Option</th>
                      </tr>
                    </thead>
                    <tbody style={{ display: "block", overflowX: "auto" }}>
                      {(filteredAdvocates ?? []).map((advocate, index) => {
                        return (
                          <tr style={{ display: "flex" }} key={index}>
                            <td style={{ flex: "1" }}>{advocate.firstName}</td>
                            <td style={{ flex: "1" }}>{advocate.lastName}</td>
                            <td style={{ flex: "1" }}>{advocate.city}</td>
                            <td style={{ flex: "1" }}>{advocate.degree}</td>
                            {/* <td style={{ flex: "1" }}>
                              {advocate.specialties.map((s) => (
                                <div>{s}</div>
                              ))}
                            </td> */}
                            <td style={{ flex: "1" }}>
                              {advocate.yearsOfExperience}
                            </td>
                            <td style={{ flex: "1" }}>
                              {advocate.phoneNumber}
                            </td>
                            <td style={{ flex: "1" }}>
                              <Button
                                className="solace"
                                block
                                onClick={() => setAdvocateSelection(advocate)}
                              >
                                Details
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {selectedAdvocate === null ? (
            <h5>Let's add an Advocate</h5>
          ) : (
            `${selectedAdvocate?.firstName}'s Details`
          )}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <Input
                placeholder={"First Name"}
                defaultValue={selectedAdvocate?.firstName ?? ""}
                onChange={(e) => {
                  updateAdvocate("firstName", e?.target?.value ?? "");
                }}
              />
            </Col>
            <Col md={6}>
              <Input
                placeholder={"Last Name"}
                defaultValue={selectedAdvocate?.lastName ?? ""}
                onChange={(e) => {
                  updateAdvocate("lastName", e?.target?.value ?? "");
                }}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <Input
                placeholder={"City"}
                defaultValue={selectedAdvocate?.city ?? ""}
                onChange={(e) => {
                  updateAdvocate("city", e?.target?.value ?? "");
                }}
              />
            </Col>
            <Col md={6}>
              <Input
                placeholder={"Degree"}
                defaultValue={selectedAdvocate?.degree ?? ""}
                onChange={(e) => {
                  updateAdvocate("degree", e?.target?.value ?? "");
                }}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <Input
                placeholder={"Years of Experience"}
                defaultValue={selectedAdvocate?.yearsOfExperience ?? ""}
                onChange={(e) => {
                  updateAdvocate("yearsOfExperience", e?.target?.value ?? "");
                }}
              />
            </Col>
            <Col md={6}>
              <Input
                placeholder={"Phone Number"}
                defaultValue={selectedAdvocate?.phoneNumber ?? ""}
                onChange={(e) => {
                  updateAdvocate("phoneNumber", e?.target?.value ?? "");
                }}
              />
            </Col>
          </Row>

          <hr />
          <Row>
            <Col>
              {selectedAdvocate === null ? (
                <h5>Select Specialties</h5>
              ) : (
                <h5>{selectedAdvocate?.firstName ?? ""}'s Specialties</h5>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                {selectedAdvocate?.specialties.map((spec) => {
                  return <ListGroupItem>{spec}</ListGroupItem>;
                })}
              </ListGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            className="solace"
            onClick={() =>
              window.open(
                "https://youtu.be/dQw4w9WgXcQ?si=OH8XIXP9wgx7qkOR&t=43",
                "_blank"
              )
            }
          >
            Chat with {selectedAdvocate?.firstName ?? ""} Live
          </Button>
          {isAdmin && (
            <Button className="solace" onClick={() => insertAdvocate()}>
              Insert Advocate
            </Button>
          )}

          <Button className="solace_border" color={"white"} onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Row className="mt-5 m-1">
        <Col>
          <Button color="danger" onClick={() => setIsAdmin(true)}>
            Secret Admin Button - DO NOT PUSH
          </Button>
        </Col>
      </Row>
    </>
  );
}

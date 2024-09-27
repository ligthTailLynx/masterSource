import React from "react";
import { Button, Tab, Form, Row, Col, Nav } from "react-bootstrap";
import "./App.css";
import CSS from "csstype";

import NFTCard from "./component/NFTCard";
import AddressField from "./component/AddressField";
import FileManager from "./component/fileManager";
import WebDrei from "./webDreiClient";

import headerImage from "./data/headerImage_medium.jpg";
import backgroundImage from "./data/backgroundImage_large.jpg";

const mintNFT_sol = (metaURL: string) => {
  console.log(metaURL);
  fetch("http://192.168.0.126:9001/solMintNFT", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ metaURL }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(JSON.stringify(res));
    })
    .catch((error) => {
      console.log(error);
    });
};

const mintNFT_eth = (metaURL: string) => {
  console.log(metaURL);
  fetch("http://192.168.0.126:9001/ethMintNFT", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ metaURL }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(JSON.stringify(res));
    })
    .catch((error) => {
      console.log(error);
    });
};

function App() {
  const styleHead: CSS.Properties = {
    backgroundColor: "#575a59",
    backgroundImage: `url(${headerImage})`,
    backgroundRepeat: "repeat",
    direction: "rtl",
  };
  let solMetaURL: string = "";

  const styleTab: CSS.Properties = {
    fontSize: "x-large",
    marginLeft: "50px",
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div
        className="HeadLiner square border-bottom border-5"
        style={styleHead}
      >
        <h1 style={{ fontSize: "80px" }}>not_a_fungus</h1>
        <AddressField user="test" />
      </div>

      <Tab.Container id="custom-Tab" defaultActiveKey="Solana">
        <Row style={styleTab}>
          <Col md="auto">
            <Nav variant="underline">
              <Nav.Item>
                <Nav.Link eventKey={"solana"} style={{ color: "aliceblue" }}>
                  Solana
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md="auto">
            <Nav variant="underline">
              <Nav.Item>
                <Nav.Link eventKey={"ether"} style={{ color: "aliceblue" }}>
                  Ether
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md="auto">
            <Nav variant="underline">
              <Nav.Item>
                <Nav.Link eventKey={"config"} style={{ color: "aliceblue" }}>
                  Config
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Tab.Content>
            <Tab.Pane eventKey={"solana"}>
              <FileManager type="json" file="solData" />
              <Button
                onClick={() => {
                  mintNFT_sol(
                    "https://ipfs.filebase.io/ipfs/QmZgQSnbhveep8q3aXMM3NRsztCR8ytoRHQxJHnHcKmUeu"
                  );
                }}
              >
                Mint SOL NFT
              </Button>
              <Form.Group>
                <Row className="mb-4">
                  <Col className="bg-secondary rounded-2" sm={9} lg={3}></Col>
                </Row>
              </Form.Group>
            </Tab.Pane>
            <Tab.Pane eventKey={"ether"}>
              <FileManager type="json" file="etherData" />
              <Button
                onClick={() => {
                  mintNFT_eth(
                    "https://ipfs.filebase.io/ipfs/QmSGkLgbMqasH3NS7C1RN5wfbJRrxiQVbDyUjGZAiGee2M"
                  );
                }}
              >
                Mint SOL NFT
              </Button>
            </Tab.Pane>
            <Tab.Pane eventKey={"config"}>
              <FileManager type="json" file="jsonData" />
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default App;

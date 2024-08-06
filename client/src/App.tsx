import React from "react";
import { Button, Tab, Form, Row, Col, Nav } from "react-bootstrap";
import "./App.css";
import CSS from "csstype";

import NFTCard from "./component/NFTCard";
import AddressField from "./component/AddressField";
import FileManager from "./component/fileManager";

import headerImage from "./data/headerImage_medium.jpg";
import backgroundImage from "./data/backgroundImage_large.jpg";

function App() {
  const styleHead: CSS.Properties = {
    backgroundColor: "#575a59",
    backgroundImage: `url(${headerImage})`,
    backgroundRepeat: "repeat",
    direction: "rtl",
  };

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
            <Tab.Pane eventKey={"solana"}> content solana</Tab.Pane>
            <Tab.Pane eventKey={"ether"}> content ether</Tab.Pane>
            <Tab.Pane eventKey={"configg"}>
              {<FileManager type="json" />}
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Tab.Container>

      <NFTCard />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import CSS from "csstype";

const AddressField: React.FC<{ user: string; address?: string }> = ({
  user,
  address,
}) => {
  const [component, setComponent] = useState(<></>);
  //   const [jsonContent, setJsonContent] = useState(Object({}));

  const handleButtonSmash = () => {
    console.log("smackThat");
  };

  useEffect(() => {
    const style: CSS.Properties = {
      margin: "15px",
      minWidth: "300px",
    };

    setComponent(
      <Form.Group style={style}>
        <Row className="mb-4">
          <Col className="bg-secondary rounded-2" sm={9} lg={3}>
            <Form.Label className="text-light">
              {"Wallet Address from: " + user}
            </Form.Label>
            <Form.Control
              placeholder="0x012345678901234567890123456789012345678912"
              disabled
              value={address}
            />
          </Col>
        </Row>
      </Form.Group>
    );
  }, [user, address]);

  //const getJSONData = () => {
  //  return fetch("http://localhost:9000/jsonData")
  //    .then((res) => {
  //      return res.json();
  //    })
  //    .then((val) => {
  //      return val;
  //    })
  //    .catch((error) => {
  //      console.log(error);
  //    });
  //};

  //<Card.Img variant="top" src="holder.js/100px180" />
  return (
    <>
      {component || (
        <div className="placeholder-styles">YOUR NICE PLACEHOLDER</div>
      )}
    </>
  );
};

export default AddressField;

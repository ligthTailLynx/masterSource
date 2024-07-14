import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import CSS from "csstype";

const NFTCard: React.FC<{}> = ({}) => {
  const [component, setComponent] = useState(<></>);
  const [jsonContent, setJsonContent] = useState(Object({}));

  useEffect(() => {}, []);

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
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default NFTCard;

import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import CSS from "csstype";

const NFTCard: React.FC<{}> = ({}) => {
  const [component, setComponent] = useState(<></>);
  const [jsonContent, setJsonContent] = useState(Object({}));

  const handleButtonSmash = () => {
    console.log("smackThat");
  };

  const style: CSS.Properties = {
    width: "18rem",
    margin: "15px",
  };

  useEffect(() => {
    setComponent(
      <Card style={style}>
        <Card.Body>
          <Card.Title style={{ color: "#282c34" }}>Card Title</Card.Title>
          <Card.Text style={{ color: "#282c34" }}>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button
            style={{ margin: "15px" }}
            variant="primary"
            onClick={() => {
              handleButtonSmash();
            }}
          >
            Push SQL Changes
          </Button>
        </Card.Body>
      </Card>
    );
  }, []);

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

export default NFTCard;

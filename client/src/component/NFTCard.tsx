import React, { useState, useEffect } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import CSS from "csstype";

const NFTCard: React.FC<{ type: string }> = ({ type }) => {
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

  return (
    <>
      {component || (
        <div className="placeholder-styles">YOUR NICE PLACEHOLDER</div>
      )}
    </>
  );
};

export default NFTCard;

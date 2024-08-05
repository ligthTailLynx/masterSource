import React, { useState, useEffect } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import CSS from "csstype";

import JsonGroup from "./JSONGroup";

const FileManager: React.FC<{ type: string }> = ({ type }) => {
  const [component, setComponent] = useState(<></>);
  const [jsonContent, setJsonContent] = useState(Object({}));

  useEffect(() => {
    switch (type) {
      case "json":
        getJSONData().then((val) => {
          setJsonContent(val);
        });
        break;
    }
  }, [type]);

  useEffect(() => {
    const style: CSS.Properties = {
      margin: "15px",
    };
    switch (type) {
      case "json":
        setComponent(
          <>
            <Button
              style={style}
              variant="primary"
              onClick={() => {
                postJSONData(jsonContent);
              }}
            >
              Push JSON Changes
            </Button>
            {Object.keys(jsonContent).map((kid, index) => {
              return (
                <JsonGroup
                  key={kid + index}
                  candidate={jsonContent[kid]}
                  title={kid}
                  offset={0}
                  updateObj={setJsonContent}
                  jsonContent={jsonContent}
                  parents={[kid]}
                />
              );
            })}
          </>
        );
        break;
      default:
        console.log("unkown fileType");
        setComponent(<h1>Unknown fileType</h1>);
    }
  }, [jsonContent, type]);

  const getJSONData = () => {
    return fetch("http://localhost:9000/jsonData")
      .then((res) => {
        return res.json();
      })
      .then((val) => {
        return val;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postJSONData = (jsonObj: object) => {
    console.log(jsonObj);
    fetch("http://localhost:9001/jsonData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObj),
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

  return (
    <>
      {component || (
        <div className="placeholder-styles">YOUR NICE PLACEHOLDER</div>
      )}
    </>
  );
};

export default FileManager;

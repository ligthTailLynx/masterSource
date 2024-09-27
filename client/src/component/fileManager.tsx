import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CSS from "csstype";

import JsonGroup from "./JSONGroup";

const FileManager: React.FC<{ type: string; file: string }> = ({
  type,
  file,
}) => {
  const [component, setComponent] = useState(<></>);
  const [jsonContent, setJsonContent] = useState(Object({}));

  useEffect(() => {
    switch (type) {
      case "json":
        getJSONData().then((val) => {
          console.log(val);
          setJsonContent(val);
        });
        break;
    }
  }, [type, file]);

  useEffect(() => {
    const style: CSS.Properties = {
      margin: "15px",
      justifyContent: "left",
    };
    switch (type) {
      case "json":
        setComponent(
          <>
            <Button
              style={style}
              variant="primary"
              size="sm"
              onClick={() => {
                postJSONData(jsonContent);
              }}
            >
              Push new Config
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
    return fetch("http://192.168.0.126:9001/" + file)
      .then((res) => {
        return res.json();
      })
      .then((val) => {
        return val;
      })
      .catch((error) => {
        console.log("GetJSONData got out of hand");
        console.log(error);
        return {};
      });
  };

  const postJSONData = (jsonObj: object) => {
    console.log(jsonObj);
    fetch("http://192.168.0.126:9001/" + file, {
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

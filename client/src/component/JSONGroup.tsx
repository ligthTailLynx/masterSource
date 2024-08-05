import React, { useState, useEffect } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import CSS from "csstype";

import JsonLineItem from "./JSONLineItem";

const defaultOffset: number = 15;

const JsonGroup: React.FC<{
  candidate: any;
  title?: string;
  offset?: number;
  updateObj: Function;
  jsonContent: object;
  parents: string[];
  iter?: boolean;
}> = ({
  candidate,
  title = "",
  offset = defaultOffset,
  updateObj,
  jsonContent,
  parents,
  iter = false,
}) => {
  const [open, setOpen] = useState(false);
  // const [objParents, setParents] = useState(parents);
  const [component, setComponent] = useState(<></>);

  const style: CSS.Properties = {
    marginLeft: offset + "px",
  };

  useEffect(() => {
    var kidList: string[] = [];
    if (candidate) {
      kidList = Object.keys(candidate);
    }

    if (typeof candidate == "object" && !Array.isArray(candidate)) {
      setComponent(
        <>
          {candidate ? (
            <InputGroup>
              <Form.Control
                type="text"
                value={title}
                aria-label="Label"
                aria-describedby="basic-addon1"
                disabled
                readOnly
              />
              <Button
                variant={
                  Object.keys(candidate).length > 0 ? "secondary" : "dark"
                }
                onClick={() => setOpen(!open)}
              >
                v
              </Button>
            </InputGroup>
          ) : (
            <JsonLineItem
              title={title}
              value={candidate}
              offset={offset}
              updateObj={updateObj}
              jsonContent={jsonContent}
              parents={parents}
            />
          )}
          {open ? (
            kidList.map((kid) => {
              return candidate[kid] ? (
                typeof candidate[kid] === "object" ? (
                  <JsonGroup
                    key={title + kid}
                    candidate={candidate[kid]}
                    title={kid}
                    offset={offset + defaultOffset}
                    updateObj={updateObj}
                    jsonContent={jsonContent}
                    parents={[...parents, kid]}
                    iter={true}
                  />
                ) : (
                  <JsonLineItem
                    key={title + kid}
                    title={kid}
                    value={candidate[kid]}
                    offset={offset + defaultOffset}
                    updateObj={updateObj}
                    jsonContent={jsonContent}
                    parents={[...parents, kid]}
                  />
                )
              ) : (
                <JsonLineItem
                  key={title + kid}
                  title={kid}
                  value={candidate[kid]}
                  offset={offset + defaultOffset}
                  updateObj={updateObj}
                  jsonContent={jsonContent}
                  parents={[...parents, kid]}
                />
              );
            })
          ) : (
            <></>
          )}
        </>
      );
    } else if (Array.isArray(candidate)) {
      setComponent(
        <>
          {title ? (
            <InputGroup>
              <Form.Control
                type="text"
                value={title}
                aria-label="Label"
                aria-describedby="basic-addon1"
                disabled
                readOnly
              />
              <Button
                variant={candidate.length > 0 ? "secondary" : "dark"}
                onClick={() => setOpen(!open)}
              >
                v
              </Button>
            </InputGroup>
          ) : null}

          {open ? (
            candidate.map((obj, index) => {
              return (
                <JsonGroup
                  key={index}
                  candidate={obj}
                  title={index.toString()}
                  offset={offset + defaultOffset}
                  updateObj={updateObj}
                  jsonContent={jsonContent}
                  parents={[...parents, index.toString()]}
                  iter={true}
                />
              );
            })
          ) : (
            <></>
          )}
        </>
      );
    } else {
      setComponent(
        <JsonLineItem
          title={title}
          value={candidate}
          offset={offset}
          updateObj={updateObj}
          jsonContent={jsonContent}
          parents={iter ? [...parents, title] : [...parents]}
        />
      );
    }
  }, [open]);

  return (
    <div key={title} style={style}>
      {component}
    </div>
  );
};

export default JsonGroup;

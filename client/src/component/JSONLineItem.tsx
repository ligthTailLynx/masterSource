import React, { useState, useEffect } from "react";
import { InputGroup, Form } from "react-bootstrap";
import CSS from "csstype";

const JsonLineItem: React.FC<{
  title: string;
  value: string;
  offset?: number;
  updateObj: Function;
  jsonContent: any;
  parents: string[];
}> = ({ title, value, offset = 15, updateObj, jsonContent, parents }) => {
  let inputType: string = "string";
  eval('inputType=typeof(jsonContent["' + parents.join('"]["') + '"])');
  if (typeof value === "string") {
    value = value
      ? value.length > 0
        ? value.replace(/^"+|"+$/g, "")
        : value
      : ""; //trime " from string
  } else if (value === null) {
    value = "";
  }
  const [inputValue, setInputValue] = useState(value);
  const [component, setComponent] = useState(<></>);

  // const setDescendantProp=(obj:any, path:string[], value:any)=> {
  //     console.log(obj)
  //     let subObjects:any[]=[obj]
  //     console.log(subObjects[0])

  //     let iter=0;
  //     while (path.length > 1) {
  //         subObjects.push(subObjects[iter][path.shift()||"undefined"])
  //         iter++;
  //     }
  //     console.log(subObjects)
  //     subObjects.pop()[path[0]]=value;
  //     while(subObjects.length>1){
  //         let subObj=subObjects.pop();
  //         subObjects[subObjects.length-1]=subObj;
  //     }
  //     console.log(subObjects[0])
  //     //not a working solution
  // }

  //possible option:
  // let currentObj = jsonContent;
  // for (let i = 0; i < parents.length - 1; i++) {
  //     currentObj = currentObj[parents[i]];
  // }
  // currentObj[parents[parents.length - 1]] = writeValue;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let writeValue: any;

    setInputValue(event.target.value);

    switch (inputType) {
      case "number":
        writeValue = parseFloat(event.target.value);
        break;
      case "string":
      default:
        //check if value is boolean
        writeValue =
          event.target.value === "true"
            ? true
            : event.target.value === "false"
            ? false
            : event.target.value;
        break;
    }

    eval('jsonContent["' + parents.join('"]["') + '"]=writeValue'); //functional, but BIG!!! security issue
    updateObj(jsonContent);
  };

  useEffect(() => {
    const style: CSS.Properties = {
      marginLeft: offset + "px",
    };

    setComponent(
      <InputGroup style={style}>
        <Form.Control
          value={title}
          aria-label={title}
          aria-describedby="json key"
          disabled
          readOnly
        />
        <Form.Control
          type={inputType === "number" ? "number" : "text"}
          value={inputValue}
          placeholder={JSON.stringify(value)}
          onChange={handleInputChange}
        />
      </InputGroup>
    );
  }, [inputValue]);

  return component;
};

export default JsonLineItem;

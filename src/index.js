import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

let answer = "";


function camelize(str) {
    return str
    .replace(/\w+/g, function (word, index) {
      return index === 0
        ? word.toLowerCase()
        : word[0].toUpperCase() + word.slice(1);
    })
    .replace(/[-]/g, "")
    .replace(/\s+/g, "");
  }


function removeSpaces(str){
    return str.split(" ").join("");
}
function addStyle(obj){
    if(obj === undefined || Object.keys(obj).length === 0) return;
    answer += " style={{";
    for(const [key, value] of Object.entries(obj)){
        answer += removeSpaces(camelize(key)) + ":";
        answer += `"${removeSpaces(value)}",`;
    }
    answer = answer.slice(0, -1);
    answer += "}}";
}

function formString(obj){
    answer += `<${removeSpaces(obj.name)}`;
    addStyle(obj.style);
    let children = obj.children;
    if(children === undefined || children.length === 0) {
        answer += "/>\n";
        return;
    }
    else{
        answer += ">\n";
        for(let i = 0; i < children.length; i++){
            formString(children[i]);
        }
    }
    answer += "</" + removeSpaces(obj.name) + ">";
}

function generateCodeFromObject(obj){
    formString(obj);
    return answer;
    //return a code generated string
   }
   
module.exports=generateCodeFromObject;


// ReactDOM.render(<App />, document.getElementById("root"));
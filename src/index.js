import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
const title = (str) =>{
    return str.replace(
        /\w\S*/g,
        function (txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    ).replace(" ", "");
}

const camelCase = (str) =>{
    str = str.replace("-", " ")
    return str
    .replace(/\s(.)/g, function (s1) { return s1.toUpperCase();})
    .replace(/\s/g, '')
    .replace(/^(.)/, function (s1){return s1.toLowerCase();})
}

const jsonToJsx = (obj) => {
    let ansStr = "<";
    ansStr += title(obj.name) + " ";
    if (obj.style !== undefined && Object.keys(obj.style).length>0){
        var stKeys = Object.keys(obj.style)
        ansStr += "style={{"
        for (var i=0; i < stKeys.length; i++){
            ansStr += camelCase(stKeys[i]) + ':"' + obj.style[stKeys[i]] + '",';
        }
        ansStr = ansStr.substr(0, ansStr.length-1) + "}}"
    }

    if (obj.children !== undefined && obj.children.length > 0){
        ansStr += ">\n";
        for (var i=0; i < obj.children.length; i++){
            ansStr += jsonToJsx(obj.children[i])
        }
        ansStr += "</" + title(obj.name) + ">"
    }
    else{
        ansStr += "/>"
    }

    return ansStr
}


function generateCodeFromObject(obj){
    //return a code generated string
    return jsonToJsx(obj)
   }
   
   module.exports=generateCodeFromObject;

// ReactDOM.render(<App />, document.getElementById("root"));
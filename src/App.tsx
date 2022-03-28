import "./App.css";
import { useState, useEffect } from "react";
import { Tree } from "./components/Tree";
import * as _ from 'lodash';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://frakton.dev/articles.php")
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  const dataToTree = arrayofData => {
    var tree = [], // Too add the elements in tree form
      mappedArr = {},
      arrElem,
      mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    Array.from({ length: arrayofData.length }).forEach((el, i) => {
      arrElem = arrayofData[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]["children"] = [];
    });
    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parent) {
          mappedArr[mappedElem["parent"]]["children"].push(mappedElem);
        } else {
          // If the element is at the root level, add it to first level elements array.
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  };

  let path = '';
  const renderSummary = () => {
    const checkboxs = document.querySelectorAll('input[type="checkbox"]');
    checkboxs.forEach((c: any, index) => {
      if (c.value === 'leaf' && c.checked) {
        if (!(document.getElementById(`${c.id}`).id === c.id)) {
          const newDiv = document.createElement("div");
          newDiv.setAttribute("id", `${c.id}`);
          const newContent = document.createTextNode(`---> ${renderPath(parseInt(c.id))}`);
          newDiv.appendChild(newContent);
          const button1 = document.getElementById("button");
          button1.insertAdjacentElement('beforebegin', newDiv);
          path = '';
        }
      }
    })
  }
  const renderPath = (id) => {
    const currentChild = data.find(item => item.id === id);
    const currentChildParent = currentChild.parent;
    if (currentChildParent !== 0) {
      path = path + ' ' + currentChild.name + ' / ';
      renderPath(currentChild.parent)
    }
    else {
      path = path + ' ' + currentChild.name;
    }
    return path;
  }

  return (
    <>
      <Tree data={dataToTree(data)} />
      <button id='button' className="btn btn-secondary" onClick={renderSummary}>Summary</button>
    </>
  );
}
export default App;
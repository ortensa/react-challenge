import React, { useState } from 'react'
import * as _ from 'lodash';
import { Tree } from './Tree';
export const TreeNode = ({ node }) => {
    const [childVisible, setChildVisiblity] = useState(false);
  
    const hasChild = node.children ? true : false;
  
  
    return (
      <li className="d-tree-node border-0">
        <div className="d-flex" onClick={(e) => setChildVisiblity((v) => !v)}>
          {hasChild && (
            <div className={`${childVisible ? "active" : ""}`}>
              <input type={'checkbox'}
                value={_.isEmpty(node.children) ? 'leaf' : 'notLeaf'}
                checked={childVisible}
                id={`${node.id}`}
              />{node.name}
            </div>
          )}
        </div>
  
        {hasChild && childVisible && (
          <div className="d-tree-content">
            <ul className="d-flex d-tree-container flex-column">
              <Tree data={node.children} />
            </ul>
          </div>
        )}
      </li>
    );
  };
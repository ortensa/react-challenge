import { TreeNode } from "./TreeNode";

export const Tree = ({ data = [] }) => {
    return (
      <div className="d-tree">
        <ul className="d-flex d-tree-container flex-column">
          {data.map((tree) => (
            <TreeNode node={tree} />
          ))}
        </ul>
      </div>
    );
  };
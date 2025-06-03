//import "./styles.css";
import { Tree } from "react-arborist";
import { data } from "./../data/ArboristData";

function Node({ node, style, dragHandle }) {
  return (
    <div style={style} ref={dragHandle} onClick={() => node.toggle()}>
      {node.isLeaf ? "🍁" : "🗀"} {node.data.name}
    </div>
  );
}

export default function App() {
  return (
    <Tree
      initialData={data}
      openByDefault={false}
      width={600}
      height={1000}
      indent={24}
      rowHeight={36}
      paddingTop={30}
      paddingBottom={10}
      padding={25}
    >
      {Node}
    </Tree>
  );
}
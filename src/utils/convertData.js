function flattenTreeData(nodes, parentPath = []) {
  let result = [];

  for (const node of nodes) {
    const uniqueLabel = `${node.id}`;
    const currentPath = [...parentPath, uniqueLabel];

    const { children, ...rest } = node;

    result.push({
      ...rest,
      treePath: currentPath
    });

    if (children) {
      result = result.concat(flattenTreeData(children, currentPath));
    }
  }

  return result;
}

export default flattenTreeData;
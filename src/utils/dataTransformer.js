const seenIds = new Set();

function transformDataToTreeFormat(data, parentPath = []) {
  let result = [];

  data.forEach(item => {
    
    // if (seenIds.has(item.parentID+item.id)) {
    //   console.warn("Duplicate ID detected during transform:", item.id + 'and ' + item.parentID);
    // } else {
    //   seenIds.add(item.parentID+item.id);
    // }

    
    const uniqueLabel = `${item.parentID} (${item.id})`;
    const currentPath = [...parentPath, uniqueLabel]; 
    console.log('unique', uniqueLabel);

    result.push({
      id: item.id,
      depth: currentPath.length,
      hierarchy: currentPath,
      jobNum: item.jobNum,
      partnum: item.partnum,
      partDescription: item.partDescription,
      lotNum: item.lotNum,
      jobOutput: item.jobOutput,
      actualOutput: item.actualOutput,
      issueQty: item.issueQty,
      requiredQty: item.requiredQty,
      actRequiredQty: item.actRequiredQty,
      variance: item.variance,
      jobStatus: item.jobStatus,
    });

    // if (item.children && item.children.length > 0) {
    //   const childrenTransformed = transformDataToTreeFormat(item.children, currentPath);
    //   result = result.concat(childrenTransformed);
    // }
     if (item.children?.length) {
      result = result.concat(transformDataToTreeFormat(item.children, currentPath));
    }
  });

  return result;
}

export default transformDataToTreeFormat;

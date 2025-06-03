
function transformDataToTreeFormat(data, parentPath = []) {
  let result = [];

  //console.log('data', data);
  
  data.forEach(item => {
    const currentPath = [...parentPath, item.jobNum];

    result.push({
      id: item.id,
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

    if (item.children && item.children.length > 0) {
      const childrenTransformed = transformDataToTreeFormat(item.children, currentPath);
      result = result.concat(childrenTransformed);
    }
  });

  return result;
}

export default transformDataToTreeFormat;
// utils/transformjobData.js

// const convertDataStructure = (data) => {
//     const transformJob = (job) => {
//       const baseNode = {
//         id: `${job.id}`,
//         label: `Job Num: ${job.jobNum} | Part Num: ${job.partnum} | Part Desc: ${job.partDescription} |\n Lot Number: ${job.lotNum}   `,
//         children: []
//       };
  
//       if (job.children && job.children.length > 0) {
//         baseNode.children.push({
//           id: `children-${job.id}`,
//           label: `Sub Jobs`,
//           children: job.children.map(transformJob)
//         });
//       }
  
//       return baseNode;
//     };
  
//     return data.map(transformJob);
//   };

const convertDataStructure = (data) => {
  const transformJob = (job, path = `job-${job.id}`) => {
  const baseNode = {
    id: path,
    label: `Job Id: ${job.id} | Job Num: ${job.jobNum} | Part Num: ${job.partnum} | Part Desc: ${job.partDescription}`,
    children: []
  };

  if (job.children && job.children.length > 0) {
    baseNode.children.push({
      id: `${path}-children`,
      label: `Sub Jobs`,
      children: job.children.map((child, index) =>
        transformJob(child, `${path}-child-${index}`)
      )
    });
  }

  return baseNode;
};

  return data.map(transformJob);
};

  
  export default convertDataStructure;
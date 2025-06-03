// utils/transformjobData.js

const convertDataStructure = (data) => {
    const transformJob = (job) => {
      const baseNode = {
        id: `${job.id}`,
        label: `Job Num: ${job.jobNum}`,
        children: [
          { id: `part-${job.id}`, label: `Part Num: ${job.partnum}` },
          { id: `output-${job.id}`, label: `Job Output: ${job.jobOutput}` },
          { id: `issue-${job.id}`, label: `Issue Qty: ${job.issueQty}` },
          { id: `status-${job.id}`, label: `Job Status: ${job.jobStatus}` },
          { id: `lot-${job.id}`, label: `Lot Number: ${job.lotNum}` }
        ]
      };
  
      if (job.children && job.children.length > 0) {
        baseNode.children.push({
          id: `children-${job.id}`,
          label: `Sub Jobs`,
          children: job.children.map(transformJob)
        });
      }
  
      return baseNode;
    };
  
    return data.map(transformJob);
  };
  
  export default convertDataStructure;
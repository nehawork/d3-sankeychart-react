const unformattedJson = [
  {
    key: "a1",
    value: 30,
    buckets: [
      {
        key: "a2",
        value: 10,
        buckets: [{ key: "a3", value: 99 }],
      },
      { key: "b2", value: 20 },
    ],
  },
  {
    key: "b1",
    value: 70,
    buckets: [
      { key: "b2", value: 40 },
      { key: "c2", value: 30 },
    ],
  },
];

const getData = (
  input,
  visited = new Map(),
  parent,
  nodes = [],
  links = []
) => {
  input.forEach((x) => {
    // Add node into the node list, if not visited previosuly.

    if (!visited.has(x.key)) {
      let currId = nodes.length;
      nodes.push({ nodeId: currId, name: x.key });
      visited.set(x.key, currId);
    }

    // If a parent node exists, add relation into the links list.

    if (parent) {
      // Note, we use the "Map" to get the ids.

      links.push({
        source: visited.get(parent.key),
        target: visited.get(x.key),
        value: x.value,
      });
    }

    // Traverse (if required) to the next level of deep.

    if (x.buckets) getData(x.buckets, visited, x, nodes, links);
  });

  return { nodes: nodes, links: links };
};

const sankeyChartData = getData(unformattedJson);

export default sankeyChartData;

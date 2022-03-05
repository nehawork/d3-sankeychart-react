// const jsonDataOld = [
//   {
//     key: "a1",
//     value: 30,
//     buckets: [
//       {
//         key: "a2",
//         value: 10,
//         buckets: [{ key: "a3", value: 99 }],
//       },
//       { key: "b2", value: 20 },
//     ],
//   },
//   {
//     key: "b1",
//     value: 70,
//     buckets: [
//       { key: "b2", value: 40 },
//       { key: "c2", value: 30 },
//     ],
//   },
// ];

const unformattedJson = [
  {
    buckets: [
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:54:47.269Z",
        displayName: "2022-02-22T02:54:47.269Z",
        value: 1,
      },
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:52:24.554Z",
        displayName: "2022-02-22T02:52:24.554Z",
        value: 1,
      },
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:49:56.990Z",
        displayName: "2022-02-22T02:49:56.990Z",
        value: 1,
      },
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:49:54.855Z",
        displayName: "2022-02-22T02:49:54.855Z",
        value: 1,
      },
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:48:44.141Z",
        displayName: "2022-02-22T02:48:44.141Z",
        value: 1,
      },
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:48:42.424Z",
        displayName: "2022-02-22T02:48:42.424Z",
        value: 1,
      },
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:48:39.005Z",
        displayName: "2022-02-22T02:48:39.005Z",
        value: 1,
      },
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:48:36.742Z",
        displayName: "2022-02-22T02:48:36.742Z",
        value: 1,
      },
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:47:23.345Z",
        displayName: "2022-02-22T02:47:23.345Z",
        value: 1,
      },
      {
        buckets: [
          {
            key: "fieldName_2022-02-22T02:54:47.269Z",
            displayName: "2022-02-22T02:54:47.269Z",
            value: 1,
          },
        ],
        key: "2022-02-22T02:47:20.756Z",
        displayName: "2022-02-22T02:47:20.756Z",
        value: 1,
      },
    ],
    key: "127.0.0.1",
    value: 34,
    displayName: "127.0.0.1",
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
      nodes.push({ nodeId: currId, name: x.displayName });
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

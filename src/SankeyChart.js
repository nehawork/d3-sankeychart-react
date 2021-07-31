import * as d3 from "d3";
import sankeyChart from "./lib/sankey-chart";

import React, { useEffect } from "react";

export default function SankeyChart() {
  useEffect(() => {
    setTimeout(() => {
      renderSankeyChart();
    }, 200);
  }, []);

  const renderSankeyChart = () => {
    var units = "Widgets";

    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 1200 - margin.left - margin.right,
      height = 740 - margin.top - margin.bottom;

    var formatNumber = d3.format(",.0f"), // zero decimal places
      format = function (d) {
        return formatNumber(d) + " " + units;
      },
      color = d3.scaleOrdinal(d3.schemeCategory10);

    // append the svg canvas to the page
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set the sankey diagram properties
    var sankey = sankeyChart()
      .nodeWidth(36)
      .nodePadding(10)
      .size([width, height]);

    var path = sankey.link();
    const dataPromise = d3.json("chart-data.json");
    console.log(dataPromise);
    // load the data
    dataPromise.then((graph) => {
      var nodeMap = {};
      graph.nodes.forEach(function (x) {
        nodeMap[x.name] = x;
      });
      graph.links = graph.links.map(function (x) {
        return {
          source: nodeMap[x.source],
          target: nodeMap[x.target],
          value: x.value,
        };
      });

      sankey.nodes(graph.nodes).links(graph.links).layout(32);

      // add in the links
      var link = svg
        .append("g")
        .selectAll(".link")
        .data(graph.links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function (d) {
          return Math.max(1, d.dy);
        })
        .sort(function (a, b) {
          return b.dy - a.dy;
        });

      // add the link titles
      link.append("title").text(function (d) {
        return d.source.name + " → " + d.target.name + "\n" + format(d.value);
      });

      // add in the nodes
      var node = svg
        .append("g")
        .selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .call(
          d3
            .drag()
            .subject(function (d) {
              return d;
            })
            .on("start", function () {
              this.parentNode.appendChild(this);
            })
            .on("drag", dragmove)
        );

      // add the rectangles for the nodes
      node
        .append("rect")
        .attr("height", function (d) {
          return d.dy;
        })
        .attr("width", sankey.nodeWidth())
        .style("fill", function (d) {
          return (d.color = color(d.name.replace(/ .*/, "")));
        })
        .style("stroke", function (d) {
          return d3.rgb(d.color).darker(2);
        })
        .append("title")
        .text(function (d) {
          return d.name + "\n" + format(d.value);
        });

      // add in the title for the nodes
      node
        .append("text")
        .attr("x", -6)
        .attr("y", function (d) {
          return d.dy / 2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) {
          return d.name;
        })
        .filter(function (d) {
          return d.x < width / 2;
        })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

      // the function for moving the nodes
      function dragmove(event, d) {
        d3.select(this).attr(
          "transform",
          "translate(" +
            (d.x = Math.max(0, Math.min(width - d.dx, event.x))) +
            "," +
            (d.y = Math.max(0, Math.min(height - d.dy, event.y))) +
            ")"
        );
        sankey.relayout();
        link.attr("d", path);
      }
    });
  };

  return <p id="chart"></p>;
}
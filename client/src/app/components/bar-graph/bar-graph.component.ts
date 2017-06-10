import { Component, OnInit } from '@angular/core';

import { scaleBand, scaleLinear } from 'd3-scale';
import * as selection from 'd3-selection';
import { hierarchy as d3hierarchy, partition as d3partition } from 'd3-hierarchy';
import { interpolate as d3interpolate } from 'd3-interpolate';
import * as d3Shape from 'd3-shape';
import 'd3-transition';
import * as d3 from 'd3';

@Component({
  selector: 'op-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {

  constructor() {
  }
  initBarGraph() {
    var svg = selection.select(".line-graph-container")
      .append('svg')
      .attr('width', 700)
      .attr('height', 300);
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var x = scaleBand().rangeRound([0, width]).padding(0.1),
        y = scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // uses sample data from https://bl.ocks.org/mbostock/3885304
    (d3 as any).tsv("/assets/data.tsv", function(d) {
      d.frequency = +d.frequency;
      return d;
    }, function(error, data: [{ letter: string, frequency: number}]) {
      if (error) throw error;

      x.domain(data.map(function(d) { return d.letter; }));
      y.domain(d3.extent(data, function(d) { return d.frequency; }));

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      g.append("g")
          .attr("class", "axis axis--y")
          .call(
            d3.axisLeft(y)
              .ticks(10, "%")
              .tickPadding(23)
          )
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.letter); })
          .attr("y", function(d) { return y(d.frequency); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.frequency); });
    });
  }
  initLineGraph() {}
  ngOnInit() {
    this.initBarGraph();
  	this.initLineGraph();
  }

}

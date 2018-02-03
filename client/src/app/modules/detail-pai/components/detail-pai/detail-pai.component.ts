import { Component, OnInit } from '@angular/core';

import { scaleBand, scaleLinear } from 'd3-scale';
import * as selection from 'd3-selection';
import { hierarchy as d3hierarchy, partition as d3partition } from 'd3-hierarchy';
import { interpolate as d3interpolate } from 'd3-interpolate';
import * as d3Shape from 'd3-shape';
import 'd3-transition';
import * as d3 from 'd3';

@Component({
  selector: 'op-detail-pai',
  templateUrl: './detail-pai.component.html',
  styleUrls: ['./detail-pai.component.scss']
})
export class DetailPaiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initBarGraph();
  }

  initBarGraph() {
    const svg = selection.select('.line-graph-container')
      .append('svg')
      .attr('width', 700)
      .attr('height', 300);
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const x = scaleBand().rangeRound([0, width]).padding(0.1);
    const y = scaleLinear().rangeRound([height, 0]);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // uses sample data from https://bl.ocks.org/mbostock/3885304
    (d3 as any).tsv('/assets/data.tsv', function(d) {
      d.frequency = +d.frequency;
      return d;
    }, function(error, data: [{ letter: string, frequency: number}]) {
      if (error) {
        throw error;
      }

      x.domain(data.map((d) => d.letter));
      y.domain(d3.extent(data, (d) => d.frequency));

      g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(10, '%').tickPadding(23))
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Frequency');

      g.selectAll('.bar')
        .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => x(d.letter))
          .attr('y', (d) => y(d.frequency))
          .attr('width', x.bandwidth())
          .attr('height', (d) => height - y(d.frequency));
    });
  }
}

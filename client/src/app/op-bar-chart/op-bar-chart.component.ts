import {Component, Input, ElementRef} from '@angular/core';

import * as D3 from 'd3';
import * as Moment from 'moment';

import {MainChartConfig} from './main-chart-config';

@Component({
  selector: 'main-chart',
  template: `<ng-content></ng-content>`,
  directives: []
})

export class OpBarChartComponent {

  // TODO: fix input - managing-body-list-managing-body
  @Input() config:Array<MainChartConfig>;

  private host;        // D3 object referecing host dom object
  private svg;         // SVG in which we will print our chart
  private margin;      // Space between the svg borders and the actual chart graphic
  private width;       // Component width
  private height;      // Component height
  private xScale;      // D3 scale in X
  private yScale;      // D3 scale in Y
  private xAxis;       // D3 X Axis
  private yAxis;       // D3 Y Axis
  private htmlElement; // Host HTMLElement

   // get element reference from angular and use if as host element for d3
  constructor(private element: ElementRef) {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.element.nativeElement);

    this.createDummyChart();

    //this.setup();
    //this.buildSVG();
  }

  // setup the chart container
  private createDummyChart(): void {

    var data = [4, 8, 15, 16, 23, 42];
    this.host             // d3 host object
        .selectAll("div") // defining the selection
        .data(data)       // data join to the selection
        .enter()          // returns data.update object, which is empty at start
        .append("div")    // new data for which there was no existing element
        .style("width", function(d) { return d * 10 + "px"; })    // set the width according to the data-item's value
        .text(function(d) { return d; });
  }

  // every time the @Input is updated, we rebuild the chart
  ngOnChanges(): void {
    if (!this.config || this.config.length === 0) return;
    this.setup();
    this.buildSVG();
  }

  // setup the chart container
  private setup(): void {
    var demoWidth = 600;

    this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
    //this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
    this.width = demoWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;
    this.xScale = D3.time.scale().range([0, this.width]);
    this.yScale = D3.scale.linear().range([this.height, 0]);
  }

  // build svg using the configurations
  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // var demoPie = D3.layout.pie().value(function(d){return d.value;});
    // this.svg.append(demoPie);
  }

}


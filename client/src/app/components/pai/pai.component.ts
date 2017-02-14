import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as paiAction from '../../actions/pai';
import { Pai } from '../../models/pai';

import * as scale from 'd3-scale';
import * as selection from 'd3-selection';
import { hierarchy as d3hierarchy, partition as d3partition } from 'd3-hierarchy';
import { interpolate as d3interpolate } from 'd3-interpolate';
import * as d3Shape from 'd3-shape';
import 'd3-transition';

@Component({
  selector: 'op-pai',
  templateUrl: './pai.component.html',
  styleUrls: ['./pai.component.scss']
})
// TODO- use the correct typings and not any.
export class PaiComponent implements OnInit {
  private root$: any;

  @ViewChild('pai')paiContainer: ElementRef;
  private arcGenerator: any;
  private mainAxes: {
    x: any,
    y: any
  };
  private dimensions: any;
  private paiElement: any;
  private colorScale: any;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.mainAxes = {
      x: 0,
      y: 0
    };
    this.dimensions = {};
  }

  ngOnInit() {
    this.store.dispatch(new paiAction.LoadPaiAction());
    this.store.select(fromRoot.getPaiState).subscribe(
      res => {
        if (res.children.length) {
          this.initDimensions();
          this.initAxes();
          this.initArcGenerator();
          this.initPai();
          this.loadData(res);
        }
    });
  }

  zoomToNode(d) {
    const x = this.mainAxes.x;
    const y = this.mainAxes.y;
    const radius = this.dimensions.radius;
    const arc = this.arcGenerator;
    this
      .paiElement
      .transition()
      .duration(750)
      .tween('scale', () => {
        const xd = d3interpolate(x.domain(), [d.x0, d.x1]);
        const yd = d3interpolate(y.domain(), [d.y0, 1]);
        const yr = d3interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
          return function (t) {
            x.domain(xd(t));
            y.domain(yd(t)).range(yr(t));
          };
      })
      .selectAll('path')
      .attrTween('d', (dd: any) => {
        return function () {
            return arc(dd);
        };
      });
  }

  loadData(root) {
    const partition = d3partition();
    const color = scale.scaleOrdinal(scale.schemeCategory20);
    root = d3hierarchy(root);
    root.sum(function (d) {
      return d.size;
    });
    this
      .paiElement
      .selectAll('path')
      .data(partition(root).descendants())
      .enter()
      .append('path')
      .attr('d', this.arcGenerator)
      .style('fill', function (d: any) {
        return color((d.children ? d : d.parent).data.name);
      })
      .on('click', this.zoomToNode.bind(this))
      .append('title')
      .text(function (d: any) {
        return d.data.name + '\n' + d.value;
      });
  }

  private initDimensions() {
    this.dimensions.width = this.paiContainer.nativeElement.offsetWidth;
    this.dimensions.height = this.paiContainer.nativeElement.offsetHeight;
    this.dimensions.radius = (Math.min(this.dimensions.width, this.dimensions.height) / 2) - 10;
  }

  private initAxes() {
    this.mainAxes.x = scale
      .scaleLinear()
      .range([0, 2 * Math.PI]);
    this.mainAxes.y = scale
      .scaleSqrt()
      .range([0, this.dimensions.radius]);
  }

  private initArcGenerator() {
    const x = this.mainAxes.x;
    const y = this.mainAxes.y;
    this.arcGenerator = d3Shape.arc();
    this
      .arcGenerator
      .startAngle((d: any) => {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
      })
      .endAngle((d: any) => {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
      })
      .innerRadius((d: any) => {
        return Math.max(0, y(d.y0));
      })
      .outerRadius((d: any) => {
        return Math.max(0, y(d.y1));
      });
  }

  private initPai() {
    this.paiElement = selection
      .select(this.paiContainer.nativeElement)
      .append('svg')
      .attr('width', this.dimensions.width)
      .attr('height', this.dimensions.height)
      .append('g')
      .attr('transform', 'translate(' + this.dimensions.width / 2 + ',' + (this.dimensions.height / 2) + ')');
  }
}

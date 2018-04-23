import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as scale from 'd3-scale';
import * as selection from 'd3-selection';
import { hierarchy as d3hierarchy, partition as d3partition } from 'd3-hierarchy';
import { interpolate as d3interpolate } from 'd3-interpolate';
import * as d3Shape from 'd3-shape';
import 'd3-transition';
import * as d3 from 'd3';

import * as fromRoot from '../../reducers';
import { LoadPaiAction } from '../../actions/pai.actions';
import { Filter } from '../../models/filter.model';

@Component({
  selector: 'op-pai',
  templateUrl: './pai.component.html',
  styleUrls: ['./pai.component.scss']
})
export class PaiComponent implements OnInit, OnDestroy {
  @ViewChild('pai')paiContainer: ElementRef;
  private arcGenerator: any;
  private mainAxes: { x: any, y: any };
  private dimensions: any;
  private paiElement: any;
  private colorScale: any;
  public selectedFilters: Filter[];
  private div = selection.select('div.pai').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.mainAxes = { x: 0, y: 0 };
    this.dimensions = {};
    this.store.select(fromRoot.getSelectedFilters).subscribe(
      res => this.selectedFilters = res
    );
  }

  ngOnInit() {
    this.store.dispatch(new LoadPaiAction());
    this.store.select(fromRoot.getPaiState).subscribe(
      res => {
        if (res.children.length) {
          this.initDimensions();
          this.initAxes();
          this.initArcGenerator();
          this.initPai();
          this.loadData(res);
        } else {
          selection.select('svg').remove();
        }
    });
  }

  zoomToNode(d) {
    const x = this.mainAxes.x;
    const y = this.mainAxes.y;
    const radius = this.dimensions.radius;
    const arc = this.arcGenerator;
    this.paiElement
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
    this.div = selection.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    root = d3hierarchy(root);
    root.sum(function (d) {
      return d.size;
    });
    this.paiElement
      .selectAll('path')
      .data(partition(root).descendants())
      .enter()
      .append('path')
      .attr('d', this.arcGenerator)
      .style('fill', (d: any) => {
        const colorNode = this.selectedFilters.filter((node, index) => (d.depth) === index);
        if (colorNode.length) {
          return colorNode[0].color;
        }

        return '#ffffff';
      })
      .on('click', this.zoomToNode.bind(this))
      .on('mouseover', (d, i) => {
         this.div.transition()
           .duration(200)
           .style('opacity', .9);
         this.div.html(`<h3>${d.data.name}</h3><hr><a href= "detail-pai/${d.data.name}">למידע נוסף >></a>`)
          .style('left', `${d3.event.pageX + 15}px`)
          .style('top', `${d3.event.pageY + 15}px`);
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
    this.arcGenerator
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
    selection.select('svg').remove();
    selection.select('div.tooltip').remove();

    const { width, height } = this.dimensions;
    const minDimension = Math.min(width, height);
    this.paiElement = selection
      .select(this.paiContainer.nativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${minDimension} ${minDimension}`)
      .attr('preserveAspectRatio', 'xMinYMin')
      .append('g')
      .attr('transform', 'translate(' + this.dimensions.width / 2 + ',' + (this.dimensions.height / 2) + ')');
  }

  ngOnDestroy() {
    selection.select('div.tooltip').remove();
  }
}

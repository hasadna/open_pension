import {
    Component,
    OnInit
} from '@angular/core';
import * as scale from 'd3-scale';
import * as selection from 'd3-selection';
import {
    format
} from 'd3-format';
import {
    hierarchy as d3hierarchy,
    partition as d3partition
} from 'd3-hierarchy';
import {
    interpolate as d3interpolate
} from 'd3-interpolate';
import * as d3Shape from 'd3-shape';
import 'd3-transition';
@Component({
    selector: 'op-pai',
    templateUrl: './pai.component.html',
    styles: [require('./pai.component.scss')]
})
export class PaiComponent implements OnInit {
    partition: any;

    constructor() {

    }

    ngOnInit() {
        var width = 960,
            height = 700,
            radius = (Math.min(width, height) / 2) - 10;

        var formatNumber = format(",d");

        var x = scale.scaleLinear()
            .range([0, 2 * Math.PI]);

        var y = scale.scaleSqrt()
            .range([0, radius]);

        var color = scale.scaleOrdinal(scale.schemeCategory20);

        var partition = d3partition();

        var arc : any = d3Shape.arc();
        arc.startAngle(function(d: any) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
            })
            .endAngle(function(d: any) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
            })
            .innerRadius(function(d: any) {
                return Math.max(0, y(d.y0));
            })
            .outerRadius(function(d: any) {
                return Math.max(0, y(d.y1));
            });


        var svg = selection.select("#pai").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
        var root = require('./flare.json');
        root = d3hierarchy(root);
        root.sum(function(d) {
            return d.size;
        });
        svg.selectAll("path")
            .data(partition(root).descendants())
            .enter().append("path")
            .attr("d", arc)
            .style("fill", function(d : any) {
                return color((d.children ? d : d.parent).data.name);
            })
            .on("click", click)
            .append("title")
            .text(function(d : any) {
                return d.data.name + "\n" + formatNumber(d.value);
            });

        function click(d) {
            svg.transition()
                .duration(750)
                .tween("scale", function() {
                    var xd = d3interpolate(x.domain(), [d.x0, d.x1]),
                        yd = d3interpolate(y.domain(), [d.y0, 1]),
                        yr = d3interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                    return function(t) {
                        x.domain(xd(t));
                        y.domain(yd(t)).range(yr(t));
                    };
                })
                .selectAll("path")
                .attrTween("d", function(d: any) {
                    return function() {
                        return arc(d);
                    };
                });
        }

    }

}
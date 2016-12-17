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

        var arc = d3Shape.arc();
        debugger;
            arc.startAngle(function(d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
            })
            .endAngle(function(d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
            })
            .innerRadius(function(d) {
                return Math.max(0, y(d.y0));
            })
            .outerRadius(function(d) {
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
            .style("fill", function(d) {
                return color((d.children ? d : d.parent).data.name);
            })
            .on("click", click)
            .append("title")
            .text(function(d) {
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
                .attrTween("d", function(d) {
                    return function() {
                        return arc(d);
                    };
                });
        }

    };

    ngOnInit2() {
        var data = require('./flare.json');
        var width = 960,
            height = 700,
            radius = Math.min(width, height) / 2;
        var x = scale.scaleLinear().range([0, 2 * Math.PI]);
        var y = scale.scaleSqrt().range([0, radius]);

        var color = scale.schemeCategory20c;

        var svg = selection.select("#pai").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

        // var partition = d3.layout.partition()
        //     .sort(null)
        //     .value(function(d) { return 1; });


        var arc = d3Shape.arc();
        arc.startAngle(function(d) {
                debugger;
                console.log('start angle');
                return Math.max(0, Math.min(2 * Math.PI, x(1)));
                //  return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
            })
            .endAngle(function(d) {
                debugger;
                //return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
                return Math.max(0, Math.min(2 * Math.PI, x(1)));
            })
            .innerRadius(function(d) {
                //  return Math.max(0, y(d.y));
                return Math.max(0, y(0));
            })
            .outerRadius(function(d) {
                return Math.max(0, y(0));
                // return Math.max(0, y(d.y + d.dy));
            });

        // Keep track of the node that is currently being displayed as the root.
        var node = data;
        debugger;
        this.partition = d3partition();
        data = d3hierarchy(data).sum(d => 1).sort(() => null);
        var path = svg.datum(data).selectAll("path");
        path = path.data(this.partition(data));

        path.enter().append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                debugger;
                return 1;
                // return color((d.children ? d : d.parent).name);
            })
            .on("click", click)
            .each(stash);

        function click(d) {
            node = d;
            debugger;
            // path.transition()
            //     .duration(1000)
            //     .attrTween("d", arcTweenZoom(d));
        }

        // selection.select(self.frameElement).style("height", height + "px");

        // Setup for switching data: stash the old values for transition.
        function stash(d) {
            d.x0 = d.x;
            d.dx0 = d.dx;
        }

        // When switching data: interpolate the arcs in data space.
        function arcTweenData(a, i) {
            var oi = d3interpolate({
                x: a.x0,
                dx: a.dx0
            }, a);

            function tween(t) {
                var b = oi(t);
                a.x0 = b.x;
                a.dx0 = b.dx;
                return arc(b);
            }
            if (i == 0) {
                // If we are on the first arc, adjust the x domain to match the root node
                // at the current zoom level. (We only need to do this once.)
                var xd = d3interpolate(x.domain(), [node.x, node.x + node.dx]);
                return function(t) {
                    x.domain(xd(t));
                    return tween(t);
                };
            } else {
                return tween;
            }
        }

        // When zooming: interpolate the scales.
        function arcTweenZoom(d) {
            var xd = d3interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3interpolate(y.domain(), [d.y, 1]),
                yr = d3interpolate(y.range(), [d.y ? 20 : 0, radius]);
            return function(d, i) {
                return i ?

                    function(t) {
                        return arc(d);
                    } :
                    function(t) {
                        x.domain(xd(t));
                        y.domain(yd(t)).range(yr(t));
                        return arc(d);
                    };
            };
        }
    }

}
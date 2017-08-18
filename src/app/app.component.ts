import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DAGService } from './dag.service';
import { DAG, Edge, Vertex } from './dag';

import * as d3 from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import * as d3Scale from 'd3-scale';
import * as d3Force from 'd3-force';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, AfterViewInit {
  dag: DAG;

  board: any;
  links: any;
  nodes: any;

  width: number;
  height: number;
  scale: number;
  namefontSize: number;
  fontSize: number;

  simulation: any;
  color: any;

  constructor(private dagService: DAGService) {
    this.dag = null;
    this.scale = 1.0;
    this.namefontSize = 20;
    this.fontSize = 14;
    this.color = d3Scale.scaleOrdinal(d3Scale.schemeCategory20);
  }

  getDAG(): void {
    this.dagService.getDAG().then(dag => {
      this.dag = dag;
      this.render(this.dag);
    });
  }

  ngOnInit(): void {
    this.getDAG();
  }

  ngAfterViewInit(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    const svg = d3.select('#dag')
      .attr('width', this.width)
      .attr('height', this.height);

    const rect = svg.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(d3Zoom.zoom()
        .scaleExtent([0.2, 5])
        .on('zoom', () => this.zoomed()))
      .on('wheel', () => d3.event.preventDefault());

    this.board = svg.append('g')
      .attr('class', 'board')
      .attr('transform', 'translate(0, 0)');
  }

  zoomed(): void {
    const e = d3.event;
    this.board.attr('transform', 'translate(' + e.transform.x + ',' + e.transform.y + ')scale(' + e.transform.k + ')');
    this.scale = e.transform.k;
    this.ticked(this.dag);
  }


  render(dag: DAG): void {
    this.links = this.board.append('g')
      .attr('class', 'link')
      .selectAll('polyline')
      .data(dag.edges)
      .enter().append('polyline')
      .attr('marker-mid', 'url(#arrow)');

    this.nodes = this.board.append('g')
      .attr('class', 'node')
      .selectAll('g')
      .data(dag.vertices)
      .enter().append('g');

    this.nodes.append('rect')
      .attr('fill', (d: Vertex) => this.color(d.properties.class_));

    const text = this.nodes.append('text')
      .style('pointer-events', 'none')
      .attr('alignment-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .text((d: Vertex) => d.id);

    text.append('tspan')
      .text((d: Vertex) => {
          if (d.properties.source != null) {
            return d.properties.source;
          } else if (d.properties.transform != null) {
            return d.properties.transform;
          }
        }
      );

    this.simulation = d3Force.forceSimulation(dag.vertices)
      .force('stretch', (alpha) => this.forceStretch(alpha))
      .force('collide', d3Force.forceCollide(100).strength(0.5).iterations(5))
      .force('link', d3Force.forceLink(dag.edges).id((d: Vertex) => d.id).distance(10))
      .force('charge', d3Force.forceManyBody().strength(-100))
      .force('center', d3Force.forceCenter(this.width / 2, this.height / 2));

    this.simulation
      .force('link')
      .links(dag.edges);

    this.simulation
      .on('tick', () => this.ticked(dag));
  }

  ticked(dag: DAG) {
    if (dag !== null) {
      this.links
        .attr('points', (d) => {
          const sx = d.source.x;
          const sy = d.source.y;
          const tx = d.target.x;
          const ty = d.target.y;
          return sx + ',' + sy + ' ' + (sx + tx) / 2 + ',' + (sy + ty) / 2 + ' ' + tx + ',' + ty;
        })
        .attr('stroke-width', (d) => 2 / this.scale);

      this.nodes.selectAll('rect')
        .attr('x', (d) => d.x - 175 / this.scale)
        .attr('y', (d) => d.y - 30 / this.scale)
        .attr('rx', 5 / this.scale)
        .attr('ry', 5 / this.scale)
        .attr('width', 350 / this.scale)
        .attr('height', 60 / this.scale);

      this.nodes.selectAll('text')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .attr('font-size', this.namefontSize / this.scale);

      this.nodes.selectAll('tspan')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y + this.namefontSize / this.scale)
        .attr('font-size', this.fontSize / this.scale);
    }
  }

  forceStretch(alpha) {
    if (this.dag !== null) {
      const sourceSet = new Set(this.links.data().reduce((l: string[], e: Edge) => l.concat(e.source), []));
      const targetSet = new Set(this.links.data().reduce((l: string[], e: Edge) => l.concat(e.target), []));
      const leftSet = new Set([...sourceSet].filter(x => !targetSet.has(x)));
      const rightSet = new Set([...targetSet].filter(x => !sourceSet.has(x)));

      this.nodes.each((node) => {
        if (leftSet.has(node)) {
          node.vy -= 100 * alpha;
        }
        if (rightSet.has(node)) {
          node.vy -= -100 * alpha;
        }
      });
    }
  }
}

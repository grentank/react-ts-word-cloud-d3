import * as d3 from 'd3';
import type cloud from 'd3-cloud';
import type { LayoutWordType } from '../../types/wordTypes';

export default function draw(words: LayoutWordType[], layout: d3.layout.Cloud<cloud.Word>): void {
  d3.select('#wordcloud')
    .append('svg')
    .attr('width', layout.size()[0])
    .attr('height', layout.size()[1])
    .append('g')
    .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
    .selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', (d) => `${d.size}px`)
    .style('font-family', 'Impact')
    .style(
      'fill',
      (d) =>
        `hsl(${((d.size / Math.max(...words.map((word) => word.size))) * 120 + 240).toString(
          10, // Здесь нужно прописать логику генерации оттенка от синего к красному
        )}, 100%, 50%)`,
    )
    .attr('text-anchor', 'middle')
    .attr('transform', (d) => `translate(${[d.x, d.y].toString()})rotate(${d.rotate})`)
    .text((d) => d.text);
}

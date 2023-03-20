import * as d3 from 'd3';

export default function clear(): void {
  console.log('clearing');
  d3.selectAll('svg').remove();
}

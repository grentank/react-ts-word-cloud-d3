import type { WordObjectType } from './words';

type DataCBType = (words: WordObjectType[]) => {
  labels: WordObjectType['key'][];
  datasets: [
    {
      label: WordObjectType['key'];
      data: WordObjectType['value'][];
    },
  ];
};

const data: DataCBType = (words) => ({
  labels: words.map((d) => d.key),
  datasets: [
    {
      label: '',
      data: words.map((d) => 10 + d.value * 10),
    },
  ],
});

export type { DataCBType };

export default data;

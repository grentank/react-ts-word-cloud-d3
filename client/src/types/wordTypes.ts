export type WordType = {
    text: string;
    size: number;
}

export type LayoutWordType = {
    text:    string;
    size:    number;
    font:    'Impact';
    style:   'normal';
    weight:  'normal';
    rotate:  number;
    padding: number;
    x:       number;
    y:       number;
    width:   number;
    height:  number;
    xoff:    number;
    yoff:    number;
    x1:      number;
    y1:      number;
    x0:      number;
    y0:      number;
    hasText: true;
}

// export type Words = WordType[];
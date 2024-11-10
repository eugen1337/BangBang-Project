export type NodesMapType = {
  osm: {
    bounds: {
      '@minlat': string;
      '@minlon': string;
      '@maxlat': string;
      '@maxlon': string;
    };
    node: Node[];
    way: Way[];
  };
};

type Node = {
  '@id': string;
  '@visible': string;
  '@version': string;
  '@changeset': string;
  '@timestamp': string;
  '@user': string;
  '@uid': string;
  '@lat': string;
  '@lon': string;
  tag: Tag[];
};

type Way = {
  '@id': string;
  '@visible': string;
  '@version': string;
  '@changeset': string;
  '@timestamp': string;
  '@user': string;
  '@uid': string;
  nd: {
    '@ref': string;
  }[];
  tag: Tag[];
};

type Tag = { '@k': string; '@v': string };

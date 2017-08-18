export class DAG {
  edges: Edge[];
  vertices: Vertex[];
}

export class Edge {
  source: string;
  target: string;
  properties: {attributes: any, coder: string, id: string, type: string};
}

export class Vertex {
  id: string;
  properties: {attributes: any, class_: string, source?: string, transform?: string};
}

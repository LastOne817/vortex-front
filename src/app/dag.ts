export class DAG {
  edges: Edge[];
  vertices: Vertex[];
}

export class Edge {
  source: string;
  target: string;
  properties: {attributes: any, coder: string, id: string, type: string};
}

class VertexPropertyJson {
  attributes: any;
  class: string;
  source: string;
  transform: string;

  public toVertexProperty(): VertexProperty {
    return {
      attributes: this.attributes,
      class_: this.class,
      source: this.source,
      transform: this.transform
    }
  }
}

class VertexProperty {
  attributes: any;
  class_: string;
  source: string;
  transform: string;
}

export class Vertex {
  id: string;
  properties: VertexProperty;
}

export class DAGJson {
  edges: EdgeJson[];
  vertices: VertexJson[];

  public toDAG(): DAG {
    return {
      edges: this.edges.map((e: EdgeJson) => e.toEdge()),
      vertices: this.vertices.map((v: VertexJson) => v.toVertex()),
    }
  }
}

export class EdgeJson {
  src: string;
  dst: string;
  properties: {attributes: any, coder: string, id: string, type: string};

  public toEdge(): Edge {
    return {
      source: this.src,
      target: this.dst,
      properties: this.properties
    };
  }
}

export class VertexJson {
  id: string;
  properties: VertexPropertyJson;

  public toVertex(): Vertex {
    return {
      id: this.id,
      properties: this.properties.toVertexProperty()
    };
  }
}

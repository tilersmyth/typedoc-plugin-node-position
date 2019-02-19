export interface Position {
  nodeStart: number;
  nodeEnd: number;
  lineStart: number | null;
  lineEnd: number | null;
  colStart: number | null;
  colEnd: number | null;
}

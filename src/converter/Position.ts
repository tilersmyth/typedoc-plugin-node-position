import * as ts from "typescript";
import * as _ts from "../ts-internal";

import { Position } from "../models/Position";

export class ConverterNodePosition {
  node: any;

  constructor(node: any) {
    this.node = node;
  }

  private sourceFile() {
    return _ts.getSourceFileOfNode(this.node);
  }

  public lineAndCharacter(nodePos: number, nodeEnd: number): Position {
    const pos: ts.LineAndCharacter = ts.getLineAndCharacterOfPosition(
      this.sourceFile(),
      nodePos
    );

    const end: ts.LineAndCharacter = ts.getLineAndCharacterOfPosition(
      this.sourceFile(),
      nodeEnd
    );

    return {
      startLine: pos.line + 1,
      startCol: pos.character + 1,
      endLine: end.line + 1,
      endCol: end.character + 1
    };
  }

  public comment() {
    return _ts.getJSDocCommentRanges(this.node, this.sourceFile().text);
  }
}

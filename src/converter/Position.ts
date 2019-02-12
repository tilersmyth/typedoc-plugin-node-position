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

  private linePos(pos: any) {
    const fullText = this.sourceFile().getFullText();
    const textArr = fullText.split("\n");
    const lineText = textArr[pos.line];

    if (lineText.length > pos.character) {
      return {
        startLine: pos.line + 1,
        startCol: pos.character
      };
    }

    const nextLine = textArr[pos.line + 1];
    const firstChar = nextLine.search(/\S/) + 1;

    return {
      startLine: pos.line + 2,
      startCol: firstChar
    };
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
      ...this.linePos(pos),
      endLine: end.line + 1,
      endCol: end.character + 1
    };
  }

  public comment() {
    return _ts.getJSDocCommentRanges(this.node, this.sourceFile().text);
  }
}

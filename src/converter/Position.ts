import * as ts from "typescript";
import * as _ts from "../ts-internal";

import { Position } from "../models/Position";

export class ConverterNodePosition {
  node: any;

  constructor(node: any) {
    this.node = node;
  }

  private get sourceFile() {
    return _ts.getSourceFileOfNode(this.node);
  }

  private get fileTextArray() {
    const textString = this.sourceFile.getFullText();
    return textString.split("\n");
  }

  private linePos(pos: any) {
    if (!pos) {
      return {
        lineStart: null,
        colStart: null
      };
    }

    const lineText = this.fileTextArray[pos.line];

    if (lineText.length > pos.character) {
      return {
        lineStart: pos.line + 1,
        colStart: pos.character
      };
    }

    const nextLine = this.fileTextArray[pos.line + 1];
    const firstChar = nextLine.search(/\S/) + 1;

    return {
      lineStart: pos.line + 2,
      colStart: firstChar
    };
  }

  private nodePos(nodePos: any) {
    const lineText = this.fileTextArray[nodePos.line];

    if (lineText.length > nodePos.character) {
      return { nodeStart: nodePos.line + 1 };
    }

    return { nodeStart: nodePos.line + 2 };
  }

  public lineAndCharacter(start?: number, end?: number): Position {
    const nodeStart: ts.LineAndCharacter = ts.getLineAndCharacterOfPosition(
      this.sourceFile,
      this.node.pos
    );

    const nodeEnd: ts.LineAndCharacter = ts.getLineAndCharacterOfPosition(
      this.sourceFile,
      this.node.end
    );

    const lineStart: ts.LineAndCharacter | null = start
      ? ts.getLineAndCharacterOfPosition(this.sourceFile, start)
      : null;

    const lineEnd: ts.LineAndCharacter | null = end
      ? ts.getLineAndCharacterOfPosition(this.sourceFile, end)
      : null;

    return {
      ...this.nodePos(nodeStart),
      nodeEnd: nodeEnd.line + 1,
      ...this.linePos(lineStart),
      lineEnd: lineEnd ? lineEnd.line + 1 : null,
      colEnd: lineEnd ? lineEnd.character + 1 : null
    };
  }

  public comment() {
    return _ts.getJSDocCommentRanges(this.node, this.sourceFile.text);
  }
}

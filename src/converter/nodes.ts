import * as ts from "typescript";
import {
  Component,
  ConverterComponent
} from "typedoc/dist/lib/converter/components";
import { Converter, Context } from "typedoc/dist/lib/converter";

import * as _ts from "../ts-internal";
import { NodePosition } from "../models";

@Component({ name: "node-position" })
export class NodePositionPlugin extends ConverterComponent {
  commentStart: number = 0;

  initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
      [Converter.EVENT_CREATE_SIGNATURE]: this.onDeclaration,
      [Converter.EVENT_CREATE_PARAMETER]: this.onDeclaration
    });
  }

  private position(sourceFile: ts.SourceFile, nodePos: any): number {
    const position: ts.LineAndCharacter = ts.getLineAndCharacterOfPosition(
      sourceFile,
      nodePos
    );
    return position.line + 1;
  }

  private comments(
    sourceFile: ts.SourceFile,
    node: any
  ): { line: number; size: number } | null {
    const comment = _ts.getJSDocCommentRanges(node, sourceFile.text);

    if (!comment || comment.length === 0) {
      return null;
    }

    const { pos, end } = comment[0];
    const commentStart = this.position(sourceFile, pos);
    const commentEnd = this.position(sourceFile, end);

    return { line: commentStart, size: commentEnd + 1 - commentStart };
  }

  private onDeclaration(_: Context, reflection: NodePosition, node?: any) {
    if (!node) {
      return;
    }

    const sourceFile = _ts.getSourceFileOfNode(node);

    const comments = this.comments(sourceFile, node);

    let commentStart: number = 0;

    if (comments && reflection.comment) {
      commentStart = comments.line;
      reflection.comment.position = comments;
    }

    const nodeStart = this.position(
      sourceFile,
      node["name"] && node["name"].end ? node["name"].end : node.pos
    );

    const nodeEnd = this.position(sourceFile, node.end);

    reflection.position = {
      line: commentStart > 0 ? commentStart : nodeStart,
      size: nodeEnd - nodeStart
    };
  }
}

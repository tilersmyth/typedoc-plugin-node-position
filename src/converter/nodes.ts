import {
  Component,
  ConverterComponent
} from "typedoc/dist/lib/converter/components";
import { Converter, Context } from "typedoc/dist/lib/converter";

import {
  NodePosition,
  PositionDeclarationReflection,
  Position
} from "../models";

import { NodePositionFindTypes, NodePositionAssignTypes } from "./types";
import { ConverterNodePosition } from "./Position";

@Component({ name: "node-position" })
export class NodePositionPlugin extends ConverterComponent {
  initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
      [Converter.EVENT_CREATE_SIGNATURE]: this.onDeclaration,
      [Converter.EVENT_CREATE_PARAMETER]: this.onDeclaration,
      [Converter.EVENT_RESOLVE]: this.onResolve
    });
  }

  private comments(node: any): Position | null {
    const position = new ConverterNodePosition(node);

    if (!position.comment() || position.comment().length === 0) {
      return null;
    }

    const { pos, end } = position.comment()[0];
    const commentPosition = position.lineAndCharacter(pos, end);

    return commentPosition;
  }

  private onResolve(_: Context, reflection: PositionDeclarationReflection) {
    new NodePositionAssignTypes(reflection).assign();
  }

  private onDeclaration(_: Context, reflection: NodePosition, node?: any) {
    if (!node) {
      return;
    }

    const comments = this.comments(node);
    if (comments && reflection.comment) {
      reflection.comment.position = comments;
    }

    // HANDLE TYPES
    new NodePositionFindTypes(reflection, node).find();

    const position = new ConverterNodePosition(node).lineAndCharacter(
      node["name"] && node["name"].pos ? node["name"].pos : node.pos,
      node["name"] && node["name"].end ? node["name"].end : node.end
    );

    reflection.position = position;
  }
}

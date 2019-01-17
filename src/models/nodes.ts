import { Reflection } from "typedoc/dist/lib/models/reflections/index";
import { CommentPosition } from "./Comments";
import { Position } from "./Position";
import { PositionDeclarationReflection } from "./types/PositionDeclarationReflection";

export class NodePosition extends Reflection {}

export interface NodePosition {
  position: Position;
  comment: CommentPosition;
  type: PositionDeclarationReflection;
}

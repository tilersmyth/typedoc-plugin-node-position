import { Reflection } from "typedoc/dist/lib/models/reflections/index";
import { CommentPosition } from "./comments";
import { Position } from "./position";

export class NodePosition extends Reflection {}

export interface NodePosition {
  position: Position;
  comment: CommentPosition;
}

import { Comment } from "typedoc/dist/lib/models";
import { Position } from "./Position";

export class CommentPosition extends Comment {
  shortText: string;
  text: string;
  position?: Position;

  constructor(shortText?: string, text?: string) {
    super();
    this.shortText = shortText || "";
    this.text = text || "";
  }
}

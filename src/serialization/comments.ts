import { Component } from "typedoc/dist/lib/converter/components";
import { SerializerComponent } from "typedoc/dist/lib/serialization";
import { Comment } from "typedoc/dist/lib/models/comments";

import { CommentPosition } from "../models";

@Component({ name: "serializer:comment-position" })
export class CommentPositionPluginSerializer extends SerializerComponent<
  CommentPosition
> {
  static PRIORITY = 1000;

  serializeGroup = (instance: unknown): boolean => {
    return instance instanceof CommentPosition;
  };

  serializeGroupSymbol = Comment;

  supports = (t: unknown) => {
    return true;
  };

  toObject(lineNumberModel: CommentPosition, obj?: any): any {
    obj = obj || {};

    if (lineNumberModel.position) {
      obj.position = lineNumberModel.position;
    }

    if (lineNumberModel) return obj;
  }
}

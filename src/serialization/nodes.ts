import { Component } from "typedoc/dist/lib/converter/components";
import { ReflectionSerializerComponent } from "typedoc/dist/lib/serialization";

import { NodePosition } from "../models";

@Component({ name: "serializer:node-position" })
export class NodePositionPluginSerializer extends ReflectionSerializerComponent<
  NodePosition
> {
  serializeGroup = (instance: unknown): boolean => {
    return instance instanceof NodePosition;
  };

  supports = (t: unknown) => {
    return true;
  };

  toObject(lineNumberModel: NodePosition, obj?: any): any {
    obj = obj || {};

    if (lineNumberModel.position) {
      obj.position = lineNumberModel.position;
    }

    if (lineNumberModel) return obj;
  }
}

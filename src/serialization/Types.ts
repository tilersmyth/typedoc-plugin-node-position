import { Component } from "typedoc/dist/lib/converter/components";
import { TypeSerializerComponent } from "typedoc/dist/lib/serialization";

import { TypePosition } from "../models";

@Component({ name: "serializer:type-position" })
export class TypePositionPluginSerializer extends TypeSerializerComponent<
  TypePosition
> {
  serializeGroup = (instance: unknown): boolean => {
    return instance instanceof TypePosition;
  };

  supports = (t: unknown) => {
    return true;
  };

  toObject(lineNumberModel: TypePosition, obj?: any): any {
    obj = obj || {};

    if (lineNumberModel.position) {
      obj.position = lineNumberModel.position;
    }

    if (lineNumberModel) return obj;
  }
}

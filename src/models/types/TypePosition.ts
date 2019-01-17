import { Type, IntrinsicType } from "typedoc/dist/lib/models/types/index";
import { Position } from "../Position";

export class TypePosition extends Type {
  name: string;
  position?: Position;

  constructor(name: string) {
    super();
    this.name = name;
  }

  clone(): Type {
    return new IntrinsicType(this.name);
  }
}

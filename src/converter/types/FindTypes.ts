import { NodePosition } from "../../models";
import { ConverterNodePosition } from "../Position";

export class NodePositionFindTypes {
  reflection: NodePosition;
  node: any;

  constructor(reflection: NodePosition, node: any) {
    this.reflection = reflection;
    this.node = node;
  }

  public find() {
    const position = new ConverterNodePosition(this.node);

    if (this.node["type"]) {
      this.reflection["type_pos"] = position.lineAndCharacter(
        this.node["type"].pos,
        this.node["type"].end
      );

      if (this.node["type"]["typeArguments"]) {
        for (const typeArg of this.node["type"]["typeArguments"]) {
          this.reflection["type_pos"]["typeArguments"] = [];
          this.reflection["type_pos"]["typeArguments"].push(
            position.lineAndCharacter(typeArg.pos, typeArg.end)
          );
        }
      }
    }
  }
}

import { PositionDeclarationReflection } from "../../models";
import { typePos, typeKeys } from "./keys";

export class NodePositionResolveTypes {
  reflection: PositionDeclarationReflection;
  node: any;

  constructor(reflection: PositionDeclarationReflection) {
    this.reflection = reflection;
  }

  private append(reflection: any, pos_reflection: any): void {
    if (pos_reflection instanceof Array) {
      for (let i = 0; i < pos_reflection.length; i++) {
        reflection[i].position = pos_reflection[i].position;
        this.find(reflection[i], pos_reflection[i]);
      }
      return;
    }

    reflection.position = pos_reflection.position;
  }

  private find(reflection: any, pos_reflection: any): void {
    for (const prop in reflection) {
      if (typeKeys.indexOf(prop) > -1) {
        // skip if not array or object
        if (
          !(reflection[prop] instanceof Array) &&
          !(reflection[prop] instanceof Object)
        ) {
          continue;
        }

        this.append(reflection[prop], pos_reflection[prop]);

        this.find(reflection[prop], pos_reflection[prop]);
      }
    }
  }

  public assign(): void {
    // Find placeholder
    const pos_reflection = this.reflection[typePos];

    if (!pos_reflection) {
      return;
    }

    this.find(this.reflection, pos_reflection);
  }
}

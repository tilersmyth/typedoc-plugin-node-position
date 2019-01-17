import { PositionDeclarationReflection } from "../../models";

export class NodePositionAssignTypes {
  reflection: PositionDeclarationReflection;
  node: any;

  constructor(reflection: PositionDeclarationReflection) {
    this.reflection = reflection;
  }

  private appendPosition(reflection: PositionDeclarationReflection) {
    if (reflection["type_pos"]) {
      const position = reflection["type_pos"];
      reflection.type.position = position;

      const typeArgs = reflection["type_pos"]["typeArguments"];
      if (typeArgs) {
        for (let i = 0; i < typeArgs.length; i++) {
          const position = typeArgs[i];
          reflection.type["typeArguments"][i].position = position;
        }
      }
    }
  }

  private findTypes(reflection: PositionDeclarationReflection) {
    if (Array.isArray(reflection)) {
      for (const node of reflection) {
        this.findTypes(node);
        continue;
      }
    }

    for (const prop in reflection) {
      if (prop === "type") {
        this.appendPosition(reflection);
      }

      if (Array.isArray(reflection[prop])) {
        this.findTypes(reflection[prop]);
        continue;
      }
    }
  }

  public assign() {
    this.findTypes(this.reflection);
  }
}

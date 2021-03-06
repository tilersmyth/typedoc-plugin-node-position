import { NodePosition } from "../../models";
import { ConverterNodePosition } from "../Position";
import { typePos, typeKeys } from "./keys";

export class NodePositionFindTypes {
  reflection: NodePosition;
  node: any;

  constructor(reflection: NodePosition, node: any) {
    this.reflection = reflection;
    this.node = node;
  }

  private append(reflection: any, node: any, prop: any): void {
    if (node[prop] instanceof Array) {
      reflection[prop] = [];
      for (let i = 0; i < node[prop].length; i++) {
        const position = new ConverterNodePosition(node[prop][i]);
        reflection[prop].push({
          position: position.lineAndCharacter(
            node[prop][i].pos,
            node[prop][i].end
          )
        });

        this.find(node[prop][i], reflection[prop][i], false);
      }
      return;
    }

    const position = new ConverterNodePosition(node[prop]);

    reflection[prop] = {};
    reflection[prop].position = position.lineAndCharacter(
      node[prop].pos,
      node[prop].end
    );
  }

  private find(node: any, reflection: any, init: boolean): void {
    for (const prop in node) {
      if (typeKeys.indexOf(prop) > -1) {
        // skip if not array or object
        if (!(node[prop] instanceof Array) && !(node[prop] instanceof Object)) {
          continue;
        }

        if (init) {
          // Set placeholder
          reflection[typePos] = {};
          reflection = reflection[typePos];
        }

        this.append(reflection, node, prop);

        this.find(node[prop], reflection[prop], false);
      }
    }
  }

  public run(): void {
    this.find(this.node, this.reflection, true);
  }
}

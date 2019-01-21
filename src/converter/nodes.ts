import {
  Component,
  ConverterComponent
} from "typedoc/dist/lib/converter/components";
import { Converter, Context } from "typedoc/dist/lib/converter";
import { OptionsReadMode } from "typedoc/dist/lib/utils/options";

import {
  NodePosition,
  PositionDeclarationReflection,
  Position
} from "../models";

import { NodePositionFindTypes, NodePositionResolveTypes } from "./types";
import { ConverterNodePosition } from "./Position";

@Component({ name: "node-position" })
export class NodePositionPlugin extends ConverterComponent {
  files: string[] = [];
  init: boolean = false;

  initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_BEGIN]: this.onBegin,
      [Converter.EVENT_FILE_BEGIN]: this.onFileBegin,
      [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
      [Converter.EVENT_CREATE_SIGNATURE]: this.onDeclaration,
      [Converter.EVENT_CREATE_PARAMETER]: this.onDeclaration,
      [Converter.EVENT_CREATE_TYPE_PARAMETER]: this.onTypeParameter,
      [Converter.EVENT_RESOLVE]: this.onResolve
    });
  }

  /**
   * Triggered when the converter begins converting a project.
   */
  private onBegin() {
    // store options
    const options = this.application.options;
    options.read({}, OptionsReadMode.Prefetch);
    this.files = options.getValue("npFiles");
  }

  private onFileBegin(_: Context, __: any, file: any) {
    const updateFile = this.files.findIndex(
      (f: string) => file.fileName.indexOf(f) > -1
    );

    this.init = updateFile > -1 ? true : false;
  }

  private comments(node: any): Position | null {
    const position = new ConverterNodePosition(node);

    if (!position.comment() || position.comment().length === 0) {
      return null;
    }

    const { pos, end } = position.comment()[0];
    const commentPosition = position.lineAndCharacter(pos, end);

    return commentPosition;
  }

  private onResolve(_: Context, reflection: PositionDeclarationReflection) {
    new NodePositionResolveTypes(reflection).assign();
  }

  private onTypeParameter(_: Context, reflection: NodePosition, node?: any) {
    if (!node || !this.init) {
      return;
    }

    // hack fix for now - Not sure why key is "constraint" on node,
    // while "type" on reflection
    // seems to only occur on typeParameter
    if (node.constraint) {
      node["type"] = node.constraint;
    }

    new NodePositionFindTypes(reflection, node).run();

    const position = new ConverterNodePosition(node).lineAndCharacter(
      node["name"] && node["name"].pos ? node["name"].pos : node.pos,
      node["name"] && node["name"].end ? node["name"].end : node.end
    );

    reflection.position = position;
  }

  private onDeclaration(_: Context, reflection: NodePosition, node?: any) {
    if (!node || !this.init) {
      return;
    }

    const comments = this.comments(node);
    if (comments && reflection.comment) {
      reflection.comment.position = comments;
    }

    // HANDLE TYPES
    new NodePositionFindTypes(reflection, node).run();

    const position = new ConverterNodePosition(node).lineAndCharacter(
      node["name"] && node["name"].pos ? node["name"].pos : node.pos,
      node["name"] && node["name"].end ? node["name"].end : node.end
    );

    reflection.position = position;
  }
}

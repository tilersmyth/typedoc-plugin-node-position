import { DeclarationReflection } from "typedoc/dist/lib/models/reflections/index";
import { TypePosition } from "./TypePosition";

export class PositionDeclarationReflection extends DeclarationReflection {}

export interface PositionDeclarationReflection {
  type: TypePosition;
  children: PositionDeclarationReflection[];
}

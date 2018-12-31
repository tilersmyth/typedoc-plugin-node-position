import * as ts from "typescript";
const tsany = ts as any;

// https://github.com/Microsoft/TypeScript/blob/v2.1.4/src/compiler/utilities.ts#L152
export function getSourceFileOfNode(node: ts.Node): ts.SourceFile {
  return tsany.getSourceFileOfNode.apply(null, arguments);
}

export function getJSDocCommentRanges(node: ts.Node, text: string) {
  return tsany.getJSDocCommentRanges.apply(null, arguments);
}

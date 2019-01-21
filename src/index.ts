import { ParameterType } from "typedoc/dist/lib/utils/options/declaration";

import { NodePositionPlugin } from "./converter";
import {
  NodePositionPluginSerializer,
  CommentPositionPluginSerializer,
  TypePositionPluginSerializer
} from "./serialization";

module.exports = function(PluginHost: any) {
  const app = PluginHost.owner;

  app.options.addDeclaration({
    component: "files",
    help:
      "Node Position Plugin: Specify files that require node position detail",
    name: "npFiles",
    type: ParameterType.Array
  });

  app.converter.addComponent("node-position", NodePositionPlugin);

  app.serializer.addComponent(
    "serializer:node-position",
    NodePositionPluginSerializer
  );

  app.serializer.addComponent(
    "serializer:comment-position",
    CommentPositionPluginSerializer
  );

  app.serializer.addComponent(
    "serializer:type-position",
    TypePositionPluginSerializer
  );
};

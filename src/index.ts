import { NodePositionPlugin } from "./converter";
import {
  NodePositionPluginSerializer,
  CommentPositionPluginSerializer
} from "./serialization";

module.exports = function(PluginHost: any) {
  const app = PluginHost.owner;

  app.converter.addComponent("node-position", NodePositionPlugin);

  app.serializer.addComponent(
    "serializer:node-position",
    NodePositionPluginSerializer
  );

  app.serializer.addComponent(
    "serializer:comment-position",
    CommentPositionPluginSerializer
  );
};

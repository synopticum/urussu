const CommentModel = require("../../db/comment.model");

module.exports = async function (fastify, opts) {
  fastify.register(registerRoutes);
};

async function registerRoutes(fastify, opts) {
  fastify.route({
    method: "GET",
    url: ["/:entityType/:entityId/comments"],
    handler: get,
  });

  fastify.route({
    method: "GET",
    url: ["/:entityType/:entityId/comments/:imageId"],
    handler: get,
  });

  async function get(request, reply) {
    const originId = request.params.entityId;
    const imageId = request.params.imageId;
    const query = {
      originId: { $regex: originId, $options: "i" },
    };

    if (imageId) {
      query.imageId = imageId;
    }

    try {
      reply.type("application/json").code(200);
      return await CommentModel.find(query).select({ _id: 0, __v: 0 });
    } catch (e) {
      reply.type("application/json").code(500);
      console.error(e);
      return { error: `Unable to get comments: error when finding in db` };
    }
  }
}

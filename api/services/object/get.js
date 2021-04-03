const helpers = require("../helpers");

module.exports = async function (fastify, opts) {
  fastify.register(registerRoutes);
};

async function registerRoutes(fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/objects/:object",
    handler: get,
  });

  fastify.route({
    method: "GET",
    url: "/paths/:path",
    handler: get,
  });

  async function get(request, reply) {
    const type = helpers.getType(request.params);
    const id = request.params[type];
    const Model = helpers.getModel(type);
    const prepare = helpers.getPrepare(type);

    try {
      const raw = await Model.findOne({
        id: { $regex: id, $options: "i" },
      }).select({ _id: 0, __v: 0 });

      if (raw) {
        reply.type("application/json").code(200);
        return prepare(raw);
      } else {
        reply.type("application/json").code(404);
        return { error: `Unable to get ${type}: ${type} ${id} was not found` };
      }
    } catch (e) {
      reply.type("application/json").code(500);
      console.error(e);
      return { error: `Unable to get ${type}: error when finding in db` };
    }
  }
}

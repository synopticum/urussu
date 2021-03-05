const { ObjectModel, prepare } = require("../../db/object.model");

module.exports = async function (fastify, opts) {
  fastify.register(registerRoutes);
};

async function registerRoutes(fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/objects",
    handler: get,
  });

  async function get(request, reply) {
    const hasFilters = request.query && request.query.include;
    let type;

    if (hasFilters && request.query.include.includes("objects"))
      type = "object";
    if (hasFilters && request.query.include.includes("circles"))
      type = "circle";

    if (hasFilters && request.query.include.includes(`${type}s`)) {
      try {
        reply.type("application/json").code(200);
        const raw = await ObjectModel.find({ type });
        return prepare(raw);
      } catch (e) {
        reply.type("application/json").code(500);
        console.error(e);
        return { error: `Unable to get ${type}s: error when finding in db` };
      }
    }

    try {
      reply.type("application/json").code(200);
      const raw = await ObjectModel.find();
      return prepare(raw);
    } catch (e) {
      reply.type("application/json").code(500);
      console.error(e);
      return { error: `Unable to get objects: error when finding in db` };
    }
  }
}

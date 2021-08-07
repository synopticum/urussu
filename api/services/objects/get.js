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
    let type;

    if (request.query) {
      const { street, house } = request.query;

      if (street && house) {
        try {
          reply.type("application/json").code(200);
          const raw = await ObjectModel.find({ street });

          const isEven = parseInt(house) % 2 === 0;
          const filteredRaw = raw
            .filter((model) =>
              isEven
                ? !Boolean(parseInt(model._doc.house) % 2)
                : Boolean(parseInt(model._doc.house) % 2)
            )
            .sort((a, b) => parseInt(a._doc.house) - parseInt(b._doc.house));

          const index = filteredRaw.findIndex(
            (model) => model._doc.house === house
          );

          const previousHouse = filteredRaw[index - 1];
          const nextHouse = filteredRaw[index + 1];

          return prepare([previousHouse, nextHouse]);
        } catch (e) {
          reply.type("application/json").code(500);
          console.error(e);
          return {
            error: `Unable to get ${street}s: error when finding in db`,
          };
        }
      }

      if (request.query.include && request.query.include.includes("objects"))
        type = "object";
      if (request.query.include && request.query.include.includes("circles"))
        type = "circle";

      if (request.query.include && request.query.include.includes(`${type}s`)) {
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

const mapImages = (imagesDto) => {
  if (!imagesDto) {
    return null;
  }

  const imagesMapped = {};

  Object.entries(imagesDto).forEach((imageDto) => {
    const year = imageDto[0];
    const url = imageDto[1];
    const decade = parseInt(`${year.toString().substring(0, 3)}0`);

    if (!imagesMapped[decade]) {
      imagesMapped[decade] = [];
    }

    imagesMapped[decade].push({ year, url });
  });

  return imagesMapped;
};

const shortenId = (id) => id.split("-")[0];

const prepare = (raw, map) => (raw.length ? raw.map(map) : map(raw));

const commonMap = (model) => {
  const { _doc: data } = model;
  data.images = mapImages(data.images);
  data.id = shortenId(data.id);

  return data;
};

module.exports = {
  mapImages,
  shortenId,
  prepare,
  commonMap,
};

const md5 = require("md5");

const hashImage = (year, url) => {
  return `${year},${md5(`${year},${url}`).substring(0, 7)}`;
};

const mapImages = (imagesDto) => {
  if (!imagesDto) {
    return null;
  }

  const imagesMapped = {};

  Object.entries(imagesDto).forEach((imageDto) => {
    const year = imageDto[0];
    const url = imageDto[1];
    const id = hashImage(year, url);
    const decade = parseInt(`${year.toString().substring(0, 3)}0`);
    let nestedImage = null;

    const nested = Object.entries(imagesDto).find(([targetYear]) =>
      targetYear.startsWith(`${year}_`)
    );

    if (nested) {
      const [year, url] = nested;
      const id = hashImage(year, url);
      nestedImage = { id, year: year.split("_")[1], url };
    }

    const isNested = (image) => image[0].includes("_");

    if (!imagesMapped[decade]) {
      imagesMapped[decade] = [];
    }

    if (!isNested(imageDto)) {
      const image = { id, year, url };

      if (nestedImage) {
        image.image = nestedImage;
      }

      imagesMapped[decade].push(image);
    }
  });

  return imagesMapped;
};

const unMapImages = (imagesMapped) => {
  if (!imagesMapped) {
    return null;
  }

  const imagesDto = {};
  const _images = [];

  Object.entries(imagesMapped)
    .flat(2)
    .filter((item) => typeof item !== "string")
    .forEach((item) => {
      _images.push(item);

      if (item.image) {
        _images.push(item.image);
      }
    });

  _images.forEach((item) => {
    const yearName = item.id.split(",")[0];
    imagesDto[yearName] = item.url;
  });

  return imagesDto;
};

const shortenId = (id) => id.split("-")[0];

const prepare = (raw, map) => (raw.length ? raw.map(map) : map(raw));

const commonMap = (model) => {
  if (!model) {
    return null;
  }

  const { _doc: data } = model;

  if (!data) {
    return [];
  }

  data.images = mapImages(data.images);
  data.id = shortenId(data.id);

  return data;
};

module.exports = {
  mapImages,
  unMapImages,
  shortenId,
  prepare,
  commonMap,
  hashImage,
};

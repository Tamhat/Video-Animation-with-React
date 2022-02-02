const images = require.context("../assets", true);

const getImagePath = (index) => {
  return images(`./ezgif-frame-${index.toString().padStart(3, "0")}.png`);
};

export default getImagePath;

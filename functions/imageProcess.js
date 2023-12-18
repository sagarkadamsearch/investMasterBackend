const Jimp = require('jimp');

// Function to process and resize image using jimp
const processAndResizeImage = async (imageBuffer) => {
    try {
      const image = await Jimp.read(imageBuffer);
      
      // Resize the image,
      const resizedImageBuffer = await image.resize(200, 200).quality(100).getBufferAsync(Jimp.AUTO);
 
              return resizedImageBuffer;
      }
      catch (error) {
      throw error;
    }
  };

  module.exports = {processAndResizeImage};
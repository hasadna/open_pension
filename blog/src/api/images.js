const http = require('http');
const fs = require('fs');

/**
 * Ths function pull a given image form another place, save it, and return the relative path.
 *
 * @param url
 *  The URL of the image.
 *
 * @returns {string}
 *  The relative path of the saved image.
 */
export const saveImageFromBackendAndSwap = (url) => {

  const file = fs.createWriteStream("file.jpg");
  const request = http.get(url, function(response) {
    response.pipe(file);
  });

  return 'aasdsad';
};

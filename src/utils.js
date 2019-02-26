import JSZip from "jszip";

import { thumbs } from "./db/gameboy.js";

export const getDataUri = url =>
  new Promise(resolve => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error(JSON.stringify(response));
      })
      .then(blob => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result);
        };

        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.warn(`Error getting data URI for ${url}:`, error);

        resolve(false);
      });
  });

export const buffersEqual = (buf1, buf2) => {
  if (buf1.byteLength !== buf2.byteLength) {
    return false;
  }

  const ta1 = new Uint8Array(buf1),
    ta2 = new Uint8Array(buf2);

  for (const [i] of ta1.entries()) {
    if (ta1[i] !== ta2[i]) {
      return false;
    }
  }

  return true;
};

export const getBinaryString = arrayBuffer =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.readAsBinaryString(new Blob([arrayBuffer]));
  });

export const unzip = async arrayBuffer => {
  const zip = new JSZip();

  try {
    const result = await zip.loadAsync(arrayBuffer);
    const [filename] = Object.keys(result.files);

    return await zip.file(filename).async(`arraybuffer`);
  } catch (error) {
    console.info(`A file couldn't be unzipped. Probably wasn't zipped.`);
  }

  return arrayBuffer;
};

export const getThumbUri = async title => {
  const processUri = uri => {
    if (!uri && !navigator.onLine) {
      return `reattempt`;
    } else if (!uri) {
      return false;
    }

    return uri;
  };

  const thumbUri = processUri(
    await getDataUri(thumbs.dmg.replace(`%s`, encodeURIComponent(title)))
  );

  if (typeof thumbUri === `string`) {
    return thumbUri;
  }

  return getDataUri(thumbs.cgb.replace(`%s`, encodeURIComponent(title)));
};

export const thumbIsUri = thumb => thumb !== false && thumb !== `reattempt`;

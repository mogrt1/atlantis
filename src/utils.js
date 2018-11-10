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

import request from "postman-request";

export const berita = (callback) => {
  const url =
    "http://api.mediastack.com/v1/news?access_key=891565affafbc382358c86e647cfcb71";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Tidak dapat terkoneksi ke layanan", undefined);
    } else if (!response.body.data) {
      callback(
        "Tidak dapat menemukan berita",
        undefined
      );
    } else {
      callback(undefined, {
        data: response.body.data
      });
    }
  });
};

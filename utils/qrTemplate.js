/* eslint-disable max-len */
const qrTemplete = (imageNumber) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sticker</title>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
  
      <style>
        * {
          border: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: "Roboto", "sans-serif";
        }
        .image {
          width: 100%;
          height: 100%;
          padding: 20px;
        }
        .qrImage {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <main
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px;
        "
      >
        <div
          id="sticker"
          style="
            width: 500px;
            height: 737px;
            background-color: #eb6506;
            border: 1px solid #7f8fa6;
            border-radius: 10px;
          "
        >
          <div
            style="
              font-size: 80px;
              display: flex;
              justify-content: center;
              column-gap: 40px;
              align-items: center;
              height: 20%;
              color: white;
            "
          >
            <svg
              style="font-size: 80px; fill: white"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z"
              />
            </svg>
            <p style="font-weight: 800">Call Me!</p>
          </div>
          <div style="display: flex; justify-content: center; height: 65%">
            <div
              style="
                margin: 0 20px;
                flex: 1;
                border: 2px solid white;
                border-radius: 10px;
                align-items: center;
                padding-top: 30px;
                background-color: #fdcb6e;
              "
            >
              <div style="height: 50%; aspect-ratio: 1/1; margin: 0 auto">
                <img src="http://localhost:8000/${imageNumber}.jpg" class="qrImage" alt="Qr code" />
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  height: 50%;
                  justify-content: space-evenly;
                "
              >
                <div>
                  <p
                    style="
                      margin-top: 10px;
                      font-size: 20px;
                      text-align: center;
                      font-weight: 600;
                      color: #273c75;
                    "
                  >
                    ${imageNumber}
                  </p>
                  <p
                    style="
                      margin-top: 5px;
                      font-size: 20px;
                      text-align: center;
                      font-weight: 600;
                      color: #273c75;
                    "
                  >
                    Vahan <span>Setu</span>
                  </p>
                </div>
                <div
                  style="
                    width: 60%;
                    height: 1px;
                    background-color: #fff;
                    margin: 0 auto;
                  "
                ></div>
                <div>
                  <p
                    style="
                      font-size: 20px;
                      text-align: center;
                      font-weight: 600;
                      color: #273c75;
                    "
                  >
                    Scan QR to
                  </p>
                  <p
                    style="
                      line-height: normal;
                      margin-top: 5px;
                      font-size: 25px;
                      text-align: center;
                      font-weight: bold;
                      color: #273c75;
                    "
                  >
                    Contact Vehicle Owner
                  </p>
                  <p
                    style="
                      margin-top: 5px;
                      font-size: 20px;
                      text-align: center;
                      font-weight: 600;
                      color: #273c75;
                    "
                  >
                    Call: 8881831836
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style="display: flex; height: 15%; width: 100%">
            <div style="width: 50%">
              <img
                class="image"
                src="http://localhost:8000/playStore.svg"
                alt="play store icon"
              />
            </div>
            <div style="width: 50%">
              <img
                class="image"
                src="http://localhost:8000/appStore.svg"
                alt="app store icon"
              />
            </div>
          </div>
        </div>
      </main>
    </body>
  </html>
  
              `;
  return html;
};

module.exports = qrTemplete;

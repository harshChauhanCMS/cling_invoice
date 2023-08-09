const qrTemplete = (imageNumber) => {
  const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>QR Code</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  background-color: #fff;
                  font-family: sans-serif;
              }   
              .container {
                  width: 100%;
                  height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
              }
              .qr-code {
                  width: 500px;
                  height: 400px;
                  background-color: #fff;
                  border: 1px solid #000;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
              }
              .qr-code img {
                  width: 400px;
                  height: 400px;
              }
              .play-store {
                  width: 100%;
                  height: 100px;
                  background-color: #000;
                  display: flex;
                  flex-direction: row;
                  justify-content: end;
                  align-items: center;
              }
              .text {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: "center;
                    align-items: center;
                    margin-bottom: 20px;
                }
          </style>
      </head>
      <body>
          <div class="container">
                <h4># ${imageNumber}</h4>
              <div class="qr-code">
                  <img src="http://localhost:8000/${imageNumber}.jpg" alt="QR Code">
              </div> 
          </div>
      </body>
      </html>
      `;
  return html;
};

module.exports = qrTemplete;

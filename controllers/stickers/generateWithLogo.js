const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');
const sticker = require('../../model/stickersModel');
const qrTemplete = require('../../utils/qrTemplate');
async function create(dataForQRcode, center_image, width, cwidth, i) {
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(canvas, dataForQRcode, {
    errorCorrectionLevel: 'H',
    margin: 1,
    color: {
      dark: '#273c75',
      light: '#fdcb6e',
    },
  });

  const ctx = canvas.getContext('2d');
  const img = await loadImage('http://localhost:8000/logo.jpg');
  const center = (width - cwidth) / 1;

  ctx.drawImage(img, center, center, cwidth, 50);

  fs.writeFileSync(`./public/${i}.jpg`, canvas.toBuffer('image/jpeg'));
}

const generate = async (req, res) => {
  try {
    const { quantity } = req.query;
    const lastSticker = await sticker.find().sort({ _id: -1 }).limit(1);
    const from = (lastSticker[0]._id || 0) + 1;
    const to = parseInt(from) + parseInt(quantity) - 1;
    const qrcodes = [];
    const stickerToCreate = [];

    for (let i = parseInt(from); i <= parseInt(to); i++) {
      fs.writeFileSync(`./public/${i}.jpg`, '');
      fs.writeFileSync(`./qrOutputs/${i}.jpg`, '');
      const data = {
        sticker_id: i,
        scan_url: `${process.env.SCAN_URL}?sticker_id=${i}`,
      };

      create(JSON.stringify(data), './public/logo.jpg', 150, 70, i).then(
        async () => {
          await nodeHtmlToImage({
            output: `./qrOutputs/${i}.jpg`,
            html: qrTemplete(i),
            selector: '#sticker',
          });
          stickerToCreate.push({
            _id: i,
            status: 'created',
          });
        }
      );

      qrcodes.push(`./public/${i}.jpg`);
    }
    await sticker.insertMany(stickerToCreate);
    return res.status(200).json({
      success: true,
      data: qrcodes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = generate;

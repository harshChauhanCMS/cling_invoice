const qrcode = require('qrcode');
const fs = require('fs');
const htmltoimage = require('node-html-to-image');
const qrTemplete = require('../../utils/qrTemplate');
const sticker = require('../../model/stickersModel');
exports.generateSticker = async (req, res) => {
  try {
    const { from, to } = req.query;
    const qrcodes = [];
    for (let i = parseInt(from); i <= parseInt(to); i++) {
      const data = {
        sticker_id: i,
        scan_url: `${process.env.SCAN_URL}?sticker_id=${i}`,
      };
      fs.writeFileSync(`./public/${i}.jpg`, '');
      fs.writeFileSync(`./qrOutputs/${i}.jpg`, '');
      qrcode.toFile(
        `./public/${i}.jpg`,
        JSON.stringify(data),
        {
          color: {
            dark: '#64194d',
            light: '#ffffff',
          },
          height: 500,
          width: 500,
        },
        (err) => {
          if (err) throw err;
        }
      );
      qrcodes.push(`./public/${i}.jpg`);
    }

    for (let i = parseInt(from); i <= parseInt(to); i++) {
      await htmltoimage({
        output: `./qrOutputs/${i}.jpg`,
        html: qrTemplete(i),
        selector: '.qr-code',
      });
      await sticker.create({
        _id: i,
        status: 'created',
      });
    }

    res.status(200).json({ qrcodes });
  } catch (error) {
    res.status(500).json({ error: `Error in generating sticker ${error}` });
  }
};

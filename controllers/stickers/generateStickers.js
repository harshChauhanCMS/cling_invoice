const qrcode = require('qrcode');
const fs = require('fs');
const htmltoimage = require('node-html-to-image');
const qrTemplete = require('../../utils/qrTemplate');
const sticker = require('../../model/stickersModel');
exports.generateSticker = async (req, res) => {
  try {
    const { quantity } = req.query;
    const lastSticker = await sticker.find().sort({ _id: -1 }).limit(1);
    const from = (lastSticker[0]._id || 0) + 1;
    const to = parseInt(from) + parseInt(quantity) - 1;
    const qrcodes = [];
    const stickerToCreate = [];
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
            dark: '#273c75',
            light: '#fdcb6e',
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
        selector: '#sticker',
      });
      stickerToCreate.push({
        _id: i,
        status: 'created',
      });
    }

    await sticker.insertMany(stickerToCreate);

    res.status(200).json({ qrcodes });
  } catch (error) {
    res.status(500).json({ error: `Error in generating sticker ${error}` });
  }
};

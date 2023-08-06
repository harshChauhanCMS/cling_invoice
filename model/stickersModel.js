const mongoose = require('mongoose');
const { Schema } = mongoose;

const stickersSchema = new Schema(
  {
    _id: { type: Number, required: true, unique: true },
    distributor_id: { type: String, required: true },
    status: {
      type: String,
      enum: ['created', 'active'],
      default: 'created',
    },
  },
  {
    timestamps: true,
  }
);
stickersSchema.pre('validate', async (next) => {
  const sticker = this;
  if (sticker.isNew) {
    const lastDocument = await Stickers.findOne({}, {}, { sort: { _id: -1 } })
      .lean()
      .exec();
    const count = lastDocument ? lastDocument._id : 0;
    sticker._id = count + 1;
  }
  next();
});

stickersSchema.pre('save', async (next) => {
  next();
});

stickersSchema.pre('findOneAndUpdate', (next) => {
  // Check if the document is being upserted (new document creation)
  if (this._update.$setOnInsert && !this._update.$setOnInsert._id) {
    // Find the highest _id value in the collection and increment it by one
    this.model
      .findOne({}, {}, { sort: { _id: -1 } })
      .then((lastDocument) => {
        const newId = lastDocument ? lastDocument._id + 1 : 1;
        this._update.$setOnInsert._id = newId;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
});
const Stickers = mongoose.model('stickers', stickersSchema);

module.exports = Stickers;

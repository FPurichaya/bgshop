import express from 'express';
import mongodb from 'mongodb';

const router = express.Router();

const validate = (data) => {
  const errors = {};

  if (!data.name) errors.name = "This field can't be blank";
  if (!data.players) errors.players = "This field can't be blank";
  if (!data.producer) errors.producer = 'You must choose producer';
  if (!data.thumbnail) errors.thumbnail = "This field can't be blank";
  if (data.price <= 0) errors.price = "Too cheap, don't you think?";
  if (data.duration <= 0) errors.duration = "Too short, isn't it?";

  return errors;
};

router.get('/', (req, res) => {
  const db = req.app.get('db');
  db.collection('store')
    .find({})
    .toArray((err, store) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ store });
    });
});

router.get('/:_id', (req, res) => {
  const db = req.app.get('db');
  db.collection('store').findOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err, product) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ product });
    }
  );
});

router.post('/', (req, res) => {
  const db = req.app.get('db');
  const errors = validate(req.body.product);

  if (Object.keys(errors).length === 0) {
    db.collection('store').insertOne(req.body.product, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ product: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put('/:_id', (req, res) => {
  const db = req.app.get('db');
  const { _id, ...productData } = req.body.product;
  const errors = validate(productData);

  if (Object.keys(errors).length === 0) {
    db.collection('store').findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: productData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ product: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete('/:_id', (req, res) => {
  const db = req.app.get('db');

  db.collection('store').deleteOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({});
    }
  );
});

export default router;

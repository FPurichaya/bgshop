import express from 'express';
import mongodb from 'mongodb';

const router = express.Router();

const validate = (data) => {
  const errors = {};

  if (!data.name) errors.name = "This field can't be blank";
  if (!data.website) errors.website = "This field can't be blank";

  return errors;
};

router.get('/', (req, res) => {
  const db = req.app.get('db');
  db.collection('sizes')
    .find({})
    .toArray((err, sizes) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ sizes });
    });
});

router.get('/:id', (req, res) => {
  const db = req.app.get('db');
  db.collection('sizes').findOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    (err, size) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ size });
    }
  );
});

router.post('/', (req, res) => {
  const db = req.app.get('db');
  const errors = validate(req.body.size);

  if (Object.keys(errors).length === 0) {
    db.collection('sizes').insertOne(req.body.size, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ size: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put('/:id', (req, res) => {
  const db = req.app.get('db');
  const { _id, ...sizeData } = req.body.size;
  const errors = validate(sizeData);

  if (Object.keys(errors).length === 0) {
    db.collection('sizes').findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params.id) },
      { $set: sizeData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ size: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete('/:id', (req, res) => {
  const db = req.app.get('db');

  db.collection('sizes').deleteOne(
    { _id: new mongodb.ObjectId(req.params.id) },
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

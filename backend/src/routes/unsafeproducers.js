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
  db.collection('producers')
    .find({})
    .toArray((err, producers) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ producers });
    });
});

router.get('/:id', (req, res) => {
  const db = req.app.get('db');
  db.collection('producers').findOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    (err, producer) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ producer });
    }
  );
});

router.post('/', (req, res) => {
  const db = req.app.get('db');
  const errors = validate(req.body.producer);

  if (Object.keys(errors).length === 0) {
    db.collection('producers').insertOne(req.body.producer, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ producer: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put('/:id', (req, res) => {
  const db = req.app.get('db');
  const { _id, ...producerData } = req.body.producer;
  const errors = validate(producerData);

  if (Object.keys(errors).length === 0) {
    db.collection('producers').findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params.id) },
      { $set: producerData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ producer: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete('/:id', (req, res) => {
  const db = req.app.get('db');

  db.collection('producers').deleteOne(
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

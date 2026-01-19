import express from 'express';
import Pos from '../models/posMongooseModel.js';
import {
  postValidatePos,
  putValidatePos,
  putValidateCheckout,
} from '../models/posJoiModel.js';

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const posData = await Pos.find();
      res.status(200).send(posData);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const data = postValidatePos(req.body);

    if (data.error) {
      const err = new Error();
      err.statusCode = 400;
      err.description = data.error.details;
      return next(err);
    }

    const { name, address, checkouts } = data.value;

    try {
      const newPosData = await Pos.create({
        name,
        address,
        checkouts,
      });

      res.status(200).send(newPosData);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:posId')
  .post(async (req, res, next) => {
    const data = putValidateCheckout(req.body);

    if (data.error) {
      const err = new Error();
      err.statusCode = 400;
      err.description = data.error.details;
      return next(err);
    }

    const { posId } = req.params;
    const { name, lastVerification, lastPurchase } = data.value;

    try {
      const updatedPos = await Pos.findByIdAndUpdate(
        posId,
        {
          $push: {
            checkouts: { name, lastVerification, lastPurchase },
          },
        },
        { new: true, runValidators: true },
      );

      if (!updatedPos) {
        const err = new Error('POS or Checkout not found.');
        err.statusCode = 404;
        return next(err);
      }

      res.status(200).send(updatedPos);
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    const data = putValidatePos(req.body);

    if (data.error) {
      const err = new Error();
      err.statusCode = 400;
      err.description = data.error.details;
      return next(err);
    }

    const { posId } = req.params;
    const { name, address } = data.value;

    try {
      const selectedPos = await Pos.findByIdAndUpdate(
        posId,
        { name, address },
        { new: true, runValidators: true },
      );

      if (!selectedPos) {
        const err = new Error();
        err.statusCode = 404;
        err.description = 'Pos not found';
        return next(err);
      }

      res.status(200).send(selectedPos);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    const { posId } = req.params;
    try {
      const selectedPos = await Pos.findByIdAndDelete(posId);

      if (!selectedPos) {
        const err = new Error();
        err.statusCode = 404;
        err.description = 'Pos not found';
        return next(err);
      }

      res.status(200).send(selectedPos);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:posId/checkout/:checkoutId')
  .put(async (req, res, next) => {
    const data = putValidateCheckout(req.body);

    if (data.error) {
      const err = new Error();
      err.statusCode = 400;
      err.description = data.error.details;
      return next(err);
    }

    const { posId, checkoutId } = req.params;
    const { name, lastVerification, lastPurchase } = data.value;

    try {
      const filter = {
        _id: posId,
        'checkouts._id': checkoutId,
      };

      const update = {
        $set: {
          'checkouts.$.name': name,
          'checkouts.$.lastVerification': lastVerification,
          'checkouts.$.lastPurchase': lastPurchase,
        },
      };

      const options = {
        new: true,
        runValidators: true,
      };

      const updatedPos = await Pos.findOneAndUpdate(filter, update, options);

      if (!updatedPos) {
        const err = new Error('POS or Checkout not found.');
        err.statusCode = 404;
        return next(err);
      }

      res.status(200).json(updatedPos);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    const { posId, checkoutId } = req.params;

    try {
      const updatedPos = await Pos.findByIdAndUpdate(
        posId,
        {
          $pull: { checkouts: { _id: checkoutId } },
        },
        { new: true },
      );

      if (!updatedPos) {
        const err = new Error('POS or Checkout not found.');
        err.statusCode = 404;
        return next(err);
      }

      res.status(200).json(updatedPos);
    } catch (err) {
      next(err);
    }
  });

export default router;

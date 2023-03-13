const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const controller = {};

/**@route GET /api/contacts*/

controller.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

/* @route POST /api/contacts

*/
controller.setUsers = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("name is required");
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    console.log(
      errors
        .array()
        .map((error) => error.msg)
        .join("\n")
    );
    throw new Error(
      errors
        .array()
        .map((error) => error.msg)
        .join("\n")
    );
  }

  const { name, email, phone, type } = req.body;

  const contact = await User.create({ name, email, password });

  res.status(201).json(contact);
});

/**
 @route PUT /api/users/:id

*/
controller.updateUsers = asyncHandler(async (req, res) => {
  const contact = await User.findById(req.params.id);
  if (!User) {
    res.status(400);
    throw new Error("user not found");
  }

  const updatedContact = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

/**
 @route DELETE /api/contacts/:id

*/
controller.deleteUsers = asyncHandler(async (req, res) => {
  const contact = await User.findById(req.params.id);
  if (!User) {
    res.status(400);
    throw new Error("user not found");
  }

  await contact.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = controller;

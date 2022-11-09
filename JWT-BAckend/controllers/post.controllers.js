const db = require("../models")
const Post = db.posts

exports.create = (req, res) => {
  if(!req.body.title){
      res.status(400).send({message: "Content of the product cannot be empty"});
      return;
  }

  console.log(req.body.title)
  // Create
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  });

  console.log(post)

  post.save(post).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product"
        });
  });
};
exports.findAll = (req, res) => {
    const title = req.query.title;

    var condition = title ? { title: {$regex: new RegExp(title), $options: "i"} } : {};

    Post.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing products"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Post.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Product with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Products with id=" + id });
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not created!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the Post with id=" + id
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not created!`
        });
      } else {
        res.send({
          message: "Post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    Post.deleteMany({})
      .then(data => {
        res.send({
          message:` ${data.deletedCount} Post were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Post."
        });
      });
};


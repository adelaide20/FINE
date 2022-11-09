// const { default: mongoose } = require("mongoose");
module.exports = mongoose => {
    var posts = mongoose.Schema({
        title: String,
        description: String,
        image: String,
    }, {timestamps: true});
    posts.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Post = mongoose.model("Posts", posts)
    return Post;
}
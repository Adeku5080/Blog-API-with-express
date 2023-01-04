const Blog = require("../../models/blog");
const User = require("../../models/user");
const {
  extractErrorResponse,
  getTimeToRead,
  getPaginationMetadata,
} = require("../../utils/helpers");
const { blogStates } = require("../../utils/constants");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.list = async (req, res) => {
  try {
    const criteria = {
      owner_id: req.user._id,
    };

    // filter by state if asked to.
    if (req.query.state && Object.keys(blogStates).includes(req.query.state)) {
      criteria.state = req.query.state;
    }

    const { skip, size } = getPaginationMetadata(
      req.query.page,
      req.query.page_size
    );
    const blogs = await Blog.find(criteria).skip(skip).limit(size);

    return res.status(200).json({
      data: blogs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "An error occurred.",
    });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.view = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOne({
      _id: id,
      owner_id: req.user._id,
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      data: blog,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "An error occurred.",
    });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.create = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const blog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      state: blogStates.draft,
      owner_id: req.user._id,
      author: `${user.first_name} ${user.last_name}`,
      reading_time: getTimeToRead(req.body.body),
      tags: req.body.tags,
    });

    return res.status(201).json({
      data: blog,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json(extractErrorResponse(error));
    }

    console.log(error);
    return res.status(500).json({
      message: "an error occurred",
    });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.partialUpdate = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOne({
      _id: id,
      owner_id: req.user._id,
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    const blogBody = req.body.body || blog.body;
    const updatedBlog = await Blog.updateOne(
      {
        _id: id,
        owner_id: req.user._id,
      },
      {
        $set: {
          title: req.body.title || blog.title,
          description: req.body.description || blog.description,
          body: req.body.body || blog.body,
          state: req.body.state || blog.state,
          reading_time: getTimeToRead(blogBody),
          updated_at: Date.now(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(204).send();
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json(extractErrorResponse(error));
    }

    console.log(error);
    return res.status(500).json({
      message: "an error occurred",
    });
  }
};

/**
 * Delete a blog owned by the logged in user.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    await Blog.deleteOne({ _id: id });

    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "an error occurred",
    });
  }
};

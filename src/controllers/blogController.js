const Blog = require("../models/blog");
const User = require("../models/user");
const { blogStates } = require("../utils/constants");
const CustomAPIErrors = require("../../errors/custom-error")
const { getPaginationMetadata } = require("../utils/helpers");

/**
 *
 * @param { } req
 * @param {*} res
 * @returns
 */
exports.list = async (req, res, next) => {
  try {
    const orderableFields = ["created_at", "read_count", "reading_time"];
    const orderBy = orderableFields.includes(req.query.order_by)
      ? req.query.order_by
      : "created_at";
    const orderDirection = ["asc", "des"].includes(req.query.direction)
      ? req.query.direction
      : "desc";
    const criteria = {
      state: blogStates.published,
    };

    if (req.query.author) {
      criteria.author = { $regex: `.*${req.query.author}.*` };
    }

    if (req.query.title) {
      criteria.title = { $regex: `.*${req.query.title}.*` };
    }

    if (req.query.tag) {
      criteria.tags = req.query.tag;
    }

    const { skip, size } = getPaginationMetadata(req.query.page);
    const blogs = await Blog.find(criteria)
      .skip(skip)
      .limit(size)
      .sort({
        [orderBy]: orderDirection === "desc" ? -1 : 1,
      });

    return res.status(200).json({
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.view = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      state: blogStates.published,
    });

    if (!blog) {
      return res.status(404).json({
        message: "no blog with this id is published",
      });
    }

  blog.user = await User.findOne({ _id: blog.owner_id });

    // update read-count.
    Blog.updateOne(
      {
        _id: blog._id,
      },
      {
        $set: {
          read_count: (blog.read_count || 0) + 1,
        },
      }
    ).catch((error) => {
      console.error(error);
    });

    return res.status(200).json({
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

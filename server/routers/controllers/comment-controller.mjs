import models from '../../models/index.mjs'

const getAllCommentsForTask = async (req, res, next) => {
    const query = {
    	where: {
     		taskid: req.params.tid
     	}
    }
    const data = await models.Comment.findAll({
        ...query,
        include: {
            model: models.User,
            as: "user",
            where: {
                id: req.params.uid
            },
            attributes: ['email']
        },
        attributes: ['id', 'content', 'createdAt'],
      })
      res.status(200).json({ data })
}

const createCommentForTask = async (req, res, next) => {
    try {
        const comment = await models.Comment.create({
          ...req.body,
          taskId: req.params.tid,
          userId: req.params.uid
        })
        res.status(201).json(comment)
      } catch (err) {
        next(err)
      }

}

export default { getAllCommentsForTask, createCommentForTask }
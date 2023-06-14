const userModel = require("../users/users-model")


function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await userModel.getById(req.params.id)
    if(user) {
      req.user = user;
      next();
    }else{
      res.status(404).json({ mesaj: "kullanıcı not found" })
    }
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    const {name} = req.body;
    name ? next() : res.status(404).json({ mesaj: "gerekli name alanı eksik" })
  } catch (error) {
    next(error)
  }
}

function validatePost(req, res, next) {
  try {
    const {text} = req.body;
    text ? next() : res.status(404).json({ mesaj: "gerekli name alanı eksik" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}

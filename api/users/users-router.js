const express = require('express');
const mw = require("../middleware/middleware")
const userModel = require("../users/users-model")
const postModel = require("../posts/posts-model")
// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get('/', async (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  const users = await userModel.get();
  res.json(users);
});

router.get('/:id', mw.validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  res.json(req.user);
});

router.post('/',mw.validateUser, async (req, res, next) => {
  try {
    const user = await userModel.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', mw.validateUserId, mw.validateUser , async(req, res , next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.

  try {
    const updated = await userModel.update(req.params.id, req.body)
    res.status(201).json(updated)
  } catch (error) {
    next(error)
  }
 
});

router.delete('/:id',mw.validateUserId, async (req, res , next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await userModel.remove(req.params.id);
    res.json(req.user);
  } catch (error) {
    next(error)
  }
});

router.get('/:id/posts', mw.validateUserId, async (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  const userPost = await userModel.getUserPosts(req.params.id);
  res.json(userPost)
});

router.post('/:id/posts', mw.validateUserId , mw.validatePost, async(req, res, next) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    const newPost = await postModel.insert(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error)
  }

});


module.exports = router;
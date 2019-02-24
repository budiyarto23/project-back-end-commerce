var express = require('express')
var router = express.Router()
var { allCategories } = require('../controllers');

router.get('/categories', allCategories.getCategory);
router.post('/addcategories', allCategories.addCategory)
router.get('/cat', allCategories.getcat);
router.delete('/catdelete/:id', allCategories.deleteCategory);
router.put('/editcategory/:id', allCategories.editCategory);
router.get('/searchcategory', allCategories.searchCategory);

module.exports = router;
var express = require('express')
var router = express.Router()
var { allGender } = require('../controllers');

router.get('/listgender', allGender.getGender);
router.delete('/deletegender/:id', allGender.deleteGender);
router.post('/addgender', allGender.addGender);
router.put('/updategender/:uid', allGender.editGender);
router.get('/trxlist', allGender.getTransaction);
router.delete('/deletetrx/:id', allGender.deleteTransaction);
// user
router.get('/listusers', allGender.getUsers);
router.delete('/deleteuser/:by', allGender.deleteUser)
router.post('/adduser', allGender.addUser);
router.put('/edituser/:id', allGender.editUser);

module.exports = router;
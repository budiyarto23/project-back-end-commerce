const db = require('../database');

module.exports = {
    getCategory: (req, res) => {
        var sql = `select * from categories`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    addCategory: (req, res) => {
        var data = req.body;
        var sql = `insert into categories set ?`;
        db.query(sql, data, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    },

    getcat: (req, res) => {
        var cate = req.query.cate;
        var sql = `select * from categories where jenis '${cate}'`
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    },

    deleteCategory: (req, res) => {
        var deleted = req.params.id;
        var sql = `select * from categories where id = ${deleted}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                var sql = `delete from categories where id = ${deleted};`
                db.query(sql, (err2, results) => {
                    if (err2) throw err;
                    var sql = `delete from joinproduct where idcategories = ${deleted}`;
                    db.query(sql, (err1, result1) => {
                        if (err1) throw err;
                        console.log(`ID category ${deleted} berhasil dihapus dari tabel joinproduct`)
                    })
                    res.send(results);
                })
            }
        })
    },
    
    editCategory: (req, res) => {
        var idcat = req.params.id;
        var data = req.body;
        var sql = `select * from categories where id = ${idcat}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                var sql = `update categories set ? where id = ${idcat}`;
                db.query(sql, data, (err1, results) => {
                    if (err1) throw err1;
                    res.send(results)
                })
            } else {
                res.send('Data does not exist.');
            }
        })
    },

    searchCategory: (req, res) => {
        var jeniscategory = req.params.jenis;
        var sql = `select * from categories where jenis = '${jeniscategory}'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
}
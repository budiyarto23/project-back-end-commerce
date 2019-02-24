const db = require('../database');
var fs = require('fs');
var { uploader } = require('../helpers/uploader');

module.exports = {
    cart: (req, res) => {
        var user = req.query.username;
        var sql = `select u.username as Username, p.id as idproduct, p.nama as Nama_product, kuantiti, harga, total_harga as Total, image,
                    c.id as id from cart c
                    join user u 
                    on c.user_id = u.id
                    join products p 
                    on c.product_id = p.id
                    where username = '${user}';`
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }, 

    cartProduct: (req, res) => {
        var usr = req.params.username;
        var sql = `select u.username as Username, p.nama as Nama_product, kuantiti, harga, total_harga as Total, image,
                    c.id as id from cart c
                    join user u 
                    on c.user_id = u.id
                    join products p 
                    on c.product_id = p.id
                    where username = '${usr}';`
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    cartplus: (req, res) => {
        var newProd = req.body;
        var sql = `insert into cart set ?;`
        db.query(sql, newProd, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    },

    editcart: (req, res) => {
        var idcart = req.params.id
        var { kuantiti } = req.body;
        var sql = `select * from cart where id = ${idcart}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            
            if (result.length > 0) {
                var sql = `update cart set kuantiti =  ${kuantiti} where id = ${idcart}`;
                db.query(sql, (err, results) => {
                    if (err) throw err;
                    res.send(results)
                })
            }
        })
    },
    
    deleteCart: (req, res) => {
        var deletecart = req.params.id;
        console.log(deletecart)
        var sql = `select * from cart where id = ${deletecart}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            
            if (result.length > 0) {
                var sql = `delete from cart where id = ${deletecart};`
                db.query(sql, (err, results) => {
                    if (err) throw err;
                    res.send(results);
                })
            }
        })
    },

    daftarOrder: (req, res) => {
        var data = req.body
        var sql = `insert into daftarorder set ? ;`
        db.query(sql, data, (err, result) => {
            if (err) throw err;
            res.send(result)
            console.log('sukses')
        })
    },

    detailOrder:  (req, res) => {
        var data = req.body
        var sql = `insert into detailorder set ? ;`
        db.query(sql, data, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    },

    wishlist: (req, res) => {
        var wish = req.body;
        var sql = `insert into wishlist set ?`
        db.query(sql, wish, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    },

    getWishlist: (req, res) => {
        var user = req.query.username;
        var sql = `select u.username as username, p.nama as Nama_product, image,
                harga, w.id as id from wishlist w
                join user u 
                on w.user_id = u.id
                join products p 
                on w.product_id = p.id
                where username = '${user}';`
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    },

    allWishlist: (req, res) => {
        var sql = `select u.username as username, p.nama as Nama_product, image,
                harga, w.id as id from wishlist w
                join user u 
                on w.user_id = u.id
                join products p 
                on w.product_id = p.id;`
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    },

    deleteWishlist:  (req, res) => {
        var deletewish = req.params.id;
        console.log(deletewish)
        var sql = `select * from wishlist where id = ${deletewish}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            
            if (result.length > 0) {
                var sql = `delete from wishlist where id = ${deletewish};`
                db.query(sql, (err, results) => {
                    if (err) throw err;
                    res.send(results);
                })
            }
        })
    },

    listOrder: (req, res) => {
        var user = req.query.username
        var sql = `SELECT * FROM daftarorder where username = '${user}'`;
        db.query(sql, (err, results) => {
            if(err){
                return res.status(500).json({ 
                    message: "There's an error on the server. Please contact the administrator.", 
                    error: err.message 
                });
            }
            res.send(results);
        })   
    },

    detailOrders: (req, res) => {
        var idtrx = req.query.idtrx;
        var sql = `SELECT 
                    detailorder.id AS iddetailorder,
                    products.id AS idproduct,
                    products.nama AS namaproduk,
                    products.harga AS hargaproduk,
                    products.image AS image,
                    detailorder.qty AS kuantiti
                    FROM products
                    JOIN detailorder ON detailorder.idproduct = products.id
                    JOIN daftarorder ON daftarorder.id = detailorder.idtrx
                    WHERE idtrx = ${idtrx}`;
        db.query(sql, (err, resulth) => {
            if (err) throw err;
            res.send(resulth)
        })
    },

    // confirmOrder: (req, res) => {
    //     var data = req.body;
    //     var sql = `insert into konfirmasiorder set ?`;
    //     db.query(sql, data, (err, result) => {
    //         if (err) throw err;
    //         res.send(result);
    //     })
    // },

    confirmOrder: (req,res) => {
        try {
            const path = '/products/confirmtrx'; //file save path
            const upload = uploader(path, 'TRX').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
            upload(req, res, (err) => {
                if(err){
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
    
                const { image } = req.files;
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)
    
                console.log(req.body.data)
                const data = JSON.parse(req.body.data);
                console.log(data)
                data.image = imagePath;
                
                var sql = 'INSERT INTO konfirmasiorder SET ?';
                db.query(sql, data, (err, results) => {
                    if(err) {
                        console.log(err.message)
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                   
                    console.log(results);
                    // sql = 'SELECT * from konfirmasiorder;';
                    // db.query(sql, (err, results) => {
                    //     if(err) {
                    //         console.log(err.message);
                    //         return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    //     }
                    //     console.log(results);
                        
                    //     res.send(results);
                    // })   
                })    
            })
        } catch(err) {
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
        }
    },

    getConfirm: (req, res) => {
        var sql = `SELECT 
        konfirmasiorder.username AS nama, konfirmasiorder.id AS idConfirm, image, status,
        daftarorder.id AS id, daftarorder.invoice AS invoice, tanggaltrx, totalkuantiti, totalharga
        FROM daftarorder
        JOIN konfirmasiorder ON konfirmasiorder.invoice = daftarorder.invoice`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    editAdmin: (req, res) => {
        var idcat = req.params.id;
        var data = req.body;
        var sql = `select * from daftarorder where id = ${idcat}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                var sql = `update daftarorder set ? where id = ${idcat}`;
                db.query(sql, data, (err1, results) => {
                    if (err1) throw err1;
                    res.send(results)
                })
            } else {
                res.send('Data does not exist.');
            }
        })
    },

    deleteOrderConfirm: (req, res) => {
        var deleteid = req.params.invoice;
        var sql = `select * from konfirmasiorder where id = ${deleteid}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                var sql = `delete from konfirmasiorder where id = ${deleteid}`;
                db.query(sql, (err1, result1) => {
                    if (err1) throw err1;
                    res.send(result);
                })
            } else {
                res.send('Data not exist')
            }
        })
    } 
}

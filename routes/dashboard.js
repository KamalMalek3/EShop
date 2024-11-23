const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const con = require('../Database/connection');
const { sessionState } = require('./account');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'shopweb'); // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, req.body.code + path.extname(file.originalname)); // Set the file name as the code + extension
    }
});

const upload = multer({ storage: storage });

router.get("/additems", (req, resp) => {
    var Checkouts;
    if (sessionState.getSignedinUsername() === "admin") {
        con.query('SELECT * FROM checkout ORDER BY ID Desc;', (err, result, fields) => {
            if (err) {
                resp.render("alert", { message: "Could not load Checkouts" });
            } else {
                Checkouts = result;
                resp.render("Additems", { rows: Checkouts });
            }
        });
    } else {
        resp.render("alert", { message: "Restricted!" });
    }
});


router.post('/submit', upload.single('imageUpload'), (req, resp) => {
    if (sessionState.getSignedinUsername() === "admin") {
        var code = req.body.code;
        var price = req.body.price;
        var qty = req.body.quantity;
        var desc = req.body.Desc;


        if (req.body.code && req.body.code.trim() !== "") {
            const ext = path.extname(req.file.originalname);
            const fileName = `${req.body.code}${ext}`;
            var filePath = `shopweb/${fileName}`;

            var newFileName;
            if (fs.existsSync(filePath)) {
                console.log('A file with the same name already exists. Rename the file before saving.');
                let i = 1;
                while (fs.existsSync(filePath)) {
                    newFileName = `${req.body.code}${i}${ext}`;
                    code = req.body.code * 10 + i;
                    i++;
                    filePath = `shopweb/${newFileName}`;
                }
                fs.renameSync(`shopweb/${req.file.filename}`, filePath);
                console.log('Renamed file to:', newFileName);
            } else {
                fs.renameSync(`shopweb/${req.file.filename}`, filePath);
                console.log('Renamed file to:', fileName);
            }
        } else {
            console.log('No valid product code received.');
        }

        console.log(code + "#" + desc + "#" + qty + "#" + price);

        con.query(
            "INSERT INTO items (Code, Description, Qty, Price) VALUES (?, ?, ?, ?);",
            [code, desc, qty, price],
            (err, result) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    resp.render("alert", { message: "Could not add new item" });
                } else {
                    console.log(`${result.affectedRows} Row Affected`);
                    resp.redirect('/additems');
                }
            }
        );
        //resp.send('Form submitted successfully!');
    } else {
        resp.render("alert", { message: "Restricted!" })
    }
});

router.get("/edit", (req, resp) => {
    var code1 = req.query.code;
    if (sessionState.getSignedinUsername() === "admin") {
        if (!code1) {
            resp.render("alert", { message: "missing parameter" });
            return;
        }

        con.query(
            "SELECT * FROM items WHERE Code = ?",
            [code1],
            (err, result) => {
                if (err) {
                    console.error("Error editing", err);
                    resp.render("alert", { message: "Could not edit item, item might be in a user's Cart" });
                } else {
                    if (result.length === 0) {
                        resp.render("alert", { message: "item not found" });
                    } else {
                        const item = {
                            code: code1,
                            Desc: result[0].Description,
                            Qty: result[0].Qty,
                            Price: result[0].Price
                        };
                        resp.render('edit', { item: item });
                    }
                }
            }
        );
    } else {
        resp.render("alert", { message: "Restricted!" })
    }
}
);


router.post('/edit1', upload.single('imageUpload'), (req, res) => {
    const code = req.body.code;
    const desc = req.body.Desc;
    const price = req.body.price;
    const qty = req.body.quantity;

    if (sessionState.getSignedinUsername() === "admin") {

        if (req.file) {
            const ext = path.extname(req.file.originalname);
            const newFileName = `${code}${ext}`;
            const filePath = `shopweb/${newFileName}`;

            fs.renameSync(req.file.path, filePath);
            console.log('Renamed file to:', newFileName);
        }


        con.query(
            'UPDATE items SET Description = ?, Price = ?, Qty = ? WHERE Code = ?',
            [desc, price, qty, code],
            (err, result) => {
                if (err) {
                    resp.render("alert", { message: "Error updating the product information!" })
                } else {
                    console.log(`${result.affectedRows} Row(s) Updated`);
                    res.redirect('/additems');
                }
            }
        );
    } else {
        resp.render("alert", { message: "Restricted!" })
    }

});

module.exports = router;
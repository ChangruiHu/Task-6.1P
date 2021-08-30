const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Expert = require("./models/Expert.js")
const app = express();
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/iServiceDB", { useNewUrlParser: true })


app.route('/experts')
    .get((req, res) => {
        Expert.find((err, expertList) => {
            if (err) { res.send(err) }
            else { res.send(expertList) }
        })
    })
    .post((req, res) => {
        var country = req.body.country;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var confirmPassword = req.body.confirmPassword;
        var addressLine1 = req.body.addressLine1;
        var addressLine2 = req.body.addressLine2;
        var city = req.body.city;
        var state = req.body.state;
        var zipcode = req.body.zipcode;
        var phone = req.body.phone;

        if (password != confirmPassword) {
            res.send("Passwords are not same");
        }

        const expert = new Expert({
            country: country,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcrypt.hashSync(password, saltRounds),
            confirmPassword: confirmPassword,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            zipcode: zipcode,
            phone: phone
        });

        expert.save((err) => {
            if (err) { res.send(err) }
            else res.send('Successfully added a new expert!')
        })
    })
    .delete((req, res) => {
        Expert.deleteMany((err) => {
            if (err) { res.send(err) }
            else { res.send('Successfully deleted all experts!') }
        })
    })

app.route('/experts/:id')
    .get((req, res) => {
        Expert.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, foundExpert) => {
            if (foundExpert) (res.send(foundExpert))
            else res.send("No Expert Found!")
        })
    })
    .put((req, res) => {
        var country = req.body.country;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var confirmPassword = req.body.confirmPassword;
        var addressLine1 = req.body.addressLine1;
        var addressLine2 = req.body.addressLine2;
        var city = req.body.city;
        var state = req.body.state;
        var zipcode = req.body.zipcode;
        var phone = req.body.phone;

        Expert.updateOne(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
                country: country,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: bcrypt.hashSync(password, saltRounds),
                confirmPassword: confirmPassword,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                state: state,
                zipcode: zipcode,
                phone: phone
            },
            (err) => {
                if (err) {
                    res.statusCode = 500;
                    return res.send(err);
                }
                else { res.send('Successfully updated!') }
            }
        )
    })
    .patch((req, res) => {
        if(req.body.hasOwnProperty("password")) {
            req.body.password = bcrypt.hashSync(req.body.password, saltRounds)
        }
        Expert.updateOne(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            { $set: req.body },
            (err) => {
                if (!err) { res.send('Successfully updated! ') }
                else res.send(err)
            }
        )
    })
    .delete((req, res) => {
        Expert.deleteOne(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            (err) => {
                if (err) { res.send(err) }
                else { res.send('Successfully deleted expert!') }
            })
    })

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
})
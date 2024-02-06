
const express = require('express');
const pool = require('../shared/pool');
const bcryptjs = require('bcryptjs');
const users = express.Router();

users.post('/signup', (req, res)=> {
    try {
        let firstName =  req.body.firstname;
        let lastName = req.body.lastname;
        let email = req.body.email;
        let  password = req.body.password;
        let address =  req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let pin = req.body.pin;

        pool.query(`select count(*) as count from users where email like '${email}`),
        (error, resultCount) =>{
            if(error){
                res.status(500).send(error);
                } else if(resultCount[0] > 0 ){
                    res.status(200).send('Email alerady exists');
                }else{
                    bcryptjs.hash(password,10).then((hashedPassword) => {
                        const query = 
                    })
                }
    }     }
})
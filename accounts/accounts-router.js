const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

router.get('/', (rq, res) => {
    db.select('*')
    .from('accounts')
    .then(accts => {
        res.status(200).json({ data: accts})
    })
    .catch(er => {
        res.status(500).json({error: er.message})
    })
})

router.get('/:id', (req, res) => {
    db('accounts')
    .first()
    .where({id: req.params.id})
    .then(accts => {
        res.status(200).json({data: accts})
    })
    .catch(er => {
        res.status(500).json({error: er.message})  
    })
})

router.post('/', (req, res) => {

})

module.exports = router
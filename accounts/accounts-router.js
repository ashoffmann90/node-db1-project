const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

router.get('/', (req, res) => {
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
    const acct = req.body
    db('accounts')
    .insert(acct, "id")
    .then(ids => {
        res.status(201).json({data:ids})
    })
    .catch(er => {
        res.status(500).json({error: er.message})
    })
})

router.put('/:id', (req, res) => {
    const upAcct = req.body
    db('accounts')
    .where({id:req.params.id})
    .update(upAcct)
    .then(count => {
        if(count){
            res.status(200).json({data: count})
        } else {
            res.status(404).json({error: "Account with that ID not found"})
        }
    })
    .catch(er => {
        res.status(500).json({error: er.message})
    })
})

router.delete('/:id', (req, res) => {
    db('accounts')
    .where({id:req.params.id})
    .delete()
    .then(acct => {
        if(acct){
            res.status(200).json({message: "Account deleted"})
        } else {
            res.status(404).json({error: "Account not found"})
        }
    })
    .catch(er => {
        res.status(500).json({error: er.message})
    })
})

module.exports = router
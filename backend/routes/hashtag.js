var express = require('express');
var router = express.Router();

const userFunc = require('../functions/userFunc');

router.get('/:entityID/:name', (req, res) => {
    userFunc.findTags({entityID: req.params.entityID}, req.params.name)
    .then(tag => {
        if (tag == null) res.status(204).json(tag)
        else res.status(200).json(tag)
    })
    .catch(err => { 
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        res.status(500).json(err.message) 
    })
})

router.post('/', (req, res) => {
    userFunc.findTags(req.body.restFilter, req.body.name)
    .then(tags => {
        if (tags == null) res.status(204).json(tags)
        else res.status(200).json(tags)
    })
    .catch(err => { 
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        res.status(500).json(err.message) 
    })
})

module.exports = router
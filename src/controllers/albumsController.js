const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/albums/:num?', (req, res) => {
    var page = req.params.num;

    if (!page) {
        page = 1;
    }

    axios.get('https://jsonplaceholder.typicode.com/albums').then(albums => {
        let json = albums.data;
        let offset = 0;
        let next;

        if (isNaN(page) || page == 1) offset = 0;
        else offset = (parseInt(page) - 1) * 5;

        if (offset + 5 >= json.count) next = false;
        else next = true;

        let selected = json.slice(offset, offset+5)

        let result = {
            page: parseInt(page),
            selected,
            next
        }
    
        res.render('albums', { result })
    }).catch(error => {
        console.log(error);
    });
})

module.exports = router;
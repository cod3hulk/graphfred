'use strict';

const Axios = require('axios');
const Configstore = require('configstore');

const config = new Configstore('graphfred');
const host = config.get('graphana.host');
const client = Axios.create({
    baseURL: `${host}`,
    timeout: 1000,
});

client.get('/api/search', {
    params: {
        query: process.argv[2]
    }
}).then(function (response) {
    const items = response.data
        .map(x => (
            {
                'title': x.title,
                'arg': `${host}/dashboard/${x.uri}`
            }
        ));
    console.log(JSON.stringify({items: items}, null, '\t'));
}).catch(function (error) {
    console.log(error);
});

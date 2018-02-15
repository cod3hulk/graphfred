'use strict';

const axios = require('axios');
const conf = require('conf');

const config = new conf({
    cwd: process.env['alfred_workflow_data']
})

const host = config.get('graphana.host');

const client = axios.create({
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

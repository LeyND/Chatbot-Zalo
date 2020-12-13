// Require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require('axios');
const PORT = 3000;

var ZaloOA = require('zalo-sdk').ZaloOA;

var zaConfig = {
    oaid: '2877661079500863670',
    secretkey: 'a33hRvNycob0tchD9XjW'
}
var ZOAClient = new ZaloOA(zaConfig);

app.set('port', process.env.PORT || 3000);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/webhook/", (req, res) => {
    switch (req.body.event_name) {
        case 'user_send_text':
            let message = {
                "recipient": {
                    "user_id": "7129458710914798116"
                },
                "message": {
                    "text": "hello, world!"
                }
            }
            axios.post('https://openapi.zalo.me/v2.0/oa/message?access_token=__OAIxf__6Ro_GLDiNdtOlJn1qYrRgzugRKh8hfZdmo1_ov6WNYjABdzELFxVRqMw9efP_D5dpcof11ihIoXGuMaFcsdMhH4dw11COeykHgqmZLnaZ64GTRc43ZHF8TLalerAPKzp0Anv4PQYW7JTuxqNnELBlvDdh8ACwT0e5-wjn4Xfd7dJlgARch_RUaw_x1HUFn7vIYuZ495gbNF7etKJbAr9xWaeVCBUBfoaogVapTmdNYeDukjCM6tIAK9dv8rRgThfWk5dWKZWd_yMQ6lLGggICHzEKPniS0TlMdvOG', message)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            break;
    }
    res.status(200); // Responding is important
})

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
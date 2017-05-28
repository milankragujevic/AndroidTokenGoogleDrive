import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import GooglePSAuth from 'google-play-services-auth'
let app = express();

app.server = http.createServer(app);
async function init(body, res) {
    var Auth = new GooglePSAuth({
        android_id: body.deviceId || '2948EC2AB2043807',   // Android ID
        app: 'com.google.android.apps.docs',  // App name
        client_sig: '38918a453d07199354f8b19af05ec6562ced5788',  //Client signature
        service: 'oauth2:https://www.googleapis.com/auth/drive', //OAuth service link
    });
    console.log(body.email, body.password);
    var user = await Auth.login(body.email, body.password);
    console.log(user);
    res.json(user);
}

// // logger
// app.use(morgan('dev'));
//
// // 3rd party middleware
// app.use(cors({
//     exposedHeaders: config.corsHeaders
// }));

app.use(bodyParser.json());


// api router
app.use('/token', function (req, res, next) {
    init(req.body, res).catch(()=>{
        res.json({});
    })
});

app.server.listen(process.env.PORT || 1337, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;

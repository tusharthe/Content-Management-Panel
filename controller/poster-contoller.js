
const PosterDbModel = require("../models/posterdb-model");



module.exports = {


    getList: {

        post: async function (req, res, next) {


            const query = PosterDbModel.find({});
            const records = await query.exec();


            res.json({ 'data': records, 'status': 'ok' });



        }
    },
    savePoster: {
        post: async function (req, res, next) {

            let title = req.body.title;
            let desc = req.body.desc;

            let fName = req.files['file'][0].filename;



            if (title == undefined || desc == undefined) {

                res.json({ 'status': 'failed', 'response': "Invalid Request" });
                return;
            }

            if (title == '' || desc == '') {

                res.json({ 'status': 'failed', 'response': "Feild are required" });
                return;
            }


            const poster = new PosterDbModel(
                {
                    "title": title,
                    "image": fName,
                    "desc": desc,

                }
            );



            poster.save().then((result) => {
                // res.send(result);
                res.json({ 'status': 'success', 'response': "Successfully saved" });

            }).catch((err) => {
                console.log(err),
                    res.json({ 'status': 'failed', 'response': "Unable to save" })
            });



        }

    }

};
const router = require('express').Router(),
    cloudinary = require('cloudinary'),
    config = require('../config').cloudinary;

// Configure cloudinary
cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
});

// First route {multiple image upload}
router.post('/multiple-uploads', async (req, res) => {
    // Receive a request of file paths as array
    let filePaths = req.body.filePaths;

    let multipleUpload = new Promise(async (resolve, reject) => {
        let uploadLength = filePaths.length,
            uploadRes = [];
        
        for (let i = 0; i <= uploadLength + 1; i++) {
            let filePath = filePaths[i];
            await cloudinary.v2.uploader.upload(filePath, (error, result) => {
                if (uploadRes.length === uploadLength) {
                    // Resolve promise after upload is complete
                    resolve(uploadRes);
                } else if (result) {
                    // Push public_ids in an array
                    uploadRes.push(result.public_id);
                } else if (error) {
                    console.log(error);
                    reject(error);
                }
            });
        }
    })
    .then((result) => result)
    .catch((error) => error);

    // Waits until promise is resolved before sending back response to user
    let upload = await multipleUpload;
    res.json({ 'response': upload });
});

module.exports = router;
import { config, S3 } from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
});

const s3 = new S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.S3_BUCKET,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
    }),
});

export default upload;

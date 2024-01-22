"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var env_config_1 = require("../config/env.config");
exports.s3 = new client_s3_1.S3Client({
    region: 'ap-southeast-1',
    credentials: {
        accessKeyId: env_config_1.env.AWS_BUCKET_ACCESS_KEY,
        secretAccessKey: env_config_1.env.AWS_BUCKET_SECRET_KEY
    }
});

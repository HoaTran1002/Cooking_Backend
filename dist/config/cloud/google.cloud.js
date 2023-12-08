"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drive = void 0;
const googleapis_1 = require("googleapis");
const env_config_1 = require("../../config/env.config");
const scopes = ['https://www.googleapis.com/auth/drive'];
const oauth2Client = new googleapis_1.google.auth.OAuth2(env_config_1.env.CLIENT_ID, env_config_1.env.CLIENT_SECRET, env_config_1.env.REDIRECT_URL);
oauth2Client.setCredentials({ refresh_token: env_config_1.env.REFRESH_TOKEN });
exports.drive = googleapis_1.google.drive({ version: 'v3', auth: oauth2Client });

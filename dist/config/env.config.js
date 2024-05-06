"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    PORT: 3000,
    CLIENT_ID: '425289193958-t8ih64tnim4ih4epeurkagts168rles3.apps.googleusercontent.com',
    CLIENT_SECRET: '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',
    REDIRECT_URL: 'https://developers.google.com/oauthplayground',
    REFRESH_TOKEN: '1//04JXN8XG2pLrtCgYIARAAGAQSNwF-L9Ir9ZtrYuZpc7IozkDprDiSGbtS4vhGkTj3RjOtlLaOuoqo_fD6DOlmGTFhlv04-KsSrzY',
    SECRET_KEY_REFRESH_TOKEN: 'PRIVATE_KEY_SIGN_TOKEN_SECRET_KEY_SIGN_TOKEN_REFRESH_TOKEN_skdkdbgbsbgjbsbvjbvsaF_HankjdvkbskbvbdvbdbvkdG_asdvjdsbvjbdjvbbsbdsavb_skdnvkdnvkndvkdnvnkvn',
    SECRET_KEY_ACCESS_TOKEN: 'PRIVATE_KEY_SIGN_TOKEN_SECRET_KEY_SIGN_TOKEN_ACCESS_TOKEN_Udsnvknsdvnknvn_sknvkdnvnJdsvsSD_vdsjvnknJsdvdsvnk_Isnvsndvnsdvnknsdvnxvn_vsdjnJdsvJvsdnvkndsJ',
    EXPIRES_SETCRECT_KEY_ACCESS_TOKEN: '5 day',
    EXPIRES_SETCRECT_KEY_REFRESH_TOKEN: '360 day',
    NAME_REFRESH_TOKEN_IN_COOKIE: '_MOM_COOKING_RF',
    NAME_ACCESS_TOKEN_IN_COOKIE: '_MOM_COOKING_AT',
    _OPTIONS_COOKIES: { httpOnly: true, secure: false, sameSite: 'strict' },
    AWS_BUCKET_NAME: 'momcooking',
    AWS_BUCKET_ACCESS_KEY: 'AKIAXNUMROQNWUXAGR4P',
    AWS_BUCKET_SECRET_KEY: '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',
    MONGODB_ADDRESS: 'localhost:27017',
    PATH_DATA_FILE: process.env.NODE_ENV == 'development' ? 'Users/hoatran/datafile' : '/var/www/content',
    DB_USERNAME: 'admin',
    DB_PASSWORD: 'Pass2910'
};

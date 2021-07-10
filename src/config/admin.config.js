'use strict'

if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

// URLS from env
const LOGIN_URL = process.env.URL_LOGIN;
const LOGOUT_URL = process.env.URL_LOGOUT;
const SUBMIT_URL = process.env.URL_SUBMIT;
const DASHBOARD_URL = process.env.URL_DASH;
const CODE_SAMPLE = `
<section class="code-class"> 
        <pre>
        
        </pre>
</section>
`;

// export the urls
module.exports = {
    LOGIN_URL:LOGIN_URL,
    LOGOUT_URL:LOGOUT_URL,
    SUBMIT_URL:SUBMIT_URL,
    DASHBOARD_URL:DASHBOARD_URL,
    CODE_SAMPLE:CODE_SAMPLE,
    GCLOUD_PROJECT_ID:process.env.GCLOUD_PROJECT_ID,
    GCLOUD_APPLICATION_CREDENTIALS:process.env.GCLOUD_APPLICATION_CREDENTIALS,
    GCLOUD_STORAGE_BUCKET_URL:process.env.GCLOUD_STORAGE_BUCKET_URL,
    aws_access_key_id:process.env.aws_access_key_id,
    aws_secret_access_key:process.env.aws_secret_access_key,
    AWS_DEFAULT_REGION:process.env.AWS_DEFAULT_REGION,
    s3_ENDPOINT:process.env.s3_ENDPOINT,
    ADMIN_USER:process.env.ADMIN_USER,
    ADMIN_PASSW:process.env.ADMIN_PASSW
}
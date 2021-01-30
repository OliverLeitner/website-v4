const env = {
    SITENAME: 'Website Name',
    OWNER: 'Website Owner Name',
    TOPIC: 'website category',
    PKEY: 'GooglePrivateKey',
    DATA_INTERFACE: 'http://strapiurl/data',
    MAIL_INTERFACE: 'http://nodemailer/send-mail',
    MORIGIN: 'http://websitedomain',
    SITE_VERIFY: 'webmastertoolswebsitekey',
    DOMAIN: 'websitename',
    SHORTNAME: 'websiteshortname',
    INTRO: 'Welcome to',
    SLOGAN: 'your slogan'
};
const siteinfo = document.querySelector('meta[name="siteinfo"]');
siteinfo.setAttribute('content', env.MORIGIN + '/robots.txt');
const siteverify = document.querySelector('meta[name="google-site-verification"]');
siteverify.setAttribute('content', env.SITE_VERIFY);
const copyright = document.querySelector('meta[name="copyright"]');
copyright.setAttribute('content', '(c) ' + env.OWNER);
const topic = document.querySelector('meta[name="page-topic"]');
topic.setAttribute('content', env.TOPIC);

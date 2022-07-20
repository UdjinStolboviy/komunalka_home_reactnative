import env from 'react-native-config'
const config = {
  app: {
    name: env.APP_NAME,
    version: env.APP_VERSION,
    bundle: env.APP_BUNDLE_ID,
    env: env.ENV,
    app_store_id: env.APP_STORE_ID,
  },
  host: {
    api_version: env.API_VERSION,
    domain: env.DOMAIN,
    route: env.DOMAIN + env.API_VERSION + '/',
  },
  google: {
    web_client_id: env.GOOGLE_WEB_CLIENT_ID,
  },
  linked_in: {
    client_id: env.LINKED_IN_CLIENT_ID,
    client_secret: env.LINKED_IN_CLIENT_SECRET,
    redirect_url: env.LINKED_IN_REDIRECT_URL
  },
  upload_care: {
    public_key: env.UPLOAD_CARE_KEY
  },
  deep_link: {
    prefix: env.DEEP_LINK_PREFIX
  },
  chat: {
    appId: env.CHAT_APP_ID,
    authKey: env.CHAT_AUTH_KEY,
    authSecret: env.CHAT_AUTH_SECRET,
    streamManagement: {
      enable: true
    },
    user: {
      login: 'komunalka',
    }
  },
};

export default config;



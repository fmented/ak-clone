import { getUserFromToken, readCookie } from "$lib/scripts/helper";

export function getSession({headers}){
    const cookie = headers.cookie || ''
    let token = readCookie(cookie, 'userToken')
    let user = getUserFromToken(token)
    return{
        user,
    }
}


const dev = `localhost:3000`; // or your server IP for dev
const deploy = 'https://ak-clone.vercel.app'

const directives = {
  'img-src': [
    "*",
    "'self'",
    "data:",
  ],
  'font-src': [
    "*",
    "'self'",
    "data:",
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'"
  ],
  'default-src': [
    "'self'",
    dev,
    deploy,
    "ws://" + dev,
    "ws://" + deploy,
    "https://*.google.com",
    "https://*.googleapis.com",
    "https://*.firebase.com",
    "https://*.gstatic.com",
    "https://*.cloudfunctions.net",
    "https://*.algolia.net",
    "https://*.facebook.com",
    "https://*.facebook.net",
    "https://*.stripe.com",
    "https://*.sentry.io",
  ],
  'script-src': [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    dev,
    deploy,
    "https://*.stripe.com",
    "https://*.facebook.com",
    "https://*.facebook.net",
    "https://*.sentry.io",
    "https://polyfill.io",
    // (req, res) => `'nonce-${res.locals.nonce}'`,
  ],
  'frame-src': [
    "https://*.stripe.com",
    "https://*.facebook.com",
    "https://*.facebook.net",
  ]
};

let CSP = Object.entries(directives).map(([key, arr]) => key + ' ' + arr.join(' ')).join('; ');

export async function handle({request, resolve}) {

  const response = await resolve(request);
//   console.log('handle', { ...response.headers });

  return {
    ...response,
    headers: {
      ...response.headers,
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': `nosniff`,
      'Content-Security-Policy': CSP,
      'X-XSS-Protection': 1
    },
  };
}
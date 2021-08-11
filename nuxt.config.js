export default {
    components: true,
    head: {
        titleTemplate: "Mastering Nuxt: %s",
        htmlAttrs: {
            lang: "en"
        },
        bodyAttrs:{
            class: ["my-style"]
        },
        meta: [{
            charset: "utf-8",
        }]
    },
    router: {
        prefetchLinks: false,
    },
    plugins:[ 
        '~/plugins/maps.client', 
        '~/plugins/dataApi', 
        '~/plugins/auth.client', 
        '~/plugins/vCalendar.client',
        '~/plugins/stripe.client',
    ],
    modules:[
        '~/modules/auth', 
        '~/modules/algolia', 
        '~/modules/cloudinary', 
        '@nuxtjs/cloudinary',
        '~/modules/stripe',
    ],
    buildModules:['@nuxtjs/tailwindcss', '@nuxt/image'],
    cloudinary:{
        cloudName: 'dlvju6d8g',
    },
    image: {
        cloudinary: {
          baseURL: 'https://res.cloudinary.com/dlvju6d8g/image/upload/'
        }
    },
    css: ['~/assets/sass/app.scss'],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0,
        }
    },
    publicRuntimeConfig:{
        rootUrl: process.env.NODE_ENV === 'production' ? 'https://nuxt-bn-b-mu.vercel.app/' : 'http://localhost:3000',
        auth:{
            cookieName: 'idToken',
            clientId: process.env.AUTH_CLIENT_ID,
        },
        algolia:{
            appId: process.env.ALGOLIA_APPLICATION_ID,
            key: process.env.ALGOLIA_READ_API_KEY,
        },
        cloudinary:{
            apiKey: process.env.CLOUDINARY_API_KEY,
        },
        googleMaps: {
			apiKey: process.env.GOOGLE_MAPS_KEY,
		},
        stripe:{
            key: process.env.STRIPE_PUBLIC_KEY,
        },
    },
    privateRuntimeConfig:{
        algolia:{
            appId: process.env.ALGOLIA_APPLICATION_ID,
            key: process.env.ALGOLIA_WRITE_API_KEY,
        },
        cloudinary:{
            apiSecret: process.env.CLOUDINARY_API_SECRET,
        },
        stripe:{
            secretKey: process.env.STRIPE_SECRET_KEY,
        },
    },

}
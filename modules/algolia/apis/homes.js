import { getHeaders } from '../../helpers'
import fetch from 'node-fetch'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)
    return {
        get: async (homeId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/nuxtbnb_homes/${homeId}`, {
                    headers,                    
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        delete: async (homeId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/nuxtbnb_homes/${homeId}`, {
                    headers,
                    method: 'DELETE',                    
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        create: async (homeId, payload) => {
            try {
                const availability = []
                payload.availabilityRanges.forEach(range => {
                    const start = new Date(range.start).getTime() / 1000
                    const end = new Date(range.end).getTime() / 1000
                    for(var day = start; day <= end; day += 86400){
                        availability.push(day)
                    }
                })

                delete payload.availabilityRanges
                payload.availability = availability
                
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/nuxtbnb_homes/${homeId}`, {
                    headers,
                    method: 'PUT',
                    body: JSON.stringify(payload),
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        getByUserId: async (userId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/nuxtbnb_homes/query`, {
                    headers,
                    method: 'POST',
                    body: JSON.stringify({
                        filters: `userId:${userId}`,
                        attributesToRetrieve:[
                            'objectID',
                            'title',
                        ],
                        attributesToHighlight:[],
                    }),
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
    
    }
}
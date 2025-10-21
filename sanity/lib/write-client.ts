// This is a server-side only file that's why we don't need to worry about Next.js specific imports here
import "server-only"

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
  token,
})

// If the write client doesn't have a token, it will fail when trying to publish documents.
if(!writeClient.config().token){
    throw new Error('Write token not found')
}
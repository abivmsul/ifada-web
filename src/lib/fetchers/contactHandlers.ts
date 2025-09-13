// src/lib/fetchers/contactHandlers.ts
import { sanityServerClient } from '@/lib/sanity.server'

export async function fetchContactHandlers() {
  // expects teamMember schema to have `handlesContact` boolean and `email`
  const q = `*[_type == "teamMember" && handlesContact == true && defined(email)] | order(order asc){
    _id, name, email
  }`
  return sanityServerClient.fetch(q)
}

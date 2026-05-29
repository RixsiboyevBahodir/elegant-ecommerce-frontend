import { createClient } from "@sanity/client";
import urlBulder from '@sanity/image-url' 

export const client = createClient({
  projectId: "vcbd6ngr",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: import.meta.env.VITE_KEY
});

const bulder = urlBulder(client)

export const urlFor = (src:string) => bulder.image(src)
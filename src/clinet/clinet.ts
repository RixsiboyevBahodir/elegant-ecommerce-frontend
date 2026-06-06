import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: "vcbd6ngr",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: import.meta.env.VITE_KEY?.trim(),
  ignoreBrowserTokenWarning: true,
});

const builder = createImageUrlBuilder(client)

export const urlFor = (src: string) => builder.image(src)
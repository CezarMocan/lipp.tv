import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'kunbjep5',
  dataset: 'production',
  useCdn: false
})

export const queries = {
  allProjects: `
    *[_type=='project']{
      "id": _id,
      title,
      url,
      year,
      collaborators,
      client,
      description,
      color,
      textMinScale,
      textMaxScale,
      orderNumber,
      "images": images[]{
        asset->{
          "originalWidth": metadata.dimensions.width,
          "originalHeight": metadata.dimensions.height,
          "aspectRatio": metadata.dimensions.aspectRatio,
          "lqip": metadata.lqip,
          size,
          url,
          metadata
        },
        ...
      }
    }
  `
}
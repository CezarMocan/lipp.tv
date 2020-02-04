import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'kunbjep5',
  dataset: 'production',
  useCdn: true
})

export const allProjectsQuery = `*[_type == 'portfolio-item']{
  "id": _id,
  title,
  year,
  month,
  location,
  slug,
  description,
  hidden,
  thumbnail { asset -> {...}},
  images[] {
    image { asset ->{...}},
    video{ asset ->{...}},
    type,
    title,
    _key
  }
}`

const buildOrderedProjectsQuery = listId => `*[_id == '${listId}']{
  ...,
  items[] -> { 
    ...,
    "id": _id,
    thumbnail { asset -> {...}},
    images[] {
      image { asset ->{...}},
      video{ asset ->{...}},
      type,
      title,
      _key
    }  
  }
}`

export const creativeProjectsQuery = buildOrderedProjectsQuery('creative-portfolio-item-list')
export const productionProjectsQuery = buildOrderedProjectsQuery('production-portfolio-item-list')
export const postProjectsQuery = buildOrderedProjectsQuery('post-portfolio-item-list')

export const teamQuery = `*[_id == 'team-member-list'] {
  members[] -> {
    ...,
    photo { asset -> {...}}
  }
}`

export const aboutQuery = `*[_type == 'about-pages']`
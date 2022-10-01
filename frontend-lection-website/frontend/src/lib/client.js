import sanityClient from '@sanity/client'

const options = {
  projectId: 'm440g3h7',
  dataset: 'production',
  token:
    'skVS53yCPrBq1k1yOvxYI88sxpycDKcxGcF8GG57V1JunT8o0btbcTKRaxW5vhbNVjaobVnNqgDgUehDxGh8qeZdBaiPXXJFC1kC8cB22FhJ2Lc51KI2sGk9d3snyfoh9s6Eo7PYOYAv1UIP3f8SUzRxluM1ickqo34ixnazwkdLzKWGIaJ2',
}

const client = sanityClient({
  ...options,
  useCdn: process.env.NODE_ENV === 'production',
})

export default client

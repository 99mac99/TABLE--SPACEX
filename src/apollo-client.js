import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient ({
    cache: InMemoryCache({}),
    uri: 'https://api.spacex.land/graphql/',
});

export { client };
import {ApolloClient, InMemoryCache} from '@apollo/client'

interface aClient{
    cache: string;
    ursi : string;
}

const client = new ApolloClient ({
    cache: new InMemoryCache({}),
    uri: 'https://api.spacex.land/graphql/',
});

export { client };
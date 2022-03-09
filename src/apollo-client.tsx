import {ApolloClient, InMemoryCache} from '@apollo/client'
interface aClient{
    cache: string;
    uri : string;
}
const client = new ApolloClient ({
    cache: new InMemoryCache({}),
    uri: 'https://api.spacex.land/graphql/',
});

export { client };
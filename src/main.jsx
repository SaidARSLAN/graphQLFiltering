import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from './App.jsx'
import './index.css'

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
        <App />
  </ApolloProvider>,
)

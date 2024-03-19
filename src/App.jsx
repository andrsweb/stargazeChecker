import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Header from './components/Header/Header';
import CollectionInfo from './components/CollectionInfo/CollectionInfo'

const client = new ApolloClient({
  uri: 'https://graphql.mainnet.stargaze-apis.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <section className='collections'>
            <div className="container">
                <div className="collections-wrapper">
                    <CollectionInfo collectionAddr={"stars1py9rk2aupqavvm92470ujc6dfekas7lfe83jj28s6aue44mgn7lqaj5pju"}/>
                    <CollectionInfo collectionAddr={"stars1lue0e6aq8xnzk4c5zp7xekvx5nlk8jphzac4agsdd74w2tvezxgsk2d06w"}/>
                    <CollectionInfo collectionAddr={"stars1fk5hrdypsjvga3wa5nz048uckhxh7vkuf6ssthtdur3mmfye4rtqkndfn8"}/>
                    <CollectionInfo collectionAddr={"stars1nr950lfghsjd2jssn0gjws4fu0fequpagpcwhnsdkrxlck6pq53qcln2z8"}/>
                    <CollectionInfo collectionAddr={"stars1t895ys248mqc4qekjnrzmy074xjp2ddvaadlf9gfl490t3t4f8zsfms4jg"}/>
                    <CollectionInfo collectionAddr={"stars19jq6mj84cnt9p7sagjxqf8hxtczwc8wlpuwe4sh62w45aheseues57n420"}/>
                    <CollectionInfo collectionAddr={"stars1g2ptrqnky5pu70r3g584zpk76cwqplyc63e8apwayau6l3jr8c0sp9q45u"}/>
                    <CollectionInfo collectionAddr={"stars1avp0vggx4ke9pnxpkv8f3g7uddl2rmjwnzme9qx7cask2788wa3s7hesgp"}/>
                </div>
            </div>
        </section>
      </div>
    </ApolloProvider>
  )
}

export default App

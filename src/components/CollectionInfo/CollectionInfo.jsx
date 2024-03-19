import React, { useState, useEffect } from 'react'
import './CollectionInfo.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Img from '../Img/Img'
import finish from '../../ico/finish.svg'

const client = new ApolloClient({
    uri: 'https://graphql.mainnet.stargaze-apis.com/graphql',
    cache: new InMemoryCache(),
})

const CollectionInfo = ({ collectionAddr }) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [collectionData, setCollectionData] = useState(null)
    const [floorPriceChange, setFloorPriceChange] = useState(null)
    const [highestOfferChange, setHighestOfferChange] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const collectionResult = await getCollectionData(collectionAddr)
                setCollectionData(collectionResult.data.collection)

                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [collectionAddr])

    const getCollectionData = async (collectionAddr) => {
        return await client.query({
            query: gql`
                query GetCollectionData($address: String!) {
                    collection(address: $address) {
                        contractAddress
                        contractUri
                        minterAddress
                        name
                        description
                        creator {
                            address
                            name {
                                name
                            }
                        }
                        symbol
                        website
                        creationTime
                        startTradingTime
                        traits {
                            name
                        }
                        mintStatus
                        tags
                        isExplicit
                        floorPrice
                        highestOffer {
                            price
                        }
                        media {
                            url
                        }
                    }
                }
            `,
            variables: {
                address: collectionAddr
            }
        })
    }

    useEffect(() => {
        if (collectionData && collectionData.floorPrice && collectionData.highestOffer) {
            const oldFloorPrice = collectionData.floorPrice
            const newFloorPrice = collectionData.floorPrice
            const oldHighestOffer = collectionData.highestOffer.price
            const newHighestOffer = collectionData.highestOffer.price

            if (oldFloorPrice < newFloorPrice) {
                setFloorPriceChange('up')
            } else if (oldFloorPrice > newFloorPrice) {
                setFloorPriceChange('down')
            } else {
                setFloorPriceChange(null)
            }

            if (oldHighestOffer < newHighestOffer) {
                setHighestOfferChange('up')
            } else if (oldHighestOffer > newHighestOffer) {
                setHighestOfferChange('down')
            } else {
                setHighestOfferChange(null)
            }
        }
    }, [collectionData])
  
    const formatCurrency = (amount) => {
        const formatter = new Intl.NumberFormat('en-US', {
            currency: 'USD',
        })
        let formattedAmount = formatter.format(amount / 1e6)
        formattedAmount = formattedAmount.replace('$', '')
        return (
            <>
                <Img /> {formattedAmount}
            </>
        )
    }

    if (loading) return <p>Loading data...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className='data-card'>
            <div className="data-info">
                <div className='data-name'>{collectionData.name}</div>

                <div className="creator-info">
                    <p>
                        <span>Creator:</span> <a href={`https://www.stargaze.zone/m/${collectionData.contractUri}/tokens`}>View</a>
                    </p>
                    <p><span>Wallet:</span> <a href={`https://www.stargaze.zone/p/${collectionData.creator.address}`} target={"_blanc"}>View</a></p>
                    {collectionData.website ? (
                        <p><span>Website:</span> <a href={collectionData.website}>View</a></p>
                    ) : null}
                </div>

                <p className='data-desc'><span>Description:</span> {collectionData.description}</p>

                <p className='data-time'><span>Created:</span> {new Date(Number(collectionData.creationTime) / 1000000).toLocaleString()}</p>
            </div>

            <div className='data-image-wrapper'>
                {collectionData.media ? (
                    <div className='data-image'>
                        <img src={collectionData.media.url} alt="Collection main background" />
                    </div>
                ) : <span className='data-inner'>Image don't loading 😢</span>}

                <div className={`data-status ${collectionData.mintStatus === 'FULLY_MINTED' ? 'end' : ''}`}>
                    <p>Status: <span>{collectionData.mintStatus}</span></p>
                    {collectionData.mintStatus === 'FULLY_MINTED' && <img src={finish} alt="" />}
                </div>


                <div className="data-price-wrapper">
                    <div className="data-price-inner">
                        {collectionData.floorPrice ? (
                            <div className={`data-inner ${floorPriceChange ? floorPriceChange : ''}`}>
                                <span>Floor Price:</span>
                                <div className='price-wrapper'>
                                    {formatCurrency(collectionData.floorPrice)}
                                    {floorPriceChange === 'up' && <span className="price-arrow">&#8593;</span>}
                                    {floorPriceChange === 'down' && <span className="price-arrow">&#8595;</span>}
                                </div>
                            </div>
                        ) : (
                            <span className='data-inner no-price'>No floor price 😢</span>
                        )}

                        {collectionData.highestOffer ? (
                            <div className={`data-inner ${highestOfferChange ? highestOfferChange : ''}`}>
                                <span>Highest Offer:</span>
                                <div className='price-wrapper'>
                                    {formatCurrency(collectionData.highestOffer.price)}
                                    {highestOfferChange === 'up' && <span className="price-arrow">&#8593;</span>}
                                    {highestOfferChange === 'down' && <span className="price-arrow">&#8595;</span>}
                                </div>
                            </div>
                        ) : (
                            <span className='data-inner no-price'>No highest offer price 😢</span>
                        )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default CollectionInfo

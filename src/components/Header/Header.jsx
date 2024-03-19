import React, { useState, useEffect } from 'react'
import "./Header.css"
import Button from "../Button/Button"
import star from '../../ico/star.svg'

const Header = () => {
    const [hovered, setHovered] = useState(false)
    const [randomText, setRandomText] = useState("DATA")

    useEffect(() => {
        if (hovered) {
            const interval = setInterval(() => {
                setRandomText(generateRandomText())
            }, 150)
            return () => clearInterval(interval)
        }
    }, [hovered])

    const generateRandomText = () => {
        const originalText = "DATA"
        let newText = ''
        for (let i = 0; i < originalText.length; i++) {
            newText += getRandomChar()
        }
        return newText
    }

    const getRandomChar = () => {
        const chars = "板籠居木手憾糸扱沖又呈巾金"
        return chars.charAt(Math.floor(Math.random() * chars.length))
    }

    const changeTextOnEnter = () => {
        setHovered(true)
    }

    const changeTextOnLeave = () => {
        setHovered(false)
        setRandomText("DATA")
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-wrapper">
                    <img src={star} alt="star icon" />
                    <div className="logo-wrapper">
                        <a href="/" className="header-logo" onMouseEnter={changeTextOnEnter} onMouseLeave={changeTextOnLeave}>
                            STARGAZE <span>{randomText}</span>
                        </a>
                    </div>
                    <Button text="Connect Wallet" />
                </div>
            </div>
        </header>
    )
}

export default Header

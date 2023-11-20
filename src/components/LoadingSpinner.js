import * as React from 'react'
import Spinner from '../util/Spinner.gif'
import '../styles/spinner.css'

function LoadingSpinner() {
    return (
        <div className="fp-container">
            <img src={Spinner} className="fp-loader" alt="loading" />
        </div>
    )
}

export {LoadingSpinner}
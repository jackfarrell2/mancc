import styled from '@emotion/styled/macro'
import {FaSpinner} from 'react-icons/fa'
import {keyframes} from '@emotion/react'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  'aria-label': 'loading',
}

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  )
}


export {FullPageSpinner}
import {CircleNotch} from 'phosphor-react'
import styled from 'styled-components'

function LoadingSpinner() {
  return (
    <LoadingSpinnerWrapper size={32} weight="bold" color='#27C383'/>
  )
}

const LoadingSpinnerWrapper = styled(CircleNotch)`
    
`

export default LoadingSpinner
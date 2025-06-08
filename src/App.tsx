import { useState } from 'react'
import { styled } from '@linaria/react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const LogoImg = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) & {
      animation: logo-spin infinite 20s linear;
    }
  }
`

const ReactLogoImg = styled(LogoImg)`
  &:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`

const Card = styled.div`
  padding: 2em;
`

const ReadTheDocs = styled.p`
  color: #888;
`

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <LogoImg src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <ReactLogoImg src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <ReadTheDocs>
        Click on the Vite and React logos to learn more
      </ReadTheDocs>
    </>
  )
}

export default App

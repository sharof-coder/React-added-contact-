import React from 'react'
import MainCom from './components/MainCom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const App = () => {
  return (
    <div className='App'>
      <Container>
        <MainCom />
      </Container>
    </div>
  )
}

export default App
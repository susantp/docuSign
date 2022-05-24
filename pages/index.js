import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import SignatureCanvas from 'react-signature-canvas'
import gStyle from '../styles/Home.module.css'


export default function Home() {
  const [sigPag, setSigPag] = useState({})
  const [trimmedDataURL, setTrimmedDataURL] = useState(null)
  const [ip, setIp] = useState('0.0.0.0')
  const [createdAt, setCreatedAt] = useState('0000-00-00')

  const handleTrim = () => {
    let date = new Date()
    
    setCreatedAt(date.toLocaleString())
    setTrimmedDataURL(sigPag.getTrimmedCanvas()
      .toDataURL('image/png'))
    console.log(sigPag)
  }
  useEffect(() => {
    setIp('0.0.0.0')
    // fetch('http://api.ipify.org?format=json')
    //   .then(response => response.json())
    //   .then(data => console.log(data));
  }, [sigPag])
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
      </Head>
      <Container>
        <h2>Sign Here</h2>
        <div className={gStyle.board}>
          <SignatureCanvas
            backgroundColor='white'
            penColor='black'
            canvasProps={{
              width: 500, height: 200,
            }}
            ref={(ref) => setSigPag(ref)}
          />
        </div>
        <Row className='justify-content-md-center'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Sign</th>
                <th>IP</th>
                <th>Signed At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#</td>
                <td><img src={trimmedDataURL} width={100} /></td>
                <td>{ip}</td>
                <td>{createdAt}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <Button variant="primary" onClick={handleTrim}>Submit</Button>
        </Row>
      </Container>
    </>
  )
}

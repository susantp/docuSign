import { useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import SignatureCanvas from 'react-signature-canvas'
import gStyle from '../styles/Home.module.css'

export default function Home () {
  const [sigPag, setSigPag] = useState({})
  const [trimmedDataURL, setTrimmedDataURL] = useState(null)
  const [ip, setIp] = useState('0.0.0.0')
  const [createdAt, setCreatedAt] = useState('0000-00-00')
  const [geoLocation, setGeoLocation] = useState({ lat: '0.00', lon: '0.00' })
  const [location, setLocation] = useState({ city: '', country: '' })

  const handleTrim = () => {
    let date = new Date()
    setCreatedAt(date.toLocaleString())
    setTrimmedDataURL(sigPag.getTrimmedCanvas()
      .toDataURL('image/png'))
    fetchIp().then(r => console.log(r))
  }
  const handleClear = () => {
    sigPag.clear()
    setTrimmedDataURL(null)
    setIp('0.0.0.0')
    setCreatedAt('0000-00-00')
    setGeoLocation({ lat: '0.00', lon: '0.00' })
    setLocation({city:'', country: ''})

  }

  const fetchIp = async () => {
    await fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setLocation({ city: data.city, country: data.country_name })
        setIp(data.ip)
        setGeoLocation({ lat: data.latitude, lon: data.longitude })
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  return (
    <Container>
      <h2>Sign Here</h2>
      <div className={gStyle.board}>
        <SignatureCanvas
          backgroundColor="white"
          penColor="black"
          canvasProps={{
            width: 500, height: 200,
          }}
          ref={(ref) => setSigPag(ref)}
        />
      </div>
      <Row className="justify-content-md-center">
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Sign</th>
            <th>IP</th>
            <th>Geolocation</th>
            <th>Address</th>
            <th>Signed At</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>#</td>
            <td><img src={trimmedDataURL} width={100}/></td>
            <td>{ip}</td>
            <td>Lat - {geoLocation.lat} , Long - {geoLocation.lon}</td>
            <td>{location.city}, {location.country}</td>
            <td>{createdAt}</td>
          </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Button variant="primary" onClick={handleTrim}>Submit</Button>
        <Button variant="warning" onClick={handleClear}>Clear</Button>
      </Row>
    </Container>
  )
}

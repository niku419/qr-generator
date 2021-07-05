import React, { useState } from 'react'
import '../App.css'
import qrCode from 'qrcode'
import { Jumbotron, Container, InputGroup, FormControl, Button, Image, Navbar, Nav, Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

function Qr() {
	const [text,setText] = useState('')
	const [qr,setQr] = useState('data:image/png;base64,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')
	const handleClick = () =>{
		qrCode.toDataURL(text, {errorCorrectionLevel: 'H'}, (err, url)=>{
			setQr(url)
			setText('')
			console.log(url)
		})
	}
	return (
	<Container>
		<Jumbotron fluid><h1>Make Your QR</h1></Jumbotron>
		<Container>
			<InputGroup className="mb-3 d-flex justify-content-center">
				<FormControl
					onChange={e => setText(e.target.value)} 
					value={text}
					aria-describedby="basic-addon1"
					placeholder="Enter Text"
				/>
				<Button variant="outline-primary" className="button mt-0" onClick={handleClick}>Get Your Qr</Button>
			</InputGroup>
		<Image src={qr} alt='someImage' thumbnail className="qrStyle p-0 m-0"/>
		</Container>
		<Container>
			<Navbar bg="transparent" fixed="bottom" variant="light">
				<Navbar.Brand href="#home" style={{color: "#05386b"}}>
					<strong>Niku419</strong>
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="https://github.com/niku419"><FontAwesomeIcon color="#05386b" icon={faGithub} /></Nav.Link>
					<Nav.Link href="https://linkedin.com/niku_419"><FontAwesomeIcon color="#05386b" icon={faLinkedinIn} /></Nav.Link>
					<Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon color="#05386b" icon={faInstagram} /></Nav.Link>
					<Nav.Link href="#"><FontAwesomeIcon color="#05386b" icon={faFacebookF} /></Nav.Link>
				</Nav>
				<Form inline>
					{/* <Nav className="mr-auto"> 
						<Nav.Link>made for Hiku<FontAwesomeIcon color="#8d0101" icon={faHeart} /></Nav.Link>
					</Nav> */}
				</Form>
		</Navbar>
		</Container>
	</Container>
	)
}
export default Qr

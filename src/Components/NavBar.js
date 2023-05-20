import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("Role")
    function handleClick() {
        localStorage.clear();
        navigate("/")
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{ /* fontFamily: 'Brush Script MT' */ fontFamily: 'Courier New ', fontSize: '30px', fontWeight: 'bold', textTransform: 'uppercase' }}>Agri<span style={{ color: '#68B984' }}>Ceylon</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {/* <Nav.Link href="/">Home</Nav.Link> */}
                        {(userRole === "Admin" || userRole === "Farmer") && < Nav.Link href="/">Home</Nav.Link>}
                        {/* <Nav.Link href="/FertilizerAdmin">Farmer</Nav.Link> */}
                        {userRole === "Admin" && <Nav.Link href="/FertilizerAdmin">Fertilizer</Nav.Link>}
                        {userRole === "Admin" && <Nav.Link href="/AdminDash">Admin</Nav.Link>}

                    </Nav>
                    <Link to='/UserProfile'>
                        <Button variant="info" onClick={handleClick} style={{ marginRight: '15px' }}>Profile</Button>
                    </Link>
                    <Form className="d-flex">
                        {!userRole ? <Button variant="outline-success" href='/Login' style={{ marginRight: '15px' }}>Sign In</Button> :
                            <Button variant="outline-danger" onClick={handleClick} style={{ marginRight: '15px' }}>Sign Out</Button>}
                        {/* <Link to='/Login'>
                            <Button variant="outline-success">Sign In</Button>
                        </Link> */}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavBar;
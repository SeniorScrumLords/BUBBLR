import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import '../../styling/NavFilter.css';

function NavFilter({ onLogout }) {
  const location = useLocation();
  const [filters, setFilters] = useState({
    categories: [],
    alcoholic: [],
  });

  useEffect(() => {
    axios
      .all([
        axios.get(
          'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        ),
        axios.get(
          'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list',
        ),
      ])
      .then(
        axios.spread((categoriesResponse, alcoholicResponse) => {
          const categories = categoriesResponse.data.drinks.map(
            (drink) => drink.strCategory,
          );
          const alcoholic = alcoholicResponse.data.drinks.map(
            (drink) => drink.strAlcoholic,
          );
          setFilters({ categories, alcoholic });
        }),
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching filters:', error);
      });
  }, []);

  const onHomepage = location.pathname === '/home';
  const onProfile = location.pathname === '/profile';

  return (
    <Navbar expand='lg' className='custom-navbar'>
      <Container>
        <Navbar.Brand as={Link} to='/home'>
          Bubblr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {onHomepage && (
              <NavDropdown title='Filters' id='navbarScrollingDropdown'>
                <NavDropdown title='Categories' id='navbarScrollingDropdown'>
                  {filters.categories.map((category, index) => (
                    <NavDropdown.Item
                      key={`c-${index}`}
                      as={Link}
                      to={`/filtered/${category}`}
                    >
                      {category}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown.Divider />
                <NavDropdown title='Alcoholic' id='navbarScrollingDropdown'>
                  {filters.alcoholic.map((type, index) => (
                    <NavDropdown.Item
                      key={`a-${index}`}
                      as={Link}
                      to={`/filtered/${type}`}
                    >
                      {type}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </NavDropdown>
            )}
            <Nav.Link as={Link} to='/profile'>
              Account
            </Nav.Link>
            <Nav.Link as={Link} to='/community'>
              Community
            </Nav.Link>
            <Nav.Link as={Link} to='/bar-hop'>
              Bar Hop
            </Nav.Link>
            <Nav.Link as={Link} to='/creationStation'>
              Creation Station
            </Nav.Link>
            <Nav.Link as={Link} to='/liquor'>
              Liquor Cabinet
            </Nav.Link>
            <NavDropdown title='Games' id='gamesDropdown'>
              <NavDropdown.Item as={Link} to="/trivia">Trivia</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/leaderboard">Leaderboard</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/memory-match">Memory Match</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to='/hangovers'>
            Hangovers
            </Nav.Link>
            {onProfile && (
              <><Nav.Link onClick={onLogout}>
                Logout
                </Nav.Link></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavFilter;

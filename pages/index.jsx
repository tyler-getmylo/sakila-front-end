import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import fuzzysort from 'fuzzysort';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Card, Form, Table } from 'react-bootstrap';
import urlon from 'urlon';

import { mdIcon, ROUND, useStateDeepEqual } from '../src/util';

const TITLE = 'title';
const DESC = 'description';

export default function IndexPage() {
  const [titleSearch, setTitleSearch] = useState('');
  const [descSearch, setDescSearch] = useState('');
  const [json, setJson] = useStateDeepEqual([[]]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get('/api/film')
      .then(resp => setJson(resp.data))
      .catch(err => console.error(err));
  }, [setJson]);

  useEffect(() => {
    const [rows] = json;
    const titleFiltered =
      titleSearch === ''
        ? rows
        : fuzzysort.go(titleSearch, rows, { key: TITLE }).map(s => s.obj);
    setFiltered(
      descSearch === ''
        ? titleFiltered
        : fuzzysort
            .go(descSearch, titleFiltered, { key: DESC })
            .map(s => s.obj),
    );
  }, [titleSearch, descSearch, json]);

  return (
    <Card>
      <Card.Header>Film Store Browser</Card.Header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Details</th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Title"
                onChange={event => setTitleSearch(event.target.value)}
              />
            </th>
            <th>
              <Form.Control
                type="text"
                placeholder="Filter by Description"
                onChange={event => setDescSearch(event.target.value)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(({ film_id, title, description }) => (
            <tr key={film_id}>
              <td>
                <Link
                  href={{
                    pathname: '/film',
                    query: { json: urlon.stringify({ film_id }) },
                  }}
                >
                  <img
                    src={mdIcon('action', 'description', ROUND)}
                    alt="Details"
                  />
                </Link>
              </td>
              <td>
                {titleSearch === ''
                  ? title
                  : fuzzysort.highlight(
                      fuzzysort.single(titleSearch, title),
                      match => <b style={{ color: 'blue' }}>{match}</b>,
                    )}
              </td>
              <td>
                {descSearch === ''
                  ? description
                  : fuzzysort.highlight(
                      fuzzysort.single(descSearch, description),
                      match => <b style={{ color: 'blue' }}>{match}</b>,
                    )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

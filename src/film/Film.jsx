import axios from 'axios';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import styles from './Film.module.css';
import { useStateDeepEqual } from '../util';

function DetailCard({ title, content }) {
  return (
    <Card className={styles.column}>
      <Card.Header className={[styles.cardTitle, styles.whiteFont].join(' ')}>
        {title}
      </Card.Header>
      <div className={styles.content}>
        <div
          className={[
            styles.centered,
            styles.whiteFont,
            title === 'Description' ? styles.small : styles.big,
          ].join(' ')}
        >
          {content}
        </div>
      </div>
    </Card>
  );
}

DetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default function Film() {
  const router = useRouter();
  const [json, setJson] = useStateDeepEqual([
    [
      {
        title: '',
        description: '',
        release_year: '',
        rental_duration: '',
        rental_rate: '',
        length: '',
        replacement_cost: '',
        rating: '',
        lang: '',
      },
    ],
  ]);

  useEffect(() => {
    console.log('effect');
    console.log(router.isReady);
    if (!router.isReady) return;

    axios
      .get('/api/film', {
        params: router.query,
      })
      .then(resp => setJson(resp.data))
      .catch(err => console.error(err));
  }, [router.isReady, router.query, setJson]);

  const [[row]] = json;

  console.log('----------------------', row);

  return (
    <Card className={styles.pageCard}>
      <Card.Header
        className={[styles.whiteFont, styles.big].join(' ')}
      >{`Film: ${row.title}`}</Card.Header>
      <div className={styles.row}>
        <DetailCard
          className={styles.column}
          title="Description"
          content={row.description}
        />
        <DetailCard
          className={styles.column}
          title="Release Year"
          content={row.release_year}
        />
      </div>
      <div className={styles.row}>
        <DetailCard
          className={styles.column}
          title="Rental Duration"
          content={row.rental_duration}
        />
        <DetailCard
          className={styles.column}
          title="Rental Rate"
          content={row.rental_rate}
        />
      </div>
      <div className={styles.row}>
        <DetailCard
          className={styles.column}
          title="Length"
          content={row.length}
        />
        <DetailCard
          className={styles.column}
          title="Replacement Cost"
          content={row.replacement_cost}
        />
      </div>
      <div className={styles.row}>
        <DetailCard
          className={styles.column}
          title="Rating"
          content={row.rating}
        />
        <DetailCard
          className={styles.column}
          title="Language"
          content={row.lang}
        />
      </div>
    </Card>
  );
}

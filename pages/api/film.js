import urlon from 'urlon';
import connect from '../../src/connect';

const eqSet = (xs, ys) => xs.size === ys.size && [...xs].every(x => ys.has(x));

export default async function handler(req, res) {
  const { conn } = await connect();
  if (Object.keys(req.query).length === 0) {
    res
      .status(200)
      .json(await conn.query('select film_id, title, `description` from film'));
  } else if (eqSet(new Set(Object.keys(req.query)), new Set(['json']))) {
    res.status(200).json(
      await conn.execute(
        `select title,
                  \`description\`,
                  release_year,
                  rental_duration,
                  rental_rate,
                  length,
                  replacement_cost,
                  rating,
                  l.name as lang
           from sakila.film as f
                    left join sakila.language as l on f.language_id = l.language_id
           where f.film_id = ?`,
        [urlon.parse(req.query.json).film_id],
      ),
    );
  } else {
    res.status(400);
  }

  conn.end();
}

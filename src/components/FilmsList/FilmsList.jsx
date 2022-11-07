import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './FilmsList.css';
import { Spin, Alert } from 'antd';

import Film from '../Film/Film';

function FilmsList({ films, loading }) {
  const antIcon = (
    <LoadingOutlined
      className="imgSpin"
      style={{
        fontSize: 70,
      }}
      spin
    />
  );
  const elements =
    films.length || loading ? (
      films.map((item) => (
        <Film
          key={item.id}
          id={item.id}
          title={item.title}
          rate={item.vote_average}
          date={item.release_date}
          overview={item.overview}
          genresIds={item.genre_ids}
          img={
            loading ? (
              <Spin indicator={antIcon} />
            ) : (
              <img
                alt="kek "
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : 'https://critics.io/img/movies/poster-placeholder.png'
                }
              />
            )
          }
        />
      ))
    ) : (
      <Alert message="Relax" description="Have movie no more" type="warning" showIcon />
    );
  return <div className="filmListSection">{elements}</div>;
}
export default FilmsList;

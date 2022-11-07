import React from 'react';
import { Card, Progress, Tag, Rate, Typography } from 'antd';
import './Film.css';
import { format } from 'date-fns';

import FilmService from '../filmService/filmService';
import { MyContextConsumer } from '../MyContext';

const { Paragraph } = Typography;

export default class Film extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { title, img, rate, date, overview, genresIds, id } = this.props;
    const formatDate = () =>
      date ? format(new Date(...date.split('-').map((item) => +item)), 'MMMM d, yyyy') : 'Has no release date';
    const setProgressColor = (value) => {
      if (value > 7) {
        return '#66E900';
      }
      if (value > 5) {
        return '#E9D100';
      }
      if (value > 3) {
        return '#E97E00';
      }
      return '#E90000';
    };
    return (
      <Card bordered={false} hoverable cover={img}>
        <section className="cardInfo">
          <header className="cardHeader">
            <h2>
              <Paragraph ellipsis={{ rows: 2 }}> {title} </Paragraph>
              <Progress
                type="circle"
                percent={100}
                format={() => rate.toFixed(1)}
                strokeColor={setProgressColor(rate)}
                strokeWidth={6}
                width={40}
              />
            </h2>
            <time>{formatDate()}</time>
            <div className="tags">
              <MyContextConsumer>
                {(genres) =>
                  genresIds.map((item) => {
                    let newElem = <Tag key={item.id}>unknown genre</Tag>;
                    genres.forEach((genre) => {
                      if (genre.id === item) {
                        newElem = <Tag key={genre.id}>{genre.name}</Tag>;
                      }
                    });
                    return newElem;
                  })
                }
              </MyContextConsumer>
            </div>
          </header>
          <main>
            <Paragraph ellipsis={{ rows: 5 }}>{overview}</Paragraph>
          </main>
          <footer>
            <Rate
              allowHalf
              defaultValue={Number(sessionStorage.getItem(id)) || 0}
              count="10"
              onChange={(value) => {
                sessionStorage.setItem(id, value);
                FilmService.doRated(id, value);
                return value;
              }}
            />
          </footer>
        </section>
      </Card>
    );
  }
}

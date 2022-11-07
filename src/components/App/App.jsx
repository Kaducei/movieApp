import React from 'react';
import './App.css';
import { Layout, Tabs, Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { MyContextProvider } from '../MyContext';
import SearchFilms from '../SearchFilms/SearchFilms';
import FilmsList from '../FilmsList';
import NavigationList from '../NavigationList';
import FilmService from '../filmService/filmService';
import DetectorOffline from '../DetectOffline';

const { Content, Footer } = Layout;
export default class App extends React.Component {
  filmService = new FilmService();

  constructor() {
    super();
    this.state = {
      page: 1,
      films: [],
      ratedFilms: [],
      active: 'alert',
      loading: false,
    };
  }

  componentDidMount() {
    FilmService.newSession();
    sessionStorage.clear();
    this.filmService.getGenres().then((response) => {
      if (response.genres) {
        this.setState(() => ({
          genres: response.genres,
        }));
      }
    });
  }

  fetchData = (label) => {
    this.setState(() => ({
      loading: true,
      films: [],
    }));
    if (label) {
      this.filmService.changeLabel(label);
      this.filmService
        .getFilms()
        .then((response) => {
          if (response.results) {
            this.setState(() => ({
              films: [...response.results],
              active: 'none-alert',
              loading: false,
            }));
          } else {
            this.setState(() => ({
              films: [],
              active: 'info',
              loading: false,
            }));
          }
        })
        .catch(() => {
          this.setState(() => ({
            films: [],
            active: 'error',
            loading: false,
          }));
        });
    } else {
      this.setState(() => ({
        films: [],
        active: 'alert',
        loading: false,
      }));
    }
  };

  newPage = (value) => {
    this.filmService.changePage(value);
    this.filmService.getFilms().then((response) => {
      this.setState(() => ({
        films: [...response.results],
        active: 'none-alert',
      }));
    });
    this.setState(() => ({
      page: value,
    }));
  };

  updateRate() {
    FilmService.getRated().then((ratedResponse) =>
      this.setState(() => ({
        ratedFilms: ratedResponse.results,
      }))
    );
  }

  render() {
    const { films, ratedFilms, page, active, loading, genres } = this.state;

    const antIcon = (
      <LoadingOutlined
        style={{
          fontSize: 24,
        }}
        spin
      />
    );
    const antIconBig = (
      <LoadingOutlined
        style={{
          fontSize: 300,
        }}
        spin
      />
    );
    const spinner = loading ? <Spin indicator={antIcon} /> : null;
    const bigSpinner = loading ? <Spin className="bigSpinner" indicator={antIconBig} /> : null;
    return (
      <MyContextProvider value={genres}>
        <Tabs
          onChange={(value) => {
            if (value === 'rated') {
              this.updateRate();
            }
          }}
          defaultActiveKey="1"
          items={[
            {
              label: 'Search',
              key: 'search',
              children: (
                <DetectorOffline>
                  <Layout>
                    <SearchFilms fetchData={this.fetchData} />
                    {spinner}
                    <Content>
                      {bigSpinner}
                      <FilmsList films={films} page={page} loading={loading} />
                      <Alert
                        className={active}
                        message="Info"
                        description="Enter your search query above to start"
                        type="info"
                        showIcon
                        onClick={() => this.session()}
                      />
                    </Content>
                    <Footer>
                      <NavigationList newPage={this.newPage} />
                    </Footer>
                  </Layout>
                </DetectorOffline>
              ),
            },

            {
              label: 'Rated',
              key: 'rated',
              children: <FilmsList films={ratedFilms} page={page} loading={loading} />,
            },
          ]}
        />
      </MyContextProvider>
    );
  }
}

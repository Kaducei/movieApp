export default class FilmService {
  apiKey = '98f4632ec690c1a58c75ef188cab4e81';

  label = '';

  page = 1;

  changeLabel(label) {
    this.label = label;
  }

  changePage(page) {
    this.page = page;
  }

  async getGenres() {
    const genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`);
    return genres.json();
  }

  static async newSession() {
    const result = await fetch(
      'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=98f4632ec690c1a58c75ef188cab4e81'
    );
    const data = await result.json();
    localStorage.setItem('token', data.guest_session_id);
    return data.guest_session_id;
  }

  static async getRated() {
    const token = localStorage.getItem('token');
    const data = await fetch(
      `https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=98f4632ec690c1a58c75ef188cab4e81&language=en-US&sort_by=created_at.asc`
    );
    return data.json();
  }

  static async doRated(movieId, value) {
    const token = localStorage.getItem('token');
    const apiGet = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=98f4632ec690c1a58c75ef188cab4e81&guest_session_id=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value,
        }),
      }
    );
    return apiGet.json();
  }

  async getFilms() {
    const apiGet = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.label}&page=${this.page}`
    );
    return apiGet.json();
  }
}

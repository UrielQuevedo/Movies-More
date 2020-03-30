const { Router } = require('express');
const { executeFunction } = require('../connection');
const router = Router();
const rp = require('request-promise');
const ProgramService = require('../service/ProgramService');
const GenreService = require('../service/GenreService');

/* 
  Devuelvo un programa por el uid
*/
// router.get('/:uid', (executeFunction(['language'], (req, res) => {
//   console.log("ENtro");
//   const { uid } = req.params;
//   ProgramService.getProgram(uid)
//     .then((program) => res.status(201).json(program));
// })));

/*
  Devuelve todos los capitulos de una season
*/
router.get('/:uid/season/:season_number', (executeFunction(['language'], (req, res) => {
  const { uid, season_number } = req.params;
  return ProgramService.getSeason(uid, parseInt(season_number))
    .then((season) => res.status(201).json(season));
})));

/*
  Devuelve el capitulo especifico
*/
router.get('/:uid/season/:season_number/episode/:episode_number', (executeFunction(['language'], (req, res) => {
  const { uid, episode_number, season_number } = req.params;
  ProgramService.getEpisode(uid, parseInt(season_number), parseInt(episode_number))
    .then((episode) => res.status(201).json(episode));
})));

/*
  Devuelvo las ultimas series enpaginadas Puede o no contener el rango, en caso que no el default es 20
*/
router.get('/genre/:genre', (executeFunction(['page', 'language'], (req, res) => {
  const { page, range } = req.query;
  const { genre } = req.params;
  ProgramService.getPrograms(genre, parseInt(page), parseInt(range))
    .then((programs) => res.status(201).json(programs))
})));

/*
  Devuelvo los ultimos capitulos enpaginadas Puede o no contener el rango, en caso que no el default es 20
*/
router.get('/episodes/latest', (executeFunction(['page', 'language'], async (req, res) => {
  const { page, range } = req.query;
  const latest_episodes = await ProgramService.getLatestEpisodes(parseInt(page), parseInt(range));
  res.status(201).json(latest_episodes);
})));

router.get('/create', (executeFunction([], (req, res) => {
  let ids = [];
  let genres = new Set();
  const API_KEY = '79a3f2fba1eb064439c6aecab8c7d7b2';
  const URL = 'https://api.themoviedb.org/3/tv';

  for (let i = 1; i < 9; i++) {
    rp(`${URL}/popular?api_key=${API_KEY}&language=en-US&page=${2}`)
      .then((response) => {
        const result = JSON.parse(response);
        result.results.forEach(element => {
          ids.push(element.id)
        });
        if(i === 8) {
          ids.forEach(id => {
            rp(`${URL}/${id}?api_key=${API_KEY}&language=es`)
            .then((data) => {
              const _data = JSON.parse(data);
              const _backdrop = `https://image.tmdb.org/t/p/original${_data.backdrop_path}`;
              const poster = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${_data.poster_path}`; 
              var newProgram = {
                backdrop_url: _backdrop,
                es_title: _data.name,
                es_overview: _data.overview,
                es_poster_url: poster,
                number_of_seasons: _data.number_of_seasons,
                number_of_episodes: _data.number_of_episodes,
                upload_date: new Date(),
              }
              rp(`${URL}/${id}?api_key=${API_KEY}&language=en`)
              .then((en) => {
                const _en = JSON.parse(en);
                const poster = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${_en.poster_path}`; 
                newProgram.en_overview = _en.overview;
                newProgram.en_title = _en.name,
                newProgram.en_poster_url = poster,
                newProgram.genres = _en.genres.map((e) => e.name.toLowerCase());
                newProgram.genres.forEach(e => genres.add(e));
                ProgramService.addProgram(newProgram).then(doc => {
                  const programUid = doc.id;
                    for (let s = 1; s < _data.number_of_seasons + 1; s++) {
                      const newSeason = {
                        season_number : s,
                        episodes: [],
                      }
                      ProgramService.addSeason(newSeason, programUid);
                    }
                  cargarCarpitulos(id, _data, programUid);
                })
                const ls = Array.from(genres);
                GenreService.addGenres(ls, 'programs');
              })
            })
          })
        } 
      })
  }
  res.status(201).json("OK");
})));

const cargarCarpitulos = (id, data, programUid) => {
  const API_KEY = '79a3f2fba1eb064439c6aecab8c7d7b2';
  const URL = 'https://api.themoviedb.org/3/tv';
  for (let index = 1; index < 2; index++) {
    for (let e = 1; e < parseInt(data.seasons[index].episode_count); e++) {
      
        rp(`${URL}/${id}/season/${index}/episode/${e}?api_key=${API_KEY}&language=es`)
        .then((episode) => {
          const _episode = JSON.parse(episode);
          const poster = `https://image.tmdb.org/t/p/w400/${_episode.season_number}`;
          const newEpisode = {
            es_title : _episode.name,
            es_overview : _episode.overview,
            season_number : _episode.season_number,
            episode_number : e,
            preview_image_url: poster,
          }
          rp(`${URL}/${id}/season/${index}/episode/${e}?api_key=${API_KEY}&language=en`)
          .then((en2) => {
            const _en2 = JSON.parse(en2);
            newEpisode.en_title = _en2.name;
            newEpisode.en_overview = _en2.overview
            ProgramService.addEpisode(newEpisode, programUid);
          })
        })
    }
 }
}

module.exports = router;
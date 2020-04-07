const { Router } = require('express');
const { executeFunction } = require('../connection');
const router = Router();
const rp = require('request-promise');
const ProgramService = require('../service/ProgramService');
const GenreService = require('../service/GenreService');
const { checkGenre } = require('../middleware/latest-episodes-middleware');
const { translateAll } = require('../translate/programsTranslate');

/* 
  Devuelvo un programa por el uid
*/
// router.get('/:uid', (executeFunction(['language'], async (req, res) => {
//   const { uid } = req.params;
//   const program = await ProgramService.getProgram(uid);
//   res.status(201).json(program);
// })));

/*
  Devuelve todos los capitulos de una season
*/
router.get('/:uid/season/:season_number', (executeFunction(['language'], async (req, res) => {
  const { uid, season_number } = req.params;
  const season = await ProgramService.getSeason(uid, season_number);
  res.status(201).json(season);
})));

/*
  Devuelve el capitulo especifico
*/
router.get('/:uid/season/:season_number/episode/:episode_number', (executeFunction(['language'], async (req, res) => {
  const { uid, episode_number, season_number } = req.params;
  const episode = await ProgramService.getEpisode(uid, season_number, parseInt(episode_number));
  res.status(201).json(episode);
})));

/*
  Devuelvo las ultimas series enpaginadas Puede o no contener el rango, en caso que no el default es 20
*/
router.get('/genre/:genre', checkGenre, (executeFunction(['page', 'language'], async (req, res) => {
  //TODO: chequear si devuelve
  const { page, range, language } = req.query;
  const { genre } = req.params;
  const programs = await ProgramService.getPrograms(genre, parseInt(page), parseInt(range));
  res.status(201).json(translateAll(language, programs));
})));

router.get('/create', (executeFunction([], (req, res) => {
  let ids = [];
  let genres = new Set();
  const API_KEY = '79a3f2fba1eb064439c6aecab8c7d7b2';
  const URL = 'https://api.themoviedb.org/3/tv';

  rp(`${URL}/popular?api_key=${API_KEY}&language=en-US&page=${1}`)
    .then((response) => {
      const result = JSON.parse(response);
      result.results.forEach(element => {
        ids.push(element.id)
      });
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
          .then( async (en) => {
            const _en = JSON.parse(en);
            const poster = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${_en.poster_path}`; 
            newProgram.en_overview = _en.overview;
            newProgram.en_title = _en.name;
            newProgram.en_poster_url = poster;
            newProgram.genres = _en.genres.map((e) => e.name.toLowerCase());
            newProgram.genres.forEach(e => genres.add(e));
            const program_data = await ProgramService.addProgram(newProgram)
            const programUid = program_data.id;
            for (let s = 1; s < _data.number_of_seasons + 1; s++) {
              rp(`${URL}/${id}/season/${s}?api_key=${API_KEY}&lenguage=en`)
                .then(season => {
                  const _season = JSON.parse(season);
                  const poster = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${_season.poster_path}`; 
                  const newSeason = {
                    season_number: s,
                    en_program_title: newProgram.en_title,
                    es_program_title: newProgram.es_title,
                    en_poster_url: poster,
                    episodes: [],
                  }
                  rp(`${URL}/${id}/season/${s}?api_key=${API_KEY}&lenguage=es`)
                    .then(season2 => {
                      const _season2 = JSON.parse(season2);
                      const poster = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${_season2.poster_path}`; 
                      newSeason.es_poster_url = poster;
                      ProgramService.addSeason(newSeason, programUid);
                    });
                });
            }
            const ls = Array.from(genres);
            GenreService.addGenres(ls, 'programs');
            cargarCarpitulos(id, _data, programUid);   
          })
        })
      })
    } 
  )
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
          const poster = `https://image.tmdb.org/t/p/w400/${_episode.profile_path}`;
          const newEpisode = {
            es_episode_title : _episode.name,
            es_overview : _episode.overview,
            season_number : _episode.season_number,
            episode_number : e,
            profile_path: poster,
          }
          rp(`${URL}/${id}/season/${index}/episode/${e}?api_key=${API_KEY}&language=en`)
          .then((en2) => {
            const _en2 = JSON.parse(en2);
            newEpisode.en_episode_title = _en2.name;
            newEpisode.en_overview = _en2.overview
            ProgramService.addEpisode(newEpisode, programUid);
          })
        })
    }
 }
}

module.exports = router;
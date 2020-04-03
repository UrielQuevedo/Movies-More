const admin = require("firebase-admin");
const db = admin.firestore();
const programsRef = db.collection('programs');

const addProgram = (program) => {
  return programsRef.add(program);
}

const addSeason = async (season, programUid) => {
  const program_doc = await programsRef.doc(programUid).get();
  const program = program_doc.data();
  programsRef.doc(programUid)
    .collection('seasons')
    .doc(`${season.season_number}`)
    .set({...season, en_program_title: program.en_title, es_program_title: program.es_title});
  }

const addEpisode = (episode, programUid) => {
  const little_episode_inf = {
    season_number: episode.season_number,
    episode_number: episode.episode_number,
    upload_date: new Date(),
    reference: db.doc(`/programs/${programUid}/seasons/${episode.season_number}`)
  };
  //agrego para tener referencia a una collecion episodes
  db.collection('episodes').add(little_episode_inf);
  //agrego el episode a su programa y temporada correspondiente
  programsRef.doc(programUid)
    .collection('seasons')
    .doc(`${episode.season_number}`)
    .update(
      {
        episodes: admin.firestore.FieldValue.arrayUnion(episode)
      }
    );
}

const getProgram = async (programUid) => {
  const program_doc = await programsRef.doc(programUid).get();
  return program_doc.data();
}

const getSeason = async (programUid, season_number) => {
  const program_doc = await programsRef.doc(programUid).collection('seasons').doc(season_number).get();
  return program_doc.data();
}

const getEpisode = async (programUid, season_number, episode_number) => {
  const season_doc = await programsRef.doc(programUid)
    .collection('seasons')
    .doc(season_number)
    .get()
  return season_doc.data().episodes.find((episode) => episode.episode_number === episode_number);
}

const getLatestEpisodes = async (lastItem, limit) => {
  const promises = [];
  const snap = await db.collection('episodes')
    .orderBy('upload_date', 'desc')
    .limit(limit)
    .offset(lastItem)
    .get();
  
  snap.forEach((doc) => {
    const little_episode_inf = doc.data();
    const episode_number = parseInt(little_episode_inf.episode_number);
    promises.push(little_episode_inf.reference.get().then((season_doc) => {
      const season = season_doc.data();
      return { 
        ...season.episodes[episode_number], 
        en_poster_url: season.en_poster_url,
        es_poster_url: season.es_poster_url,
        en_title: season.en_program_title,
        es_title: season.es_program_title 
      }
    }));
  })

  return Promise.all(promises)
    .then((promise) => promise.map(episode => episode));
}

module.exports = {
  addSeason,
  addProgram,
  getProgram,
  getSeason,
  getEpisode,
  getLatestEpisodes,
  addEpisode,
};
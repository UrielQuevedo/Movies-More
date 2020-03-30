const admin = require("firebase-admin");
const db = admin.firestore();
const programsRef = db.collection('programs');

const addProgram = (program) => {
  return programsRef.add(program);
}

const addSeason = (season, programUid) => {
  programsRef.doc(programUid)
    .collection('seasons')
    .doc(`${season.season_number}`)
    .set(season);
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
  return JSON.parse(JSON.stringify(program_doc.data()));
}

const getSeason = async (programUid, season_number) => {
  const program_doc = await programsRef.doc(programUid).get();
  return program_doc.data().seasons[season_number];
}

const getEpisode = async (programUid, season_number, episode_number) => {
  const program_doc = await programsRef.doc(programUid).get();
  return program_doc.data().seasons[season_number].episodes[episode_number];
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
    promises.push(little_episode_inf.reference.get().then(episode_doc => episode_doc.data().episodes[episode_number]));
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
const admin = require("firebase-admin");
const db = admin.firestore();
const collection = db.collection('programs');

const addProgram = (program) => {
  collection.add(program);
}

const getProgram = (uid) => {
  return collection.doc(uid)
    .get()
    .then(doc => JSON.parse(JSON.stringify(doc.data())));
}

const getSeason = (uid, season_number) => {
  return collection.doc(uid)
    .then((doc) => {
      const program = JSON.parse(JSON.stringify(doc.data()));
      return program.seasons[season_number];
    })
}

const getEpisode = (uid, season_number, episode_number) => {
  return collection.doc(uid)
    .then((doc) => {
      const program = JSON.parse(JSON.stringify(doc.data()));
      return program.seasons[season_number].episodes[episode_number];
    })
}

const getLatestEpisodes = (lastItem, limit) => {
  return db.collection('episodes')
    .orderBy('date', 'asc')
    .limit(limit)
    .offset(lastItem)
    .get()
    .then((snap) => {
      const episodes = []
      snap.forEach((doc) => {
        const little_episode_inf = doc.data();
        const season_number = little_episode_inf.season_number;
        const episode_number = little_episode_inf.episode_number;
        little_episode_inf.reference.get()
          .then((program_doc) => {
            const episode = program_doc.data().seasons[season_number].episodes[episode_number];
            episodes.push(episode);
          })
      })
      return episodes;
    })
}

module.exports = {
  addProgram,
  getProgram,
  getSeason,
  getEpisode,
  getLatestEpisodes,
};
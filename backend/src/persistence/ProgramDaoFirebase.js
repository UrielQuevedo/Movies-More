const admin = require("firebase-admin");
const db = admin.firestore();

const addProgram = (program) => {
  db.collection('programs').add(program);
}

const test = () => {
  db.collection('test1').doc('3').get()
    .then(d => d.data().referen.get().then(p => console.log(p.data())))
}

module.exports = {
  addProgram,
  test,
};
import { client, ObjectId } from "../index.js";

export async function updatingquerydetails(id, assigedhelpername, value) {
  return await client
    .db("ticket-system")
    .collection("query-from-user")
    .updateOne({ _id: ObjectId(id) }, {
      $set: {
        assigedhelpername: assigedhelpername,
        team: value.team, status: value.status
      }
    });
}
export async function getingquerydetails(id) {
  return await client
    .db("ticket-system")
    .collection("query-from-user")
    .findOne({ _id: ObjectId(id) });
}
export async function sendingquerytohelpers() {
  return await client
    .db("ticket-system")
    .collection("query-from-user")
    .find()
    .toArray();
}
export async function gethelperprofiles(name) {
  return await client
    .db("ticket-system")
    .collection("helper-signup-signin")
    .findOne({ helpername: name });
}
export async function helperprofiles(name, profile) {
  return await client
    .db("ticket-system")
    .collection("helper-signup-signin")
    .updateOne({ helpername: name }, { $set: { profileimage: profile } });
}
export async function helperlogouts(name) {
  return await client
    .db('ticket-system')
    .collection('helper-token')
    .deleteOne({ helpername: name });
}
export async function helpertokens(helpername) {
  return await client
    .db('ticket-system')
    .collection('helper-token')
    .findOne({ helpername: helpername });
}

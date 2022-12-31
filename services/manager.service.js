import { client, ObjectId } from "../index.js";

export async function postingcommands(request) {
  return await client
    .db("ticket-system")
    .collection("command")
    .insertOne(request.body);
}
export async function getingmanagerdetails(name) {
  return await client
    .db("ticket-system")
    .collection("manager-signup-signin")
    .findOne({ managername: name });
}
export async function getingquerydetailstomanager(id) {
  return await client
    .db("ticket-system")
    .collection("query-from-user")
    .findOne({ _id: ObjectId(id) });
}
export async function getingquerystomanager() {
  return await client
    .db("ticket-system")
    .collection("query-from-user")
    .find()
    .toArray();
}
export async function updatingquerydetails(id, status, emailcontent, completedmanagername) {
  return await client
    .db("ticket-system")
    .collection("query-from-user")
    .updateOne({ _id: ObjectId(id) }, {
      $set: {
        status: status, emailcontent: emailcontent,
        completedmanagername: completedmanagername
      }
    });
}
export async function managerprofiles(name) {
  return await client
    .db("ticket-system")
    .collection("manager-signup-signin")
    .findOne({ managername: name });
}
export async function managerprofile(name, profile) {
  return await client
    .db("ticket-system")
    .collection("manager-signup-signin")
    .updateOne({ managername: name }, { $set: { profileimage: profile } });
}
export async function managerlogouts(name) {
  return await client
    .db('ticket-system')
    .collection('manager-token')
    .deleteOne({ managername: name });
}
export async function managertokens(managername) {
  return await client
    .db('ticket-system')
    .collection('manager-token')
    .findOne({ managername: managername });
}

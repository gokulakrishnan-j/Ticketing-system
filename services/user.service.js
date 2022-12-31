import { client, ObjectId } from "../index.js";

export async function getingquerydetails(id) {
    return await client
        .db("ticket-system")
        .collection("query-from-user")
        .findOne({ _id: ObjectId(id) });
}
export async function postingquerys(request) {
    return await client
        .db("ticket-system")
        .collection("query-from-user")
        .insertOne(request.body);
}
export async function getingquerys() {
    return await client
        .db("ticket-system")
        .collection("query-from-user")
        .find()
        .toArray();
}
export async function getuserprofile(name) {
    return await client
        .db("ticket-system")
        .collection("user-signup-signin")
        .findOne({ email: name });
}
export async function userprofile(name, profile) {
    return await client
        .db("ticket-system")
        .collection("user-signup-signin")
        .updateOne({ email: name }, { $set: { profileimage: profile } });
}
export async function userlogout(name) {
    return await client
        .db('ticket-system')
        .collection('user-token')
        .deleteOne({ username: name });
}
export async function usertoken(username) {
    return await client
        .db('ticket-system')
        .collection('user-token')
        .findOne({ username: username });
}
export async function creatingusers(userDetails) {
    return await client
        .db("ticket-system")
        .collection("user-signup-signin")
        .insertOne(userDetails);
}
export async function getinguserfromdb(username) {
    return await client
        .db("ticket-system")
        .collection("user-signup-signin")
        .findOne({ email: username });
}
export async function changePassword(data) {
    return await client
      .db("ticket-system")
      .collection("user-signup-signin")
      .updateOne({ email: data.email }, { $set: { password: data.password } });
  }
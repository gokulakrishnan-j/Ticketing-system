import { client } from "../index.js";

export async function getingqueryofuser() {
  return await client
    .db("ticket-system")
    .collection("user-signup-signin")
    .find()
    .toArray();
}
export async function getingquerysofmanager() {
  return await client
    .db("ticket-system")
    .collection("manager-signup-signin")
    .find()
    .toArray();
}
export async function getingquerys() {
  return await client
    .db("ticket-system")
    .collection("helper-signup-signin")
    .find()
    .toArray();
}
export async function getingquery() {
  return await client
    .db("ticket-system")
    .collection("query-from-user")
    .find()
    .toArray();
}
export async function getingmanagertoadmin() {
  return await client
    .db("ticket-system")
    .collection("manager-signup-signin")
    .find()
    .toArray();
}
export async function getinghelpertoadmin() {
  return await client
    .db("ticket-system")
    .collection("helper-signup-signin")
    .find()
    .toArray();
}
export async function adminprofile(name) {
  return await client
    .db("ticket-system")
    .collection("admin-signup-signin")
    .findOne({ adminname: name });
}
export async function adminprofiles(name, profile) {
  return await client
    .db("ticket-system")
    .collection("admin-signup-signin")
    .updateOne({ adminname: name }, { $set: { profileimage: profile } });
}
export async function adminlogout(name) {
  return await client
    .db('ticket-system')
    .collection('admin-token')
    .deleteOne({ adminname: name });
}
export async function admintokens(adminname) {
  return await client
    .db('ticket-system')
    .collection('admin-token')
    .findOne({ adminname: adminname });
}
export async function creatingmanagers(managerDetails) {
  return await client
    .db("ticket-system")
    .collection("manager-signup-signin")
    .insertOne(managerDetails);
}
export async function adminfromdb(adminname) {
  return await client
    .db("ticket-system")
    .collection("admin-signup-signin")
    .findOne({ adminname: adminname });
}
export async function creatingadmin(adminDetails) {
  return await client
    .db("ticket-system")
    .collection("admin-signup-signin")
    .insertOne(adminDetails);
}
export async function storeadmintokens(token, getAdminFromDB) {
  return await client
    .db("ticket-system")
    .collection("admin-token")
    .insertOne({
      admintoken: token,
      adminname: getAdminFromDB.adminname
    });
}
export async function getinghelperfromdbs(helpername) {
  return await client
    .db("ticket-system")
    .collection("helper-signup-signin")
    .findOne({ helpername: helpername });
}
export async function getingmanagerfromdb(managername) {
  return await client
    .db("ticket-system")
    .collection("manager-signup-signin")
    .findOne({ managername: managername });
}
export async function createhelpers(helperDetails) {
  return await client
    .db("ticket-system")
    .collection("helper-signup-signin")
    .insertOne(helperDetails);
}
export async function changePassword(data) {
  return await client
    .db("ticket-system")
    .collection("admin-signup-signin")
    .updateOne({ adminname: data.adminname }, { $set: { password: data.password } });
}
export async function changemanage(managername, newname, newgender) {
  return await client
    .db("ticket-system")
    .collection("manager-signup-signin")
    .updateOne({ managername: managername }, { $set: { name: newname, gender: newgender } });
}
export async function changehelpername(helpername, newname, newgender) {
  return await client
    .db("ticket-system")
    .collection("helper-signup-signin")
    .updateOne({ helpername: helpername }, { $set: { name: newname, gender: newgender } });
}
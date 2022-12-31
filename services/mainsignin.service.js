import { client } from '../index.js';

export async function storeusertoken(token, getUserFromDB, role) {
  return await client
    .db("ticket-system")
    .collection("user-token")
    .insertOne({
      usertoken: token,
      username: getUserFromDB.email,
      role: role
    });
}
export async function storehelpertoken(token, getHelperFromDB, role) {
  return await client
    .db("ticket-system")
    .collection("helper-token")
    .insertOne({
      helpertoken: token,
      helpername: getHelperFromDB.helpername,
      role: role
    });
}
export function storemanagertoken(token, getManagerFromDB, role) {
  return client
    .db("ticket-system")
    .collection("manager-token")
    .insertOne({
      managertoken: token,
      managername: getManagerFromDB.managername,
      role: role
    });
}
export async function userfromdb(username) {
  return await client
    .db("ticket-system")
    .collection("user-signup-signin")
    .findOne({ email: username });
}
export async function helperfromdb(helpername) {
  return await client
    .db("ticket-system")
    .collection("helper-signup-signin")
    .findOne({ helpername: helpername });
}
export async function managerfromdb(managername) {
  return await client
    .db("ticket-system")
    .collection("manager-signup-signin")
    .findOne({ managername: managername });
}

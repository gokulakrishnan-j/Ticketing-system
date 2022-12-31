import { client } from '../index.js';

export async function getingcommand(id) {
    return await client
        .db("ticket-system")
        .collection("command")
        .find({ ticketNo: id })
        .toArray();
}

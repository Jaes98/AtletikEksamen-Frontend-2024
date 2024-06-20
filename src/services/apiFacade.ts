import { Participant } from "../Interfaces";

const API_URL = "http://localhost:8080";


async function getParticipants(): Promise<Array<Participant>> {
  return fetch(API_URL + "/participants").then(handleHttpErrors);
}

async function createParticipant(participant: Participant) {
  const options = makeOptions("POST", participant);
  return fetch(API_URL + "/participants", options).then(handleHttpErrors);
}

async function deleteParticipant(id: number) {
  const options = makeOptions("DELETE", null);
  const response = await fetch(API_URL + "/participants/" + id, options);
  return response.status;
}

async function updateParticipant(id: number, participant: Participant) {
  const options = makeOptions("PUT", participant);
  return fetch(`${API_URL}/participants/${id}`, options).then(handleHttpErrors);
}

async function getParticipantById(id: number): Promise<Participant> {
    return fetch(API_URL + "/participants/" + id).then(handleHttpErrors);
    }

function makeOptions(method: string, body: object | null): RequestInit {
  const opts: RequestInit = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

async function handleHttpErrors(res: Response) {
  if (!res.ok) {
    const fullError = await res.json();
    throw { status: res.status, fullError };
  }
  if (res.status === 204) {
    return {};
  }

  return res.json();
}

export { getParticipants, createParticipant, deleteParticipant, updateParticipant, getParticipantById };

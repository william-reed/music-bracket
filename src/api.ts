import {SongAndId} from "./models/models";
import {BracketId, ApiBracket} from "./models/api-models";

const HOST = "http://127.0.0.1:8080";

// noinspection TypeScriptUnresolvedVariable
function process<T>(fetch: Promise<Response>) {
  return fetch.then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return ((response.json() as any) as T)
  })
}

// noinspection TypeScriptUnresolvedVariable
export async function videoSearch(query: string): Promise<SongAndId[]> {
  return process(fetch(HOST + `/search?query=${query}`));
}

// noinspection TypeScriptUnresolvedVariable
export async function getBracket(id: string): Promise<ApiBracket> {
  return process(fetch(HOST + `/bracket?id=${id}`))
}

// noinspection TypeScriptUnresolvedVariable
export async function saveBracket(bracket: ApiBracket): Promise<BracketId> {
  return process(fetch(HOST + `/bracket`, {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bracket)
  }))
}

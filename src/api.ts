import {ApiBracket, SongAndId} from "./models/models";

const HOST = "http://127.0.0.1:8080";

// generic fetch and assert to type
// noinspection TypeScriptUnresolvedVariable
function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return ((response.json() as any) as T)
    })

}

function sleep(ms: number) {
  // @ts-ignore
  return new Promise(resolve => setTimeout(resolve, ms));
}

// TODO: just a mock for now
// noinspection TypeScriptUnresolvedVariable
export async function videoSearch(query: string): Promise<SongAndId[]> {
  await sleep(200);
  return [
    {
      title: "title 0",
      youtubeId: "PsO6ZnUZI0g"
    },
    {
      title: "title 1",
      youtubeId: "HmAsUQEFYGI"
    },
    {
      title: "title 2",
      youtubeId: "RM7lw0Ovzq0"
    },
    {
      title: "title 3",
      youtubeId: "gG_dA32oH44"
    },
  ];
}

// TODO: just a mock for now
// noinspection TypeScriptUnresolvedVariable
export async function getBracket(id: string): Promise<ApiBracket> {
  await sleep(200);

  return {
    title: "",
    songs: [
      {title: "Runaway", youtubeId: "Jg5wkZ-dJXA"},
      {title: "School Spirit", youtubeId: "-MOIPnu50O4"},
      {title: "Earfquake", youtubeId: "HmAsUQEFYGI"},
      {title: "After the Storm", youtubeId: "9f5zD7ZSNpQ"},
      {title: "What would Meek do?", youtubeId: "hGhC473BCIM"},
      {title: "Cash Machine", youtubeId: "9rx0eqQl8wk"},
      {title: "Pink + White", youtubeId: "uzS3WG6__G4"},
      {title: "Ms. Jackson", youtubeId: "MYxAiK6VnXw"},
    ],
  }
}

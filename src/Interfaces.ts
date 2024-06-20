interface Participant {
  id?: number;
  name: string;
  gender: string;
  age: number;
  club: string;
  results: Array<Results>;
  disciplines: Array<Discipline>;
}

interface Results {
    id?: number;
    resultType: string;
    date: string;
    resultValue: number;
    discipline: string[];
    participant: Participant;
}

interface Discipline {
    id: number;
    name: string;
    resultType: string;
}

export const defaultParticipant = {
  id: 0,
  name: "",
  age: 0,
  gender: "",
  club: "",
  results: [],
  disciplines: []
} as Participant;

export type { Participant, Results, Discipline};
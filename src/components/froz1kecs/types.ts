export type User = 'moondar1nka' | 'CuLflame';

export interface UserData {
  nick: string;
  privilege: string;
  role: string;
  password: string;
}

export interface Task {
  id: string;
  title: string;
  tag: string;
  completed: boolean;
  exclusive?: boolean;
}

export const userData: Record<User, UserData> = {
  moondar1nka: {
    nick: 'moondar1nka',
    privilege: 'Stinger (∞)',
    role: 'Admin',
    password: 'ArtPlay2SO',
  },
  CuLflame: {
    nick: 'CuLflame',
    privilege: 'Dragon',
    role: 'Player',
    password: 'KLIP223D',
  },
};

export const initialTasks: Task[] = [
  { id: '1', title: 'Заработать 10кк', tag: 'moondar1nka', completed: false },
  { id: '2', title: 'Построить ферму', tag: 'moondar1nka', completed: false },
  { id: '3', title: 'Собрать сет', tag: 'moondar1nka', completed: false },
  { id: '4', title: 'Заработать 100кк', tag: 'moondar1nka', completed: false, exclusive: true },
];

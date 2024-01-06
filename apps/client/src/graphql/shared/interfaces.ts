import { Enum, statuses } from "@/components/navigation/Enum";

export interface TaskStats {
  status: Enum<typeof statuses>;
  count: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  user: string;
  projects: Omit<Project, "tasks">[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  clients: Client[];
  projects: Omit<Project, "tasks">[];
}

export interface UserStats {
  projectCount: number;
  clientCount: number;
  taskCount: TaskStats[];
  totalTaskCount: number;
}

export interface QueryById {
  id: string | undefined;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  autoProgress: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  autoProgress: boolean;
  client: Omit<Client, "projects">;
  Tasks: Task[];
}
export interface Input<T> {
  input: T;
}

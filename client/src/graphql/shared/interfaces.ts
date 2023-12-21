export interface TaskStats {
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
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
  photo: string;
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

export interface QueryByUserId {
  id: string;
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

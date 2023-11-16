import { faker } from "@faker-js/faker/locale/en_US";

interface Project {
  clientId: string;
  name: string;
  description: string;
  status: string;
  percentage?: number;
}

interface Client {
  name: string;
  email: string;
  phone: string;
  projects?: Project[];
}

const projects = [
  {
    clientId: "1",
    name: "eCommerce Website",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
    status: "In Progress",
  },
  {
    id: "2",
    clientId: "2",
    name: "Dating App",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
    status: "In Progress",
  },
  {
    id: "3",
    clientId: "3",
    name: "SEO Project",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
    status: "In Progress",
  },
  {
    id: "4",
    clientId: "4",
    name: "Design Prototype",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
    status: "Done",
  },
  {
    id: "5",
    clientId: "5",
    name: "Auction Website",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
    status: "In Progress",
  },
];

// Clients
const clients = [
  {
    name: "Tony Stark",
    email: "ironman@gmail.com",
    phone: "343-567-4333",
  },
  {
    name: "Natasha Romanova",
    email: "blackwidow@gmail.com",
    phone: "223-567-3322",
  },
  {
    name: "Thor Odinson",
    email: "thor@gmail.com",
    phone: "324-331-4333",
  },
  {
    name: "Steve Rogers",
    email: "steve@gmail.com",
    phone: "344-562-6787",
  },
  {
    name: "Bruce Banner",
    email: "bruce@gmail.com",
    phone: "321-468-8887",
  },
];

export { clients, projects };

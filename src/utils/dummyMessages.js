const person1 =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww";
const person2 =
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D";
const person3 =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D";

export const dummyMessages = [
  {
    id: "0kjr489",
    name: "John Snow",
    category: "garage",
    timeline: "2 hrs ago",
    image: person1,
    message: "This is an awesome message, I love it and concur.",
  },
  {
    id: "0kjr484w",
    name: "Bismark Biyombo",
    category: "users",
    timeline: "1 hr ago",
    image: person2,
    message: "This is an awesome message, I love it and concur.",
  },
  {
    id: "0kjr483r9",
    name: "Snow White",
    category: "complaints",
    timeline: "5 hrs ago",
    image: person3,
    message: "This is an awesome message, I love it and concur.",
  },
];

export const isMultiple = value => (value === 0 || value > 1 ? "s" : "");

export const assignValue = value =>
  value > 999999 ? "M" : value > 999 ? "K" : "";

export const simpleForm = value =>
  value > 999999 ? value / 1000000 : value > 999 ? value / 1000 : value;

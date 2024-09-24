class UserData {
  id: number;
  name: string;
  books: {
    past: { name: string; userScore: number }[];
    present: { name: string }[];
  };
}

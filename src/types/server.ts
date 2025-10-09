export type ServerResponse = {
  status: "success" | "failed";
  message: string;
  // eslint-disable-next-line
  payload?: any;
};

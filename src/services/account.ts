import { AccountForm } from "../types/account";

export const createAccount = async (data: AccountForm) => {
  return await fetch("http://localhost:3000/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

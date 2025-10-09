export type Credential = {
  id: string;
  user_id: string;
  domain: string;
  email: string;
  password: string;
  inserted_at: Date;
  updated_at: Date;
};

export type CreateCredential = Omit<
  Credential,
  "id" | "inserted_at" | "updated_at"
>;

export type CredentialErrors = Partial<
  Pick<Credential, "domain" | "email" | "password">
>;

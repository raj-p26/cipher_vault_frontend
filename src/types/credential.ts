export type Credential = {
  id: string;
  user_id: string;
  cred_type: string;
  cred_value: string;
  comment?: string;
  password: string;
  inserted_at: Date;
  updated_at: Date;
  pinned?: 0 | 1;
};

export type CreateCredential = Omit<
  Credential,
  "id" | "inserted_at" | "updated_at"
>;

export type CredentialErrors = Partial<
  Pick<Credential, "cred_type" | "password">
>;

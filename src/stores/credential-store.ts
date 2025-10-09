import { create } from "zustand";
import type { Credential } from "../types/credential";

interface CredentialActions {
  addCredential(credential: Credential): void;
  removeCredential(credential: Credential): void;
  setCredentials(credentials: Credential[]): void;
  updateCredential(credential: Credential): void;
}

type CredentialStoreState = {
  credentials: Credential[];
  actions: CredentialActions;
};

const credentialStore = create<CredentialStoreState>()((set) => ({
  credentials: [],
  actions: {
    addCredential: (c) => set((s) => ({ credentials: [...s.credentials, c] })),
    removeCredential: (c) =>
      set((s) => {
        const credentials = s.credentials.filter((c1) => c1.id !== c.id);

        return { credentials };
      }),
    setCredentials: (c) => set({ credentials: c }),
    updateCredential: (cred) => {
      set((s) => {
        const updatedCredentials: Credential[] = s.credentials.map((c) => {
          if (c.id === cred.id) return { ...cred };
          return { ...c };
        });

        return { credentials: updatedCredentials };
      });
    },
  },
}));

const useCredentials = () => credentialStore((s) => s.credentials);
const useCredentialActions = () => credentialStore((s) => s.actions);

export { useCredentials, useCredentialActions };

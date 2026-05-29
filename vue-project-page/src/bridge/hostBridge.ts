export type HostStore = {
    getState: () => any;
    dispatch: (action: any) => void;
};

let hostStore: HostStore | null = null;

export const HostBridge = {
    setStore(store: HostStore) {
        hostStore = store;
    },

    getStore() {
        return hostStore;
    },

    getToken(): string | null {
        return hostStore?.getState()?.token ?? null;
    },

    getEmail(): any {
        return hostStore?.getState()?.email ?? null;
    },

    getRole(): any {
        return hostStore?.getState()?.role ?? null;
    }
};
import { makeObservable, observable, action, computed } from "mobx";
import { createContext } from "react";

interface US {
  url: Array<string>;
  frameLoading: boolean;
  get currentPage(): string;
  setUrl: (path: string) => void;
  setLoading: (loading: boolean) => void;
}

const urlStoreTarget: US = {
  url: [""],
  frameLoading: false,
  get currentPage() {
    return this.url.join("/");
  },
  setUrl(path) {
    this.url = [...path.split("/")];
  },
  setLoading(loading) {
    this.frameLoading = loading;
  },
};

const urlStore = makeObservable(urlStoreTarget, {
  frameLoading: observable,
  url: observable,
  currentPage: computed,
  setUrl: action,
  setLoading: action,
});

export const frameLocationStoreContext = createContext(urlStore);

import create from "zustand";
import { devtools, persist, combine } from "zustand/middleware";

const initialState = {
  bookmarks: [],
  categories: [],
  tags: [],
  categoryFilter: "",
  tagFilter: "",
  searchText: "",
  editBookmark: {},
  settings: {
    locale: "en-US",
  },
};

const useStore = create(
  persist(
    devtools(
      (set) => ({
        ...initialState,
        setBookmarks: (bookmarks) => {
          set({ bookmarks });
        },
        setCategories: (categories) => {
          set({ categories });
        },
        setTags: (tags) => {
          set({ tags });
        },
        addBookmark: (bookmark) => {
          set((state) => ({
            bookmarks: [...state.bookmarks, bookmark],
          }));
        },
        updateBookmark: (id, updates) => {
          set((state) => {
            const bookmarkIndex = state.bookmarks.findIndex(
              (bookmark) => bookmark.id === id
            );
            if (bookmarkIndex === -1) return state;
            const updatedBookmarks = [...state.bookmarks];
            updatedBookmarks[bookmarkIndex] = {
              ...updatedBookmarks[bookmarkIndex],
              ...updates,
            };
            return {
              bookmarks: updatedBookmarks,
            };
          });
        },
        deleteBookmark: (id) => {
          set((state) => ({
            bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
          }));
        },
        setCategoryFilter: (filter) => {
          set({ categoryFilter: filter });
        },
        setTagFilter: (filter) => {
          set({ tagFilter: filter });
        },
        setSearchText: (text) => {
          set({ searchText: text });
        },
        setEditBookmark: (bookmark) => {
          set({ editBookmark: bookmark });
        },
        setSettings: (settings) => {
          set((state) => ({ settings: { ...state.settings, ...settings } }));
        },
      }),
      "bookmarkStore"
    ),
    {
      name: "bookmarkStore", // unique name
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

export default useStore;

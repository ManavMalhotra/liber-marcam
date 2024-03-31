import create from "zustand";

interface Bookmark {
  id: string;
  url: string;
  title: string;
  description: string;
  category?: string[];
  tags?: string[];
  timeStamps: string;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (bookmarkId: number) => void;
  updateBookmark: (
    bookmarkId: number,
    updatedFields: Partial<Bookmark>
  ) => void;
}



const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],

  addBookmark: (bookmark) =>
    set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),

  removeBookmark: (bookmarkId) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== bookmarkId),
    })),

  updateBookmark: (bookmarkId, updatedFields) =>
    set((state) => ({
      bookmarks: state.bookmarks.map((b) =>
        b.id === bookmarkId ? { ...b, ...updatedFields } : b
      ),
    })),
}));

export default useBookmarkStore;

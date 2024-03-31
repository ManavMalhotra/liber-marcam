"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useStore from "@/bookmarkStore";
import useBookmarkStore from "@/bookmarkStore";
import useUserStore from "@/userStore";

export default function BookmarkTableLayout() {
  const { bookmarks, addBookmark, removeBookmark, updateBookmark } =
    useBookmarkStore();
  // console.log(bookmarks);

  const { user } = useUserStore();

  // const onSubmit = () => {
  //   addBookmark({
  //     id: 1,
  //     title: "Sample Title",
  //     url: "Sample Url",
  //     category: ["Sample Category"],
  //     tags: ["Sample Tag1", "Sample Tag11", "Sample Tag111"],
  //     dateAdded: "Sample Date Added",
  //   });
  // };

  // const bookmarks = [
  //   {
  //     id: 1,
  //     title: "Sample Title",
  //     url: "Sample Url",
  //     description: "Sample Description",
  //     category: "Sample Category",
  //     tags: ["Sample Tag"],
  //     dateAdded: "Sample Date Added",
  //   },
  // ];

  async function handleRemoveBookmark(bookmarkId: number) {
    console.log("Bookmark ID: ", bookmarkId);
    try {
      const response = await fetch(
        `https://liber-marcam-backend.onrender.com/api/bookmarks/${bookmarkId}`,
        {
          method: "DELETE",
          headers: {
            // @ts-ignore
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming your server responds with the deleted bookmark's id
      const deletedBookmarkId = await response.json();

      // Remove the deleted bookmark from your local state
      // setBookmarks(
      //   bookmarks.filter((bookmark) => bookmark.id !== deletedBookmarkId)
      // );
    } catch (error) {
      console.error("There was an error!", error);
    }
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">Title</TableHead>
            <TableHead className="w-[20%]">Url</TableHead>
            <TableHead className="w-[20%]">Description</TableHead>
            <TableHead className="w-[20%]">Category</TableHead>
            <TableHead className="w-[20%]">Tags</TableHead>
            <TableHead className="w-[20%]">Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookmarks.map((bookmark) => (
            <TableRow key={bookmark._id}>
              <TableCell className="font-medium">{bookmark.title}</TableCell>
              <TableCell>{bookmark.url}</TableCell>
              <TableCell className="">{bookmark.description}</TableCell>
              <TableCell className="">{bookmark.category}</TableCell>
              <TableCell
                className="flex gap-4 flex-wrap
        w-[250px] overflow-hidden overflow-ellipsis"
              >
                {bookmark.tags
                  ? bookmark.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-600 text-white px-2 py-1 rounded-3xl"
                      >
                        {tag}
                      </span>
                    ))
                  : ""}
              </TableCell>

              <TableCell className="">
                {new Date(bookmark.timeStamps).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleRemoveBookmark(bookmark._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <button
        onClick={onSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button> */}
    </>
  );
}

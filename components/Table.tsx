import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BookmarkTableLayout() {
  const bookmarks = [
    {
      id: 1,
      title: "Sample Title",
      url: "Sample Url",
      description: "Sample Description",
      category: "Sample Category",
      tags: ["Sample Tag"],
      dateAdded: "Sample Date Added",
    },
  ];

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
        {/* <TableRow>
          <TableCell className="font-medium">Sample Title</TableCell>
          <TableCell>Sample Url</TableCell>
          <TableCell>Sample Description</TableCell>
          <TableCell className="">Sample Category</TableCell>
          <TableCell
            className="flex gap-4 flex-wrap
          w-[250px] overflow-hidden overflow-ellipsis"
          >
            <span className="bg-slate-600 text-white px-2 py-1 rounded-3xl">
              Sample Tag
            </span>
            <span className="bg-slate-600 text-white px-2 py-1 rounded-3xl">
              Sample Tag
            </span>
            <span className="bg-slate-600 text-white px-2 py-1 rounded-3xl">
              Sample Tag
            </span>
            <span className="bg-slate-600 text-white px-2 py-1 rounded-3xl">
              Sample Tag
            </span>
          </TableCell>
          <TableCell className="">Sample Date Added</TableCell>
        </TableRow> */}

        {bookmarks.map((bookmark) => (
          <TableRow key={bookmark.id}>
            <TableCell className="font-medium">{bookmark.title}</TableCell>
            <TableCell>{bookmark.url}</TableCell>
            <TableCell>{bookmark.description}</TableCell>
            <TableCell className="">{bookmark.category}</TableCell>
            <TableCell
              className="flex gap-4 flex-wrap
          w-[250px] overflow-hidden overflow-ellipsis"
            >
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-600 text-white px-2 py-1 rounded-3xl"
                >
                  {tag}
                </span>
              ))}
            </TableCell>
            <TableCell className="">{bookmark.dateAdded}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

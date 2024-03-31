"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import { FaPlus } from "react-icons/fa";

import useUserStore from "@/userStore";
import useBookmarksStore from "@/bookmarkStore";
import { randomUUID } from "crypto";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  category: string[];
  dateAdded: string;
}

export default function Page() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { bookmarks, addBookmark } = useBookmarksStore();

  const [loading, setLoading] = useState(true);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  const toggleQuickAddVisible = () => {
    setShowQuickAdd(!showQuickAdd);
  };

  useEffect(() => {
    // Check if user is logged in
    if (user == null || !user) {
      router.push("/login");
    } else {
      setLoading(false);
      // fetch bookmarks
      const fetchBookmarks = async () => {
        const res = await fetch(
          "https://liber-marcam-backend.onrender.com/api/bookmarks",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await res.json();
        console.log("Bookmarks:");
        console.log(data);

        // set bookmarks
        data.forEach((bookmark: Bookmark) => {
          addBookmark(bookmark);
        });
      };

      console.log(user.token);
      fetchBookmarks();
    }
  }, []);

  const handleAddBookmark = () => {
    const data = {
      title,
      url,
      description,
      tags: tags.split(","),
      category: category.split(","),
    };
    console.log(data);
    // add bookmark
    const sendBookmark = async () => {
      fetch("https://liber-marcam-backend.onrender.com/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Bookmark added");
          console.log(data);
          addBookmark(data);
          toggleQuickAddVisible();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    sendBookmark();
  };
  return loading ? (
    <div>
      <h1>Loading </h1>
    </div>
  ) : (
    <main className="flex">
      <div className="flex-[2] bg-black w-full h-screen">
        <Navbar />
      </div>
      <div className="flex-[8] w-full h-screen bg-gray-400">
        <Table />
      </div>
      {/* floating action button  */}
      <div
        className="fixed bottom-5 right-5 bg-blue-500 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer"
        onClick={toggleQuickAddVisible}
      >
        <FaPlus className="text-white" />
      </div>
      {/* quick add container  */}
      {showQuickAdd && (
        <div
          className="fixed bottom-12 right-12 bg-white w-96 h-auto rounded-tl-3xl flex flex-col p-4 gap-8 
        transition-all duration-300 ease-in-out shadow-lg border border-gray-300
        "
        >
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Quick Add</h1>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tags"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setTags(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="flex justify-center" onClick={handleAddBookmark}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

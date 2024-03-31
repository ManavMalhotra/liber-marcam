"use client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdArrowForwardIos, MdClose, MdSave } from "react-icons/md";
import useBookmarkStore from "@/bookmarkStore";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";

export default function Navbar() {
  const [isTagsVisible, setIsTagsVisible] = useState(false);
  const [isInputTagVisible, setIsInputTagVisible] = useState(false);

  const [cuurentTag, setCurrentTag] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [isInputCategoryVisible, setIsInputCategoryVisible] = useState(false);

  const { bookmarks, addBookmark, removeBookmark, updateBookmark } =
    useBookmarkStore();
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    bookmarks.map((bookmark) => {
      if (bookmark.tags) {
        bookmark.tags.map((tag) => {
          if (!tags.includes(tag)) {
            setTags((prevTags) => [...prevTags, tag]);
          }
        });
      }

      if (bookmark.category) {
        bookmark.category.map((category) => {
          if (!categories.includes(category)) {
            setCategories((prevCategories) => [...prevCategories, category]);
          }
        });
      }
    });
  }, [bookmarks, tags, categories]);

  const showTags = () => {
    setIsTagsVisible(!isTagsVisible);
  };
  const showInputTag = () => {
    setIsInputTagVisible(!isInputTagVisible);
  };

  const showCategories = () => {
    setIsCategoriesVisible(!isCategoriesVisible);
  };
  const showInputCategory = () => {
    setIsInputCategoryVisible(!isInputCategoryVisible);
  };

  return (
    <nav>
      <Link href="/">
        <Image src={Logo} alt="Logo" className="mx-auto h-auto" />
      </Link>

      <ul
        className="flex flex-col justify-center w-full h-full text-white 
        p-4 space-y-4 bg-black px-8"
      >
        <li className="hover:bg-slate-700 px-4 py-2 rounded-xl cursor-pointer ">
          Home
        </li>
        <li className="hover:bg-slate-700 px-4 py-2 rounded-xl cursor-pointer">
          Categories
        </li>
        <li className="hover:bg-slate-700 px-4 py-2 rounded-xl cursor-pointer">
          Tags
        </li>

        {/* // All Tags List  */}
        <li>
          <div className="mb-2 flex items-center justify-between space-x-2 px-4 pt-4 font-medium text-neutral-200">
            <div className="flex items-center justify-start">
              <h2 className="font-serif text-lg text-slate-200">Tags</h2>
              <button
                className="ml-1 hidden flex-1 justify-end rounded-md outline-none hover:cursor-pointer focus:ring-2 focus:ring-slate-200 lg:flex"
                onClick={showInputTag}
              >
                <FaPlus className="h-3 w-3 text-slate-300" />
              </button>
            </div>
            <div className="flex items-center">
              <button
                className="rounded-lg outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900 "
                onClick={showTags}
              >
                <MdArrowForwardIos
                  className={`h-5 w-5 transition duration-200 ease-in-out rotate-90  ${
                    isTagsVisible ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </button>
            </div>
          </div>
          <ul className="overflow-hidden">
            <div className="ml-2 mb-4 flex flex-col items-start space-y-2 md:ml-4">
              {/* <button
                  className={`inline-block rounded-md px-2 text-left font-serif text-slate-400 outline-none focus:ring-2 focus:ring-slate-200 false 
                ${isTagsVisible ? "block" : "hidden"}`}
                >
                  <span className="ml-1">ddvcv</span>
                </button> */}
              {tags.map((tag, key) => (
                <button
                  key={key}
                  className={`inline-block rounded-md px-2 text-left font-serif text-slate-400 outline-none focus:ring-2 focus:ring-slate-200 false 
                ${isTagsVisible ? "block" : "hidden"}`}
                >
                  <span className="ml-1">{tag}</span>
                </button>
              ))}

              {/* Tag Input Box  */}
              <div
                className={`flex items-center justify-start space-x-1
                  ${isInputTagVisible ? "block" : "hidden"}
                  `}
              >
                <input
                  title="Add Tag"
                  name="addTag"
                  type="text"
                  className="block w-full rounded-md border-2 border-slate-200 bg-white p-2 py-1 text-sm text-slate-900 placeholder-slate-300 focus:border-slate-300 focus:ring-slate-300"
                  value={cuurentTag}
                  onChange={(e) => {
                    setCurrentTag(e.target.value);
                  }}
                />
                <button className="grid place-items-center rounded-md p-1 outline-none focus:ring-2 focus:ring-slate-200">
                  <MdSave className="h-6 w-6 text-slate-600" />
                </button>
                <button className="grid place-items-center rounded-md p-1 outline-none focus:ring-2 focus:ring-slate-200">
                  <MdClose className="h-6 w-6 text-rose-400" />
                </button>
              </div>
            </div>
          </ul>
        </li>

        {/* All Category List  */}
        <li>
          <div className="mb-2 flex items-center justify-between space-x-2 px-4 pt-4 font-medium text-neutral-200">
            <div className="flex items-center justify-start">
              <h2 className="font-serif text-lg text-slate-200">Category</h2>
              <button
                className="ml-1 hidden flex-1 justify-end rounded-md outline-none hover:cursor-pointer focus:ring-2 focus:ring-slate-200 lg:flex"
                onClick={showInputCategory}
              >
                {/* Add svg */}
                <FaPlus className="h-3 w-3 text-slate-300" />
              </button>
            </div>
            <div className="flex items-center">
              <button
                className="rounded-lg outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900 "
                onClick={showCategories}
              >
                <MdArrowForwardIos
                  className={`h-5 w-5 transition duration-200 ease-in-out rotate-90  ${
                    isCategoriesVisible ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </button>
            </div>
          </div>
          <ul className=" overflow-hidden">
            <div className="ml-2 mb-4 flex flex-col items-start space-y-2 md:ml-4">
              {categories.map((category, key) => (
                <button
                  key={key}
                  className={`inline-block rounded-md px-2 text-left font-serif text-slate-400 outline-none focus:ring-2 focus:ring-slate-200 false 
                ${isCategoriesVisible ? "block" : "hidden"}`}
                >
                  <span className="ml-1">{category}</span>
                </button>
              ))}

              {/* Category Input Box  */}
              <div
                className={`flex items-center justify-start space-x-1
                  ${isInputCategoryVisible ? "block" : "hidden"}
                  `}
              >
                <input
                  title="Add Tag"
                  name="addTag"
                  type="text"
                  className="block w-full rounded-md border-2 border-slate-200 bg-white p-2 py-1 text-sm text-slate-900 placeholder-slate-300 focus:border-slate-300 focus:ring-slate-300"
                  value={currentCategory}
                  onChange={(e) => {
                    setCurrentCategory(e.target.value);
                  }}
                />
                <button className="grid place-items-center rounded-md p-1 outline-none focus:ring-2 focus:ring-slate-200">
                  <MdSave className="h-6 w-6 text-slate-600" />
                </button>
                <button className="grid place-items-center rounded-md p-1 outline-none focus:ring-2 focus:ring-slate-200">
                  <MdClose className="h-6 w-6 text-rose-400" />
                </button>
              </div>
            </div>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

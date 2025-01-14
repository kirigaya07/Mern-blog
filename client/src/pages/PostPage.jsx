/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Ensure ReactQuill CSS is imported

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const modules = {
    toolbar: false, // Disable the toolbar
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen"
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="xl" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading post.</div>
      ) : (
        <>
          <motion.h1
            variants={containerVariants}
            className="text-3xl mt-10 p-3 text-center font-serif max-w-4xl mx-auto lg:text-4xl"
          >
            {post && post.title}
          </motion.h1>
          <Link
            to={`/search?category=${post && post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {post && post.category}
            </Button>
          </Link>
          <motion.img
            variants={containerVariants}
            src={post && post.image}
            alt={post && post.title}
            className="mt-10 p-3 max-h-[600px] w-full object-cover"
          />
          <motion.div
            variants={containerVariants}
            className="flex justify-between p-3 mx-auto w-full max-w-4xl text-xs"
          >
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </motion.div>

          {/* Improved content section */}
          <motion.div
            variants={containerVariants}
            className="p-3 max-w-4xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-10" // Dark background in dark mode
          >
            <ReactQuill
              value={post.content} // Content from backend
              readOnly={true} // Only display the content, no editing
              theme="snow" // Snow theme for ReactQuill
              modules={modules} // Disable the toolbar
              className="post-content text-lg leading-relaxed text-gray-900 dark:text-gray-100" // Adjusted text color for dark mode
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="max-w-4xl mx-auto w-full"
          >
            <CallToAction />
          </motion.div>
          <CommentSection postId={post && post._id} />

          <div className="flex flex-col justify-center items-center mb-5">
            <h1 className="text-xl mt-5">Recent articles</h1>
            <div className="flex flex-wrap justify-center gap-5 mt-5">
              {recentPosts &&
                recentPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
            </div>
          </div>
        </>
      )}
    </motion.main>
  );
}

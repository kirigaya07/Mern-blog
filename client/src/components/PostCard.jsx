/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PostCard({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 20px 60px rgba(0, 128, 128, 0.1)",
        transition: { duration: 0.3 },
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative w-full h-[400px] overflow-hidden rounded-lg border border-teal-500 sm:w-[430px] shadow-lg bg-gradient-to-br from-white to-teal-50 dark:from-gray-800 dark:to-gray-900"
    >
      <Link to={`/post/${post.slug}`} className="block h-full">
        {/* Image Section with Subtle Parallax and Fade */}
        <motion.div
          className="relative h-[260px] w-full overflow-hidden rounded-t-lg"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <img
            src={post.image}
            alt="post cover"
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-95 group-hover:object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 group-hover:opacity-70 transition-opacity duration-500"></div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -10,
            boxShadow: "0px 4px 20px rgba(0, 128, 128, 0.2)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="p-4 flex flex-col gap-3"
        >
          {/* Category Tag with Subtle Effects */}
          <motion.span
            className="self-start px-3 py-1 text-xs font-medium text-white bg-teal-500 rounded-full shadow-sm dark:bg-teal-700"
            whileHover={{ scale: 1.1, rotate: 5, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {post.category}
          </motion.span>

          {/* Title with Hover Effects */}
          <motion.p
            className="text-lg font-semibold line-clamp-2 text-gray-800 dark:text-gray-100 group-hover:text-teal-600 transition-colors duration-300"
            whileHover={{
              scale: 1.05,
              color: "#00b3b3",
              textShadow: "0px 0px 8px rgba(0, 128, 128, 0.5)",
            }}
            transition={{ duration: 0.3 }}
          >
            {post.title}
          </motion.p>

          {/* Divider with Scale Animation */}
          <motion.hr
            className="border-t-2 border-teal-500 group-hover:border-teal-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 30,
            }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

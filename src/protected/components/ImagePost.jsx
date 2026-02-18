const ImagePost = ({ post }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden max-w-sm mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{post.username}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.uploadedAt).toLocaleString()}
          </p>
        </div>

        <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          {post.role}
        </span>
      </div>

      {/* Image */}
      <div className="bg-gray-100 p-5 ">
        <img
          src={`http://localhost:8080${post.filePath}`}
          alt={post.caption}
          className="w-full rounded-2xl object-cover  transition-transform duration-300 hover:scale-100"
        />
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <p className="text-gray-800 mb-4">{post.caption}</p>

        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <span className="flex items-center gap-1">❤️ {post.likeCount}</span>
          <span className="flex items-center gap-1">💬 {post.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ImagePost;

import { useEffect, useState, useRef } from "react";
import Pagination from "../../utils/Pagination";
import { Heart, MessageCircle, Upload, X, ImageIcon, Sparkles, BadgeCheck } from "lucide-react";
import { toast } from "react-toastify";

/* ── Image base URL ── */
const BASE = "http://localhost:8080";

/* ── Format date ── */
const fmt = (d) =>
  new Date(d).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });

/* ─────────────────────────────────────────────────────────
   PostModal — full-screen overlay when a post is clicked
───────────────────────────────────────────────────────── */
const PostModal = ({ post, isDark, onClose }) => {
  if (!post) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row shadow-2xl"
        style={{ background: isDark ? "#1f2937" : "white", maxHeight: "90vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)", color: "white" }}
        >
          <X size={16} />
        </button>

        {/* Image */}
        <div className="md:w-3/5 bg-black flex items-center justify-center" style={{ minHeight: 300 }}>
          <img
            src={`${BASE}${post.filePath}`}
            alt={post.caption}
            className="w-full h-full object-contain"
            style={{ maxHeight: "80vh" }}
          />
        </div>

        {/* Info */}
        <div className="md:w-2/5 p-5 flex flex-col gap-4 overflow-y-auto">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-base font-extrabold shrink-0"
              style={{ background: "linear-gradient(135deg,#3C9BF9,#9100BD)", color: "white" }}
            >
              {post.username?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                  @{post.username}
                </p>
                {post.role === "EXPERT" && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}>
                    <BadgeCheck size={9} /> Expert
                  </span>
                )}
              </div>
              <p className="text-[11px]" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                {fmt(post.uploadedAt)}
              </p>
            </div>
          </div>

          {/* Caption */}
          <p className="text-sm leading-relaxed" style={{ color: isDark ? "#d1d5db" : "#374151" }}>
            {post.caption}
          </p>

          {/* Likes / comments */}
          <div className="flex items-center gap-4 pt-2 border-t"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "#f0e9ff" }}>
            <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#ec4899" }}>
              <Heart size={15} fill="#ec4899" /> {post.likeCount}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#3C9BF9" }}>
              <MessageCircle size={15} /> {post.commentCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   UploadModal — for experts only
───────────────────────────────────────────────────────── */
const UploadModal = ({ isDark, onClose, onSuccess }) => {
  const [caption, setCaption]   = useState("");
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file)          return toast.error("Please select an image.");
    if (!caption.trim()) return toast.error("Please enter a caption.");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("caption", caption);

    try {
      setUploading(true);
      const res = await fetch("http://localhost:8080/api/media/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: fd,
      });
      if (res.ok) {
        toast.success("Post uploaded successfully! 🎉");
        onSuccess();
        onClose();
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div className="relative rounded-2xl overflow-hidden w-full max-w-md shadow-2xl"
        style={{ background: isDark ? "#1f2937" : "white" }}
        onClick={e => e.stopPropagation()}>

        <div className="h-1" style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD,#ec4899)" }} />

        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Sparkles size={18} style={{ color: "#9100BD" }} />
              <h2 className="font-bold text-base" style={{ color: isDark ? "#f9fafb" : "#111827" }}>
                New Motivational Post
              </h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg transition-colors"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image picker */}
            <div
              onClick={() => fileRef.current?.click()}
              className="rounded-xl overflow-hidden cursor-pointer border-2 border-dashed flex items-center justify-center transition-all"
              style={{
                borderColor: isDark ? "rgba(145,0,189,0.3)" : "#ddd6fe",
                background: isDark ? "rgba(145,0,189,0.06)" : "#faf5ff",
                minHeight: preview ? "auto" : 140,
              }}>
              {preview ? (
                <img src={preview} alt="preview" className="w-full object-cover rounded-xl" style={{ maxHeight: 280 }} />
              ) : (
                <div className="flex flex-col items-center gap-2 py-10 text-center px-4">
                  <ImageIcon size={28} style={{ color: "#9100BD", opacity: 0.5 }} />
                  <p className="text-xs font-medium" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                    Click to choose an image
                  </p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

            {/* Caption */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wide mb-1.5 block"
                style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
                Caption
              </label>
              <textarea rows={3} value={caption} onChange={e => setCaption(e.target.value)}
                placeholder="Write something inspiring..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "#f8f7ff",
                  border: `1px solid ${isDark ? "rgba(145,0,189,0.25)" : "#ddd6fe"}`,
                  color: isDark ? "#f3f4f6" : "#111827",
                }} />
            </div>

            <button type="submit" disabled={uploading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2
                         transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}>
              {uploading
                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><Upload size={14} /> Share Post</>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Main page
───────────────────────────────────────────────────────── */
const MotivationalPosts = () => {
  const [posts, setPosts]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [page, setPage]             = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selected, setSelected]     = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [isDark, setIsDark]         = useState(
    () => document.documentElement.classList.contains("dark")
  );

  const token   = localStorage.getItem("token");
  const role    = localStorage.getItem("role");
  const isExpert = role === "EXPERT";
  const size    = 30;

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/media/access/getAll?page=${page}&size=${size}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        setPosts(data.content || []);
        setTotalPages(data.totalPages);
      })
      .catch(() => toast.error("Failed to load posts."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPosts(); }, [page]);

  /* ── Bento grid: assign spans based on position ──
     Pattern repeats every 7 items:
     0 → large (col-span-2 row-span-2)
     3 → tall  (row-span-2)
     6 → wide  (col-span-2)
     others → normal
  */
  const getSpan = (index) => {
    const pos = index % 7;
    if (pos === 0) return "col-span-2 row-span-2";
    if (pos === 3) return "row-span-2";
    if (pos === 6) return "col-span-2";
    return "";
  };

  return (
    <div
      className="min-h-full w-full transition-colors duration-300"
      // style={{
      //   background: isDark
      //     ? "#111827"
      //     : "linear-gradient(160deg,#f5f3ff 0%,#eff6ff 50%,#fdf4ff 100%)",
      // }}
    >
      <style>{`
        .post-tile img { transition: transform 0.4s ease; }
        .post-tile:hover img { transform: scale(1.06); }
        .post-overlay {
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .post-tile:hover .post-overlay { opacity: 1; }
      `}</style>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                         px-3 py-1 rounded-full mb-2"
              style={{
                color: isDark ? "#c084fc" : "#9100BD",
                background: isDark ? "rgba(145,0,189,0.15)" : "white",
                border: `1px solid ${isDark ? "rgba(145,0,189,0.3)" : "#ddd6fe"}`,
              }}
            >
              <Sparkles size={11} /> Expert Gallery
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold transition-colors duration-300"
              style={{ color: isDark ? "#fff" : "#111827" }}>
              Motivational{" "}
              <span style={{
                background: "linear-gradient(90deg,#9100BD,#3C9BF9)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Posts
              </span>
            </h1>
            <p className="text-sm mt-1 transition-colors duration-300"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              Uplifting images and words shared by our verified experts
            </p>
          </div>

          {/* Upload button — experts only */}
          {isExpert && (
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white
                         transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-sm"
              style={{ background: "linear-gradient(90deg,#3C9BF9,#9100BD)" }}
            >
              <Upload size={15} /> Share a Post
            </button>
          )}
        </div>

        {/* ── Bento grid ── */}
        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 auto-rows-[160px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i}
                className={`rounded-xl animate-pulse ${getSpan(i)}`}
                style={{ background: isDark ? "rgba(255,255,255,0.06)" : "#e9d5ff40" }}
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl p-16 text-center"
            style={{ background: isDark ? "rgba(255,255,255,0.04)" : "white", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#ede9fe"}` }}>
            <ImageIcon size={40} className="mx-auto mb-3" style={{ color: "#9100BD", opacity: 0.3 }} />
            <p className="font-semibold text-sm" style={{ color: isDark ? "#f9fafb" : "#111827" }}>No posts yet</p>
            <p className="text-xs mt-1" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              Experts will share motivational content here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0.5 auto-rows-[140px] sm:auto-rows-[160px]">
            {posts.map((post, index) => (
              <div
                key={post.id}
                onClick={() => setSelected(post)}
                className={`post-tile relative  overflow-hidden cursor-pointer border  ${getSpan(index)}`}
                style={{ background: isDark ? "#1f2937" : "#f3e8ff" }}
              >
                <img
                  src={`${BASE}${post.filePath}`}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = "none"; }}
                />

                {/* Hover overlay */}
                <div className="post-overlay absolute inset-0 flex flex-col justify-end p-3"
                  style={{ background: "linear-gradient(to top,rgba(0,0,0,0.75),rgba(0,0,0,0.1))" }}>
                  <p className="text-white text-xs font-medium line-clamp-2 mb-1.5">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-white/80 text-[11px]">
                      <Heart size={11} fill="white" /> {post.likeCount}
                    </span>
                    <span className="flex items-center gap-1 text-white/80 text-[11px]">
                      <MessageCircle size={11} /> {post.commentCount}
                    </span>
                    <span className="ml-auto text-white/60 text-[10px]">
                      @{post.username}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8">
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        )}
      </div>

      {/* Modals */}
      {selected && (
        <PostModal post={selected} isDark={isDark} onClose={() => setSelected(null)} />
      )}
      {showUpload && (
        <UploadModal isDark={isDark} onClose={() => setShowUpload(false)} onSuccess={fetchPosts} />
      )}
    </div>
  );
};

export default MotivationalPosts;
import Image from "next/image";
import Link from "next/link";
import { categoryName, formatDate, type Post } from "@/lib/blog";

export default function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link href={post.path} className="cell post hover-soft reveal">
      {post.image ? (
        <Image src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} sizes="(max-width: 900px) 100vw, 360px" priority={priority} />
      ) : (
        <span className="post__placeholder" aria-hidden="true">
          {categoryName(post.category)}
        </span>
      )}
      <p className="post__meta">
        {categoryName(post.category)} · {formatDate(post.date)}
      </p>
      <h3>{post.title}</h3>
    </Link>
  );
}

export function PostGrid({ items }: { items: Post[] }) {
  return (
    <div className="cols cols--3 post-grid">
      {items.map((p, i) => (
        <PostCard key={p.id} post={p} priority={i < 3} />
      ))}
    </div>
  );
}

import React, { useState } from "react";
import { ContentType } from "../../types/ContentType";
import { PostDetails } from "../PostsDetails/PostDetails.tsx";
import { Post } from "../../types/Post";
import { Feed } from "../../types/Feed.ts";
import "./TitleBox.scss";
import { useAppSelector } from "../../helpers/hooks/storeHoooks.ts";

type Props = {
  type: ContentType;
  onDeletePost: (postId: number) => void;
};

export const TitleBox: React.FC<Props> = ({ type, onDeletePost }) => {
  const [selectedPost, setSelectedPost] = useState<Post | Feed | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { posts } = useAppSelector((state) => state.posts);
  const { feeds } = useAppSelector((state) => state.feeds);
  const data = type === "NASA" ? feeds : posts;

  const openModal = (post: Post | Feed) => {
    setSelectedPost(post);
    setIsModalOpen(true);

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);

    document.body.style.overflow = "visible";
    document.body.style.position = "static";
  };

  const handleDeletePost = (postId: number) => {
    onDeletePost(postId);
  };

  return (
    <div className="container">
      {data.map((post) => (
        <div key={`${post.id}-${post.title}`} className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{post.title}</p>

                {"pubDate" in post && (
                  <p className="subtitle is-6">{post.pubDate}</p>
                )}
              </div>
            </div>
            <div className="buttons">
              <button
                className="button is-info is-outlined"
                onClick={() => openModal(post)}
              >
                Read
              </button>
              {type === ContentType.MyBlock && (
                <button
                  className="button is-danger is-outlined"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && selectedPost && (
        <PostDetails post={selectedPost} onClose={closeModal} />
      )}
    </div>
  );
};

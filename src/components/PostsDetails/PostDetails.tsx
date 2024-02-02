import React from "react";
import { Post } from "../../types/Post";
import './PostDetails.scss';
import {Feed} from "../../types/Feed.ts";

type Props = {
  post: Post | Feed;
  onClose: () => void;
};

export const PostDetails: React.FC<Props> = ({ post, onClose }) => {
  const getDescription = (post: Post | Feed): string => {
    if ('description' in post) {

      return post.description;
    } else if ('body' in post) {

      return post.body;
    }
    return '';
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <section className="modal-card-body pb-6">

          <p className="modal-card-title post">{post.title}</p>

          <p>
            {getDescription(post)}
          </p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

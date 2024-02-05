import React, { useState, useEffect, useContext } from "react";
import { Post } from "../../types/Post";
import { TitleBox } from "../TitleBox/TitleBox.tsx";
import { ContentType } from "../../types/ContentType";
import { AddPost } from "../AddPost/AddPost";
import { AuthContext } from "../Auth/AuthContext.tsx";
import { Loader } from "../Loader/Loader.tsx";
import { useDispatch } from "react-redux";
import {
  addNewPost,
  fetchInitialPosts,
  removePost,
} from "../../store/slices/postsSlice.ts";
import { fetchInitialFeeds } from "../../store/slices/feedsSlice.ts";
import { AppDispatch } from "../../store/store.ts";
import "./Main.scss";

export const Main: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedContentType, setSelectedContentType] =
    useState<ContentType | null>(ContentType.NASA);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          dispatch(fetchInitialPosts(user.id));
          dispatch(fetchInitialFeeds());
        }
      } catch (error) {
        throw new Error("Error fetching needed data:" + error);
      }
    };

    fetchData().finally(() =>
      setTimeout(() => {
        setIsLoading(false);
      }, 500),
    );
  }, []);

  const handleContentTypeChange = (contentType: ContentType) => {
    setSelectedContentType(contentType);
    setIsDropdownVisible(false);
  };

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const openAddPostModal = () => {
    setIsAddPostModalOpen(true);
  };

  const closeAddPostModal = () => {
    setIsAddPostModalOpen(false);
  };

  const handleAddPost = (post: Post) => {
    dispatch(addNewPost(post));

    closeAddPostModal();
  };

  const handleDeletePost = (postId: number) => {
    dispatch(removePost(postId));
  };

  return (
    <div className="main-container">
      <div className={`dropdown ${isDropdownVisible ? "is-active" : ""}`}>
        <div className="flex-container">
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={toggleDropdownVisibility}
            >
              <span>
                {selectedContentType
                  ? `${selectedContentType}`
                  : "Choose feeds list"}
              </span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
            {selectedContentType === ContentType.MyBlock && (
              <button
                className="button is-success is-outlined"
                onClick={openAddPostModal}
              >
                Add post
              </button>
            )}
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a
                href="#"
                className="dropdown-item"
                onClick={() => handleContentTypeChange(ContentType.NASA)}
              >
                {ContentType.NASA}
              </a>
              <a
                className="dropdown-item"
                onClick={() => handleContentTypeChange(ContentType.MyBlock)}
              >
                {ContentType.MyBlock}
              </a>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}

      {selectedContentType === ContentType.MyBlock && !isLoading && (
        <TitleBox type={selectedContentType} onDeletePost={handleDeletePost} />
      )}
      {selectedContentType === ContentType.NASA && !isLoading && (
        <TitleBox type={selectedContentType} onDeletePost={handleDeletePost} />
      )}

      {isAddPostModalOpen && !isLoading && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeAddPostModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add Post</p>
              <button
                className="delete"
                aria-label="close"
                onClick={closeAddPostModal}
              ></button>
            </header>
            <section className="modal-card-body">
              <AddPost onAddPost={handleAddPost} />
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

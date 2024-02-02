import React, { useState, useEffect, useContext } from "react";
import { Post } from "../../types/Post";
import { TitleBox } from "../TitleBox/TitleBox.tsx";
import { ContentType } from "../../types/ContentType";
import { AddPost } from "../AddPost/AddPost";
import { getDataFromJSON } from "../../helpers/getDataFromJSON.ts";
import { AuthContext } from "../Auth/AuthContext.tsx";
import { Feed } from "../../types/Feed.ts";
import { getDataFromXML } from "../../helpers/getDataFromXML.ts";
import "./Main.scss";

export const Main: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newsFeeds, setNewsFeeds] = useState<Feed[]>([]);

  const [selectedContentType, setSelectedContentType] =
    useState<ContentType | null>(ContentType.NASA);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const jsonData: Post[] = (await getDataFromJSON(user.id)) || [];
          const xmlData: Feed[] = await getDataFromXML(
            "https://www.nasa.gov/news-release/feed/",
          );

          setPosts(jsonData);
          setNewsFeeds(xmlData);
        }
      } catch (error) {
        throw new Error("Error fetching JSON:" + error);
      }
    };

    fetchData();
  }, []);

  const handleContentTypeChange = (contentType: ContentType) => {
    setSelectedContentType(contentType);
    setIsDropdownVisible(false); // Ховаємо випадаючий список після вибору
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
    setPosts([post, ...posts]);
    closeAddPostModal();
  };

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
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

      {selectedContentType === ContentType.MyBlock && (
        <TitleBox
          type={selectedContentType}
          posts={posts}
          onDeletePost={handleDeletePost}
        />
      )}
      {selectedContentType === ContentType.NASA && (
        <TitleBox
          type={selectedContentType}
          posts={newsFeeds}
          onDeletePost={handleDeletePost}
        />
      )}

      {isAddPostModalOpen && (
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

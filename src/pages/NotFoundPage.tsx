import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="box m-6">
      <h1 className="title">Unfortunately, we did not find such a page on our site.</h1>
      <p>
        You can go to the&nbsp;
        <Link to="/">home page</Link>.
      </p>
    </div>
  );
};

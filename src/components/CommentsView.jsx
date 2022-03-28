import React from "react";
import "../css/comment.scss";

import CommentSingle from "./CommentSingle";

function CommentsView(props) {
  const convertToDate = (timeAsString) => {
    return new Date(timeAsString).toLocaleString();
  };

  return (
    <>
      {props.commentsArray &&
        props.commentsArray.map((item, index) => (
          <CommentSingle
            key={index}
            _id={item._id}
            comment={item.comment}
            replys={item.comment.replys}
            likes={item.likes}
            user_email={item.user_email}
            date={convertToDate(item.createdAt)}
          />
        ))}
    </>
  );
}

export default CommentsView;

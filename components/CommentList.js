import CommentItem from "./CommentItem";

const CommentList = ({ comments, userId, onDelete }) => {
    return (
    <div>
        {comments.map(comment => (
            <CommentItem 
                key={comment.id}
                comment={comment}
                userId={userId}
                onDelete={onDelete}
            />
        ))}
    </div>
    );
};

export default CommentList;
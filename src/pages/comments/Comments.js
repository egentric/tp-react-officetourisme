import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const Comments = () => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    displayComments();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayComments = async () => {
    await axios.get("http://localhost:8000/api/comments").then((res) => {
      setComments(res.data.data);
    });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:8000/api/comments/${id}`)
      .then(displayComments);
  };

  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titres</th>
              <th>Commentaires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.titleComment}</td>
                <td>{comment.contentComment}</td>
                <td>
                  {/*   <Link
                    to={`/comments/edit/${comment.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link> */}
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Comments;

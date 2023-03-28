import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowComment = () => {
  const [showComment, setShowComment] = useState([]);
  useEffect(() => {
    displayShowComment();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowComment = async () => {
    await axios.get("http://localhost:8000/api/comments/${id}").then((res) => {
      setShowComment(res.data.data);
    });
  };
  const deleteShowComment = (id) => {
    axios
      .delete(`http://localhost:8000/api/comments/${id}`)
      .then(displayShowComment);
  };

  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Contenu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showComment.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.titleComment}</td>
                <td>{comment.contentComment}</td>
                <td>
                  {/* <Link
                    to={`/items/edit/${item.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link> */}
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteShowComment(comment.id);
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

export default ShowComment;

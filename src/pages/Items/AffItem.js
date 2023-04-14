import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CommentForm from "../../components/CommentForm";
import Footer from "../../components/Footer";

const AffItem = () => {
  const { item } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({});
  const [comments, setComments] = useState([]);

  const [showCommentForm, setShowCommentForm] = useState(false);

  const openCommentForm = () => {
    setShowCommentForm(true);
  };
  const closeCommentForm = () => {
    setShowCommentForm(false);
  };

  useEffect(() => {
    displayItemData();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayItemData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/items/${item}`);
      setItemData(res.data.item);
      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navigation />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", display: "inline-flex" }}>
          <div className="container mt-5">
            {showCommentForm && (
              <div className="comment-form-overlay">
                <CommentForm />
                <Button
                  onClick={closeCommentForm}
                  className="btn btn-2 btn-sm me-2 mt-2"
                >
                  Fermer
                </Button>
              </div>
            )}
            {showCommentForm && <div className="blur-background"></div>}
            <Row>
              <h2 className="mb-4 mt-5">{itemData.titleItem}</h2>
            </Row>

            <Row>
              <div className="col-12 col-sm-12 col-md-12 mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/storage/uploads/items/${itemData.pictureItem}`}
                    style={{
                      maxHeight: "500px",
                      maxWidth: "100%",
                      display: "block",
                      margin: "0 auto",
                      width: "auto",
                      height: "100%",
                    }}
                    alt={itemData.pictureItem}
                  />

                  <Card.Body className="cardbody">
                    <Card.Title className="cardtitle">
                      {itemData.subtitleItem}
                    </Card.Title>
                    <Card.Text className="cardtexte">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: itemData.contentItem,
                        }}
                      />
                    </Card.Text>
                    <Button
                      className="btn-1 btn-sm mb-2  ms-2"
                      onClick={() => navigate(-1)}
                    >
                      Retour
                    </Button>
                    <Button
                      onClick={openCommentForm}
                      to={`/items/aff/${item.id}`}
                      className="btn btn-2 btn-sm ms-2 mb-2"
                    >
                      Ajouter un Commentaire
                    </Button>

                    {comments.map((comment) => (
                      <Card key={comment.id} className="m-3">
                        <Card.Header>{comment.titleComment}</Card.Header>
                        <Card.Body className="cardtitle">
                          <Card.Text>{comment.contentComment}</Card.Text>
                          <Card.Text style={{ textAlign: "right" }}>
                            {comment.firstName} {comment.lastName}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </Card.Body>
                </Card>
              </div>
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AffItem;

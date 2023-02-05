import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { assignOrderToPartner, getPartners } from "../../../api/admin-api";
import { adminToken } from "../dummy-token";

const AssignPartner = ({ show, onHide, orderId }) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    getPartners(adminToken)
      .then((res) => {
        setPartners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const assignParter = (partnerId) => {
    assignOrderToPartner(adminToken, orderId, partnerId)
      .then((res) => {
        onHide();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Available Partners
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="d-flex align-items-center mb-3 col-6"
            >
              <div className="admin-partner-image">
                <img
                  src={`http://localhost:8080/${partner.image}`}
                  alt={partner.companyName}
                />
              </div>
              <div>
                <p className="m-0 mb-1">{partner.companyName}</p>
                <Button
                  className="btn-shade-yellow"
                  onClick={() => assignParter(partner._id)}
                >
                  Assign Partner
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-shade-yellow" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignPartner;

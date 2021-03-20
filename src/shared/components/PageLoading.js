import React from "react";
import { Col, Row } from "react-bootstrap";
import Aux from "../../datta-able/hoc/_Aux";
import Loader from "react-loader-spinner";

function PageLoading() {
  return (
    <Aux>
      <Row>
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "70vh",
            }}
          >
            <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
          </div>
        </Col>
      </Row>
    </Aux>
  );
}

export default PageLoading;

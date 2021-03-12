import React, { useState } from "react";
import { Card, Col, Row, Collapse, Nav } from "react-bootstrap";
import Aux from "../../datta-able/hoc/_Aux";
import DEMO from "../../shared/stores/datta/constant";
import ListLinkInsideCard from "./components/ListLinkInsideCard";
import "./index.css";

function ArtikelIndex({
  listKategori,
  activeKategoriSlug,
  setActiveKategoriSlug,
}) {
  const [accordionKey, setAccordionKey] = useState(1);
  const activeKategoriName = () => {
    const found = listKategori.find((cat) => cat.slug === activeKategoriSlug);
    return `List Artikel ${found.name}`;
  };
  return (
    <Aux>
      <Row>
        <Col md="3">
          <Card>
            <Card.Header>
              <Card.Title
                as="h5"
                className="d-block w-100"
                style={{ cursor: "pointer" }}
              >
                <div
                  href={DEMO.BLANK_LINK}
                  onClick={() => setAccordionKey(accordionKey !== 1 ? 1 : 0)}
                  aria-controls="accordion1"
                  aria-expanded={accordionKey === 1}
                >
                  Kategori Artikel
                </div>
              </Card.Title>
            </Card.Header>
            <Collapse in={accordionKey === 1}>
              <div id="accordion1">
                <Card.Body>
                  {listKategori?.length > 1 ? (
                    <ListLinkInsideCard
                      listKategori={listKategori}
                      activeKategoriSlug={activeKategoriSlug}
                      setActiveKategoriSlug={setActiveKategoriSlug}
                    />
                  ) : null}
                </Card.Body>
              </div>
            </Collapse>
          </Card>
        </Col>
        <Col md="9">
          <Card>
            <Card.Header>
              <Card.Title>{activeKategoriName()}</Card.Title>
            </Card.Header>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
}

export default ArtikelIndex;

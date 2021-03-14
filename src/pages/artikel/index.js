import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Collapse,
  Button,
  Table,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Aux from "../../datta-able/hoc/_Aux";
import DEMO from "../../shared/stores/datta/constant";
import ListLinkInsideCard from "./components/ListLinkInsideCard";
import "./index.css";

function ArtikelIndex({
  listKategori,
  listArtikel,
  activeKategoriSlug,
  setActiveKategoriSlug,
  setRedirect,
  deletePublishedArtikelByHashedId,
  queryClient,
  setResfreshQuery,
}) {
  const [accordionKey, setAccordionKey] = useState(1);
  const activeKategoriName = () => {
    if (!listKategori) return `List Artikel`;
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
            <Card.Body>
              <div className="w-100 d-flex flex-row-reverse mb-3">
                <Button
                  variant="primary"
                  onClick={() => {
                    setRedirect(
                      `/admin-web/artikel/${activeKategoriSlug}/create`
                    );
                  }}
                >
                  Buat Artikel Baru
                </Button>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <td>No</td>
                    <td>Judul</td>
                    <td>Tanggal Posting</td>
                    <td className="text-center">Aksi</td>
                  </tr>
                </thead>
                <tbody>
                  {listArtikel && (
                    <ListArtikelRow
                      listArtikel={listArtikel}
                      activeKategoriSlug={activeKategoriSlug}
                      setRedirect={setRedirect}
                      deletePublishedArtikelByHashedId={
                        deletePublishedArtikelByHashedId
                      }
                      queryClient={queryClient}
                      setResfreshQuery={setResfreshQuery}
                    />
                  )}
                </tbody>
              </Table>
              <pre>{JSON.stringify(listArtikel)}</pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
}

const ListArtikelRow = ({
  listArtikel,
  activeKategoriSlug,
  setRedirect,
  deletePublishedArtikelByHashedId,
  queryClient,
  setResfreshQuery,
}) => {
  if (!listArtikel || listArtikel.length < 1) {
    return "Belum ada artikel yang dibuat pada kategori ini.";
  }

  return listArtikel.map((artikel, index) => (
    <tr key={artikel.slug} className="tb-row-v-center-50">
      <td>{index + 1}</td>
      <td>{artikel.title}</td>
      <td>
        {Intl.DateTimeFormat(["ban", "id"], {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(artikel.createdAt))}
      </td>
      <td className="d-flex justify-content-around align-items-center">
        <ButtonAction
          artikel={artikel}
          activeKategoriSlug={activeKategoriSlug}
          setRedirect={setRedirect}
          deletePublishedArtikelByHashedId={deletePublishedArtikelByHashedId}
          queryClient={queryClient}
          setResfreshQuery={setResfreshQuery}
        />
      </td>
    </tr>
  ));
};

const actions = [
  {
    text: "Ubah Artikel",
    url: "update",
    variant: "warning",
    icon: "icon-edit",
  },
  {
    text: "Hapus Artikel",
    url: "delete",
    variant: "danger",
    icon: "icon-trash-2",
  },
  {
    text: "Non-aktifkan Artikel",
    url: "disable-artikel",
    variant: "info",
    icon: "icon-lock",
  },
  {
    text: "Non-aktifkan Komentar",
    url: "disable-comment",
    variant: "dark",
    icon: "icon-message-circle",
  },
  {
    text: "Lihat Artikel",
    url: "display-web",
    variant: "success",
    icon: "icon-eye",
  },
];

const ButtonAction = ({
  artikel,
  activeKategoriSlug,
  setRedirect,
  deletePublishedArtikelByHashedId,
  queryClient,
  setResfreshQuery,
}) => {
  const renderTooltip = ({ text, ...props }) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  return (
    <>
      {actions.map((act) => {
        const baseUrl = `/admin-web/artikel`;

        return (
          <OverlayTrigger
            key={act.url}
            placement="bottom"
            overlay={renderTooltip({ text: act.text })}
          >
            <Button
              variant={act.variant}
              className="text-white p-2"
              onClick={async () => {
                switch (act.url) {
                  case "update":
                    setRedirect(
                      `${baseUrl}/${activeKategoriSlug}/update/${artikel.ArtikelPublished.id}`
                    );
                    break;
                  case "delete":
                    await deletePublishedArtikelByHashedId(
                      artikel.ArtikelPublished.id
                    );
                    setResfreshQuery(Math.random());
                    break;
                  default:
                    break;
                }
              }}
            >
              <i
                className={`m-0 feather ${act.icon}`}
                style={{ fontSize: "1.1rem" }}
              />
            </Button>
          </OverlayTrigger>
        );
      })}
    </>
  );
};

export default ArtikelIndex;

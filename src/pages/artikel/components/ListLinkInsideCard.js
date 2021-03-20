import React from "react";
import DEMO from "../../../shared/stores/datta/constant";
import "./ListLinkInsideCard.css";

function LinkItem({
  isBorder,
  isActive,
  text,
  slug,
  setActiveKategoriSlug,
  setRedirect,
}) {
  const classLink = `card-link-item ${isBorder ? "border-bottom" : ""} ${
    isActive ? "active" : ""
  }`;
  return (
    <div
      className={classLink}
      onClick={() => {
        setActiveKategoriSlug(slug);
        setRedirect(`/admin-web/artikel/${slug}`);
      }}
    >
      <a href={DEMO.BLANK_LINK}>{text}</a>
    </div>
  );
}

function ListLinkInsideCard({
  listKategori,
  activeKategoriSlug,
  setActiveKategoriSlug,
  setRedirect,
}) {
  return (
    <>
      {listKategori.map((ln, index) => {
        return (
          <LinkItem
            key={ln.slug}
            isBorder={listKategori[index + 1] ? true : false}
            isActive={ln.slug === activeKategoriSlug ? true : false}
            text={ln.name}
            slug={ln.slug}
            setActiveKategoriSlug={setActiveKategoriSlug}
            setRedirect={setRedirect}
          />
        );
      })}
    </>
  );
}

export default ListLinkInsideCard;

import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import ArtikelIndex from ".";
import PageLoading from "../../shared/components/PageLoading";
import ArtikelService from "../../shared/services/artikel.service";

function ArtikelIndexContainer(props) {
  console.log(
    "🚀 ~ file: index.container.js ~ line 9 ~ ArtikelIndexContainer ~ props",
    props
  );
  const categorySlug = props.match.params.kategori;
  const [redirect, setRedirect] = useState(false);
  const [everSetKategoriSlug, setEverSetKategoriSlug] = useState(false);
  const [activeKategoriSlug, setActiveKategoriSlug] = useState("");
  const queryClient = useQueryClient();
  const [refreshQuery, setResfreshQuery] = useState(1);
  const [accordionKey, setAccordionKey] = useState(1);

  const listKategori = useQuery(
    "kategoriList",
    ArtikelService.getArtikelKategoriList
  );

  const listArtikel = useQuery(
    ["artikelList", activeKategoriSlug, refreshQuery],
    () => ArtikelService.getArtikelListByKategori(activeKategoriSlug)
  );

  if (redirect) {
    setRedirect(false);
    props.history.push(redirect);
  }

  if (listKategori.isLoading && listArtikel.isLoading) {
    return <PageLoading />;
  }

  if (!listKategori.isLoading && !everSetKategoriSlug) {
    if (categorySlug) setActiveKategoriSlug(categorySlug);
    else setActiveKategoriSlug(listKategori.data.dinamis[0].slug);

    if (listKategori.data.dinamis.find((cat) => cat.slug === categorySlug))
      setAccordionKey(1);
    else setAccordionKey(2);
    setEverSetKategoriSlug(true);
  }

  return (
    <ArtikelIndex
      accordionKey={accordionKey}
      setAccordionKey={setAccordionKey}
      listKategori={listKategori.data}
      listArtikel={listArtikel.data}
      activeKategoriSlug={activeKategoriSlug}
      setActiveKategoriSlug={setActiveKategoriSlug}
      setRedirect={setRedirect}
      deletePublishedArtikelByHashedId={
        ArtikelService.deletePublishedArtikelByHashedId
      }
      queryClient={queryClient}
      setResfreshQuery={setResfreshQuery}
    />
  );
}

export default ArtikelIndexContainer;

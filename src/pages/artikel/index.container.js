import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Redirect } from "react-router-dom";
import ArtikelIndex from ".";
import PageLoading from "../../shared/components/PageLoading";
import ArtikelService from "../../shared/services/artikel.service";

function ArtikelIndexContainer() {
  const [redirect, setRedirect] = useState(false);
  const [everSetKategoriSlug, setEverSetKategoriSlug] = useState(false);
  const [activeKategoriSlug, setActiveKategoriSlug] = useState("");
  const queryClient = useQueryClient();
  const [refreshQuery, setResfreshQuery] = useState(1);

  const listKategori = useQuery(
    "kategoriList",
    ArtikelService.getArtikelKategoriList
  );

  const listArtikel = useQuery(
    ["artikelList", activeKategoriSlug, refreshQuery],
    () => ArtikelService.getArtikelListByKategori(activeKategoriSlug)
  );

  if (redirect) {
    return <Redirect push to={redirect} />;
  }

  if (listKategori.isLoading && listArtikel.isLoading) {
    return <PageLoading />;
  }

  if (!listKategori.isLoading && !everSetKategoriSlug) {
    setActiveKategoriSlug(listKategori.data[0].slug);
    setEverSetKategoriSlug(true);
  }

  return (
    <ArtikelIndex
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

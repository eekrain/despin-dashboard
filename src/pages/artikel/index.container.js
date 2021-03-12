import React, { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import ArtikelIndex from ".";
import PageLoading from "../../shared/components/PageLoading";
import ArtikelService from "../../shared/services/artikel.service";

function ArtikelIndexContainer() {
  const [everSetKategoriSlug, setEverSetKategoriSlug] = useState(false);
  const [activeKategoriSlug, setActiveKategoriSlug] = useState("");
  const queryClient = useQueryClient();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const listKategori = useQuery("kategoriList", async () => {
    const data = ArtikelService.getArtikelKategoriList();
    if (activeKategoriSlug === "") forceUpdate();
    return data;
  });

  const listArtikel = useQuery(["artikelList", activeKategoriSlug], () =>
    ArtikelService.getArtikelListByKategori(activeKategoriSlug)
  );

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
    />
  );
}

export default ArtikelIndexContainer;

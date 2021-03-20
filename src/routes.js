import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() =>
  import("./datta-able/Demo/Dashboard/Default")
);

const UIBasicButton = React.lazy(() =>
  import("./datta-able/Demo/UIElements/Basic/Button")
);
const UIBasicBadges = React.lazy(() =>
  import("./datta-able/Demo/UIElements/Basic/Badges")
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
  import("./datta-able/Demo/UIElements/Basic/BreadcrumbPagination")
);

const UIBasicCollapse = React.lazy(() =>
  import("./datta-able/Demo/UIElements/Basic/Collapse")
);
const UIBasicTabsPills = React.lazy(() =>
  import("./datta-able/Demo/UIElements/Basic/TabsPills")
);
const UIBasicBasicTypography = React.lazy(() =>
  import("./datta-able/Demo/UIElements/Basic/Typography")
);

const FormsElements = React.lazy(() =>
  import("./datta-able/Demo/Forms/FormsElements")
);

const BootstrapTable = React.lazy(() =>
  import("./datta-able/Demo/Tables/BootstrapTable")
);

const Nvd3Chart = React.lazy(() =>
  import("./datta-able/Demo/Charts/Nvd3Chart/index")
);

const GoogleMap = React.lazy(() =>
  import("./datta-able/Demo/Maps/GoogleMap/index")
);

const OtherSamplePage = React.lazy(() =>
  import("./datta-able/Demo/Other/SamplePage")
);
const OtherDocs = React.lazy(() => import("./datta-able/Demo/Other/Docs"));

// ====================================================================================================================

const ArtikelIndex = React.lazy(() =>
  import("./pages/artikel/index.container")
);

const ArtikelCreate = React.lazy(() =>
  import("./pages/artikel/CreateArtikel.container")
);

const ArtikelUpdate = React.lazy(() =>
  import("./pages/artikel/UpdateArtikel.container")
);

// ====================================================================================================================
const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: DashboardDefault,
    private: true,
  },
  {
    path: "/admin-web/artikel",
    exact: true,
    name: "Artikel",
    component: ArtikelIndex,
    private: true,
  },
  {
    path: "/admin-web/artikel/:kategori",
    exact: true,
    name: "Artikel",
    component: ArtikelIndex,
    private: true,
  },
  {
    path: "/admin-web/artikel/:kategori/create",
    exact: true,
    name: "Create New Artikel",
    component: ArtikelCreate,
    private: true,
  },
  {
    path: "/admin-web/artikel/:kategori/update/:hashedArtikelId",
    exact: true,
    name: "Update Artikel",
    component: ArtikelUpdate,
    private: true,
  },
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/basic/button",
    exact: true,
    name: "Basic Button",
    component: UIBasicButton,
  },
  {
    path: "/basic/badges",
    exact: true,
    name: "Basic Badges",
    component: UIBasicBadges,
  },
  {
    path: "/basic/breadcrumb-paging",
    exact: true,
    name: "Basic Breadcrumb Pagination",
    component: UIBasicBreadcrumbPagination,
  },
  {
    path: "/basic/collapse",
    exact: true,
    name: "Basic Collapse",
    component: UIBasicCollapse,
  },
  {
    path: "/basic/tabs-pills",
    exact: true,
    name: "Basic Tabs & Pills",
    component: UIBasicTabsPills,
  },
  {
    path: "/basic/typography",
    exact: true,
    name: "Basic Typography",
    component: UIBasicBasicTypography,
  },
  {
    path: "/forms/form-basic",
    exact: true,
    name: "Forms Elements",
    component: FormsElements,
  },
  {
    path: "/tables/bootstrap",
    exact: true,
    name: "Bootstrap Table",
    component: BootstrapTable,
  },
  {
    path: "/charts/nvd3",
    exact: true,
    name: "Nvd3 Chart",
    component: Nvd3Chart,
  },
  {
    path: "/maps/google-map",
    exact: true,
    name: "Google Map",
    component: GoogleMap,
  },
  {
    path: "/sample-page",
    exact: true,
    name: "Sample Page",
    component: OtherSamplePage,
  },
  { path: "/docs", exact: true, name: "Documentation", component: OtherDocs },
];

export default routes;

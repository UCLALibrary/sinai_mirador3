import Mirador from 'mirador/dist/es/src/index';
import miradorImageToolsPlugin from 'mirador-image-tools/es/plugins/miradorImageToolsPlugin';
import annotationPlugins from 'mirador-annotations';
import AnnototAdapter from 'mirador-annotations/es/AnnototAdapter';
import LocalStorageAdapter from 'mirador-annotations/es/LocalStorageAdapter';


let params = new URL(document.location).searchParams;
let  encodedArk;
let manifestURL
let initializedManifest = params.get('manifest');
let splitURL = initializedManifest.split("ark:");
if(splitURL.length > 1){
  encodedArk = "ark:" + splitURL[1].substring(0,splitURL[1].lastIndexOf("/")).replaceAll("/","%2F");
  console.log("Ark ENCODED "+encodedArk);
  manifestURL = splitURL[0] + encodedArk + splitURL[1].substring(splitURL[1].lastIndexOf("/"));
  console.log("URL ENCODED "+manifestURL);
} else {
  manifestURL = initializedManifest;
  console.log("URL ENCODED "+manifestURL);
}


const config = {
  id: 'mirador-viewer',
  annotation: {
    adapter: (canvasId) => new LocalStorageAdapter(`localStorage://?canvasId=${canvasId}`),
    // adapter: (canvasId) => new AnnototAdapter(canvasId, 'http://localhost:8888/'),
  },
  selectedTheme: 'dark',
  language: 'en', // The default language set in the application
  availableLanguages: { // All the languages available in the language switcher
    ar: 'العربية',
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    ja: '日本語',
    lt: 'Lietuvių',
    nl: 'Nederlands',
    'pt-BR': 'Português do Brasil',
    'zh-CN': '中文(简体)',
    'zh-TW': '中文(繁體)',
    it: "Italiano",
    sr: 'Српски',
  },
  window: {
    //global window defaults
    allowClose: true, // Configure if windows can be closed or not
    allowFullscreen: true, // Configure to show a "fullscreen" button in the     WindowTopBar
    allowMaximize: true, // Configure if windows can be maximized or not
    allowTopMenuButton: true, // Configure if window view and thumbnail display   menu   are visible or not
    allowWindowSideBar: true, // Configure if side bar menu is visible or not
    authNewWindowCenter: 'parent', // Configure how to center a new window created   by   the authentication flow. Options: parent, screen
    sideBarPanel: 'canvas', // Configure which sidebar is selected by default.   Options:   info, attribution, canvas, annotations, search
    defaultSidebarPanelHeight: 201,  // Configure default sidebar height in pixels
    defaultSidebarPanelWidth: 235, // Configure default sidebar width in pixels
    defaultView: 'gallery',  // Configure which viewing mode (e.g. single, book,     gallery) for windows to be opened in
    forceDrawAnnotations: false,
    hideWindowTitle: false, // Configure if the window title is shown in the   window   title bar or not
    highlightAllAnnotations: false, // Configure whether to display annotations on   the   canvas by default
    showLocalePicker: false, // Configure locale picker for multi-lingual metadata
    sideBarOpen: true, // Configure if the sidebar (and its content panel) is open   by   default
    panels: { // Configure which panels are visible in WindowSideBarButtons
          info: true,
          attribution: true,
          canvas: true,
          annotations: true,
          search: true,
          layers: true,
    },
    views: [
      { key: 'single' },
      { key: 'book', behaviors: ['paged'] },
      { key: 'scroll', behaviors: ['continuous'] },
      { key: 'gallery' },
    ],
  },
  windows: [
    {
      imageToolsEnabled: true,
      manifestId: manifestURL,
    }
  ],
  workspace: {
    draggingEnabled: true,
    allowNewWindows: true,
    showZoomControls: true, // Configure if zoom controls should be displayed by     default
    type: 'mosaic', // Which workspace type to load by default. Other possible values     are "elastic". If "mosaic" or "elastic" are not selected no worksapce type will be     used.
    viewportPosition: { // center coordinates for the elastic mode workspace
      x: 0,
      y: 0,
    },
    width: 5000, // width of the elastic mode's virtual canvas
  },
  galleryView: {
    height: 200, // height of gallery view thumbnails
    width: null, // width of gallery view thumbnails (or null, to auto-calculate an aspect-ratio appropriate size)
  }
}

//console.log("check the url "+encodeURIComponent(config.windows[0].manifestId))
Mirador.viewer(config, [
  ...miradorImageToolsPlugin,
  ...annotationPlugins,
]);

import type { ApplicationType } from "@/types";

export interface MenuItemData {
  title: string;
  icon: string;
  options?: MenuItemData[];
  component?: string;
  data?: Record<string, unknown>;
  href?: string;
  type?: "ExternalLink";
  isDisabled?: boolean;
  isShutdown?: boolean;
  isFolder?: boolean;
  multiInstance?: boolean;
  application?: ApplicationType;
  divider?: boolean;
}

const accessories: MenuItemData[] = [
  {
    title: "Entertainment",
    icon: "directory_closed-1",
    isFolder: true,
    options: [],
  },
  {
    title: "Internet Tools",
    icon: "directory_closed-1",
    isFolder: true,
    options: [],
  },
  {
    title: "System Tools",
    icon: "directory_closed-1",
    isFolder: true,
    options: [],
  },
  { title: "Calculator", icon: "calculator-1", isDisabled: true },
  {
    title: "Minesweeper",
    icon: "game_mine_1-1",
    component: "Minesweeper",
    multiInstance: true,
  },
  {
    title: "Notepad",
    icon: "notepad-0",
    component: "Notepad",
    multiInstance: true,
  },
  {
    title: "Paint",
    icon: "paint_old-1",
    component: "IframeWindow",
    data: { src: "https://jspaint.app/", creator: "https://github.com/1j01" },
    multiInstance: true,
  },
  {
    title: "SkiFree",
    icon: "ms_dos_2-1",
    component: "IframeWindow",
    data: { src: "https://basicallydan.github.io/skifree.js/" },
    multiInstance: true,
  },
];

const programs: MenuItemData[] = [
  {
    title: "Accessories",
    icon: "directory_closed-1",
    isFolder: true,
    options: accessories,
  },
  {
    title: "Online Services",
    icon: "directory_closed-1",
    isFolder: true,
    options: [],
  },
  { title: "StartUp", icon: "directory_closed-1", isFolder: true, options: [] },
  {
    title: "Internet Explorer",
    icon: "msie1-3",
    component: "InternetExplorer",
    data: { src: "https://web.archive.org/web/1998/https://www.google.com/" },
  },
  {
    title: "JS-DOS Prompt",
    icon: "console_prompt-1",
    component: "JSDos",
    multiInstance: true,
  },
  { title: "Outlook Express", icon: "outlook_express-2", isDisabled: true },
  { title: "Windows Explorer", icon: "computer_explorer-1", isDisabled: true },
];

const favorites: MenuItemData[] = [
  {
    title: "Channels",
    icon: "directory_closed-1",
    isFolder: true,
    options: [],
  },
  {
    title: "Links",
    icon: "directory_closed-1",
    isFolder: true,
    options: [
      {
        title: "MySpace",
        type: "ExternalLink",
        icon: "html-0",
        href: "https://web.archive.org/web/20080320075546/www.myspace.com/my_address",
      },
    ],
  },
  {
    title: "Media",
    icon: "directory_closed-1",
    isFolder: true,
    options: [
      {
        title: "My Big List of Films",
        type: "ExternalLink",
        icon: "html-0",
        href: "https://letterboxd.com/",
      },
    ],
  },
  {
    title: "My Github",
    type: "ExternalLink",
    icon: "html-0",
    href: "https://web.archive.org/web/1998/https://www.github.com/",
  },
];

const find: MenuItemData[] = [
  { title: "Files or Folders...", icon: "search_file-2", isDisabled: true },
  { title: "Computer...", icon: "computer-1", isDisabled: true },
  {
    title: "On the Internet...",
    icon: "internet_options-2",
    type: "ExternalLink",
    href: "https://google.com",
  },
  {
    title: "People...",
    icon: "users-1",
    type: "ExternalLink",
    href: "https://facebook.com",
  },
];

const documents: MenuItemData[] = [
  {
    title: "ASCII Art",
    isFolder: true,
    options: [
      {
        title: "facepalm",
        icon: "notepad_file-1",
        component: "Notepad",
        data: { content: "*facepalm*" },
      },
      {
        title: "squirtel",
        icon: "notepad_file-1",
        component: "Notepad",
        data: { content: "Squirtel squirt!" },
      },
    ],
    icon: "directory_closed-1",
  },
  {
    title: "Lyrics",
    isFolder: true,
    options: [
      {
        title: "sunscreen",
        icon: "notepad_file-1",
        component: "Notepad",
        data: { content: "Wear sunscreen..." },
      },
      {
        title: "all star lyrics",
        icon: "notepad_file-1",
        component: "Notepad",
        data: { content: "Somebody once told me..." },
      },
    ],
    icon: "directory_closed-1",
  },
];

export const startMenuData: MenuItemData[] = [
  {
    title: "Programs",
    icon: "directory_closed-1",
    isFolder: true,
    options: programs,
  },
  {
    title: "Favorites",
    icon: "directory_favorites-1",
    isFolder: true,
    options: favorites,
  },
  {
    title: "Documents",
    icon: "directory_open_cool-1",
    isFolder: true,
    options: documents,
  },
  {
    title: "Settings",
    icon: "settings_gear-1",
    isFolder: true,
    options: [
      { title: "Control Panel", icon: "directory_control_panel-1" },
      { title: "Printers", icon: "printer-1" },
      { title: "Taskbar", icon: "start_menu_xp-1" },
      { divider: true, icon: "", title: "" },
      { title: "Folder Options", icon: "directory_folder_options-1" },
    ],
  },
  { title: "Find", icon: "search_file-2", isFolder: true, options: find },
  { title: "Help", icon: "help_book_cool-1" },
  {
    title: "Run...",
    icon: "executable-1",
    component: "Notepad",
  },
  { divider: true, icon: "", title: "" },
  {
    title: "Shut Down...",
    icon: "shut_down_normal-0",
    isShutdown: true,
  },
];

import { useThemeContext } from "../../../context/themeContext";
import { getStyles } from "./style";
import {
  MenuSharp,
  MenuOpenSharp,
  ExpandLess,
  ExpandMore,
  SwipeVerticalOutlined,
  GpsFixed,
  DoneSharp,
  DoneAllSharp,
  AccountTreeOutlined,
  PestControlSharp,
  OutboxSharp,
  LibraryAddSharp,
  StorageSharp,
  PlayCircleSharp,
  HelpSharp,
  CloseSharp,
  PersonSharp,
  SettingsSharp,
  FormatListBulletedSharp,
  LinkSharp,
  LinkOffSharp,
  MoreVertSharp,
  ScheduleSharp,
  HistorySharp,
  LocalPhoneSharp,
  SupportAgentSharp,
  TurnedInNotSharp,
  PowerSettingsNewSharp,
  PasswordSharp,
  WbSunnySharp,
  NightlightRoundSharp,
  SearchSharp,
  SearchOffSharp,
  UnfoldLessSharp,
  UnfoldMoreSharp,
  AddCircleSharp,
  SubdirectoryArrowRightSharp,
  ThumbUpSharp,
  ChatSharp,
  KeyboardArrowRightSharp,
  ExpandMoreSharp,
  AttachFileSharp,
  InfoOutlined,
  FormatListNumberedSharp,
  ReportProblemSharp,
  CreateSharp,
  NearMeSharp,
  BookmarksSharp,
  SwipeVerticalSharp,
  EditNoteSharp,
  VisibilitySharp,
  VisibilityOffSharp,
  FolderSharp,
  ShareSharp,
  ArrowCircleRightOutlined,
  ArrowBackSharp,
  DownloadSharp,
  FormatStrikethrough,
  FormatUnderlinedSharp,
  FormatItalicSharp,
  FormatBoldSharp,
  DeleteSharp,
  ChevronLeftSharp,
  ChevronRightSharp,
  ListAltSharp,
  KeyboardDoubleArrowRightSharp,
  ZoomOutMapSharp,
  HowToRegSharp,
  AccountBoxSharp,
  FactorySharp,
} from "@mui/icons-material";

function styleIcon(xLarge, large, bg) {
  const { theme } = useThemeContext();
  const styles = getStyles(theme, xLarge, large, bg);
  return { ...styles.icons };
}

const propsIcon = (props) => {
  return (props.xLarge, props.large, props.bg);
};

export const IconMenu = () => {
  return <MenuSharp style={styleIcon(true)} />;
};
export const IconShowList = () => {
  return <MenuOpenSharp style={styleIcon(true)} />;
};

export const IconExpandCollapse = (props) => {
  if (props.open)
    return (
      <ExpandLess style={styleIcon(props.xLarge, props.large, props.bg)} />
    );
  else
    return (
      <ExpandMore style={styleIcon(props.xLarge, props.large, props.bg)} />
    );
};

export const IconExpandCollapseSubGrupo = (props) => {
  if (props.open)
    return (
      <UnfoldLessSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
    );
  else
    return (
      <UnfoldMoreSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
    );
};

export const IconPerson = (props) => {
  return <PersonSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
};

export const IconDone = (props) => {
  return <DoneSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
};

export const IconDoneAll = (props) => {
  return (
    <DoneAllSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconBug = (props) => {
  return (
    <PestControlSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconOutBox = (props) => {
  return <OutboxSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
};

export const IconExtras = (props) => {
  return (
    <LibraryAddSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconHelp = (props) => {
  return <HelpSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
};

export const IconStorage = (props) => {
  return (
    <StorageSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconPlay = (props) => {
  return (
    <PlayCircleSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconSettings = (props) => {
  return (
    <SettingsSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconBookmark = (props) => {
  return (
    <BookmarksSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconMov = (props) => {
  return (
    <SwipeVerticalOutlined
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
};

export const IconGps = (props) => {
  return <GpsFixed style={styleIcon(props.xLarge, props.large, props.bg)} />;
};

export const IconSector = (props) => {
  return (
    <AccountTreeOutlined
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
};

export const IconClose = (props) => {
  return <CloseSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
};

export const IconList = (props) => {
  return (
    <FormatListBulletedSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
};

export const IconLink = (props) => {
  return <LinkSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
};

export const IconLinkOff = (props) => {
  return (
    <LinkOffSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconVerticalMore = (props) => {
  return <MoreVertSharp style={styleIcon(props.large)} />;
};

export const IconClock = (props) => {
  return (
    <ScheduleSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconPhone = (props) => {
  return (
    <LocalPhoneSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconSuportAgent = (props) => {
  return (
    <SupportAgentSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconReturn = (props) => {
  return (
    <HistorySharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconMarc = (props) => {
  return (
    <TurnedInNotSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
};

export const IconSubGrp = (props) => {
  return (
    <SubdirectoryArrowRightSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
};

export function IconPower(props) {
  return (
    <PowerSettingsNewSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconPassword(props) {
  return (
    <PasswordSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconSun(props) {
  return (
    <WbSunnySharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconMoon(props) {
  return (
    <NightlightRoundSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconSearch(props) {
  return <SearchSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
}

export function IconSearchOff(props) {
  return (
    <SearchOffSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconPlus(props) {
  return (
    <AddCircleSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconLike(props) {
  return (
    <ThumbUpSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconMessage(props) {
  return <ChatSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
}

export function IconArrowRightShort(props) {
  return (
    <KeyboardArrowRightSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconExpanded(props) {
  return (
    <ExpandMoreSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconAttach(props) {
  return (
    <AttachFileSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconInfo(props) {
  return (
    <InfoOutlined style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconOrderList(props) {
  return (
    <FormatListNumberedSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconAlert(props) {
  return (
    <ReportProblemSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconEdit(props) {
  return <CreateSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
}

export function IconSend(props) {
  return <NearMeSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
}

export function IconSwipe(props) {
  return (
    <SwipeVerticalSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconEditNote(props) {
  return (
    <EditNoteSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconEye(props) {
  return (
    <VisibilitySharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconEyeOff(props) {
  return (
    <VisibilityOffSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconFolder(props) {
  return <FolderSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
}

export function IconShare(props) {
  return <ShareSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
}

export function IconArrowRightOut(props) {
  return (
    <ArrowCircleRightOutlined
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconBack(props) {
  return (
    <ArrowBackSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconDonwload(props) {
  return (
    <DownloadSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconStrike(props) {
  return (
    <FormatStrikethrough
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconUnderline(props) {
  return (
    <FormatUnderlinedSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconItalic(props) {
  return (
    <FormatItalicSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconBold(props) {
  return (
    <FormatBoldSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconTrash(props) {
  return <DeleteSharp style={styleIcon(props.xLarge, props.large, props.bg)} />;
}

export function IconChevronLeft(props) {
  return (
    <ChevronLeftSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconChevronRight(props) {
  return (
    <ChevronRightSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconOtherList(props) {
  return (
    <ListAltSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconLast(props) {
  return (
    <KeyboardDoubleArrowRightSharp
      style={styleIcon(props.xLarge, props.large, props.bg)}
    />
  );
}

export function IconZoom(props) {
  return (
    <ZoomOutMapSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconRegister(props) {
  return (
    <HowToRegSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconUser(props) {
  return (
    <AccountBoxSharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

export function IconFactory(props) {
  return (
    <FactorySharp style={styleIcon(props.xLarge, props.large, props.bg)} />
  );
}

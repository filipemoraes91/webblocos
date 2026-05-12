import { ContainerFormPage } from "../../components/container";
import { IconGps } from "../../components/datadisplay/icons";
import { TextTitlePage } from "../../components/datadisplay/typography";
import { ButtonVoltar } from "../../components/inputs/button";
import { TreeViewRastreios } from "../../components/navigation/treeview";

export default function Rastreios() {
  return (
    <ContainerFormPage
      auxLeft={<TextTitlePage icon={<IconGps xLarge />} text="Rastreios" />}
      auxRight={<ButtonVoltar />}
      detail={<TreeViewRastreios />}
    />
  );
}

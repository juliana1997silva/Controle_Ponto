import { Icon } from "@rsuite/icons";
import TimeIcon from "@rsuite/icons/Time";
import WavePointIcon from "@rsuite/icons/WavePoint";
export const appNavs = [
  {
    eventKey: "dashboard",
    icon: <Icon as={WavePointIcon} />,
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    eventKey: "calendar",
    icon: <Icon as={TimeIcon} />,
    title: "Registro de Ponto",
    to: "/registry",
  },
];

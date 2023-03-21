export interface IProps {
  children: React.ReactNode;
}

export interface FormData {
  activities?: [];
  hour_NoCommercial?: [];
  checkin: string;
  checkout: string;
  date: string;
  pause_checkin: string;
  pause_checkout: string;
}

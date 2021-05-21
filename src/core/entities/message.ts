export default interface Message {
  message_id: number;
  from_user: number;
  to_user: number;
  date: Date;
  body: string;
}

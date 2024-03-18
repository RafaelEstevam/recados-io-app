export interface MessageInterface {
  _id?: string,
  author: string,
  type: 'important' | 'not-important' | 'urgent' | string,
  date?: string,
  text: string,
  channel: string,
}
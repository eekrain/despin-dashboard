export interface ConnectionObj {
  id: number;
  name: string;
  status: string;
  image: string;
  email: string;
  address: string;
  designation: string;
}

export interface FolderObj {
  id: number;
  name: string;
  alias: string;
  icon: string;
}

export interface LabelObj {
  id: number;
  name: string;
  alias: string;
  color: string;
  icon: any;
}

export interface MailObj {
  id: number;
  isChecked: boolean;
  isStarred: boolean;
  isReplied: boolean;
  label: LabelObj;
  sentBy: string;
  subject: string;
  isAttachment: boolean;
  sentAt: string;
  isRead: boolean;
  folderValue: number;
  sentOn: string;
  senderMailId: string;
}

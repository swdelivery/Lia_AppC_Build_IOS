export type RenderItemProps<Data> = {
  item: Data;
  index: number;
};

export type Timestamp = {
  created: string;
  updated: string;
};

export type FileAvatar = {
  originalName: string;
  isDependent: boolean;
  link: string;
  path: string;
  mimeType: string;
  extension: string;
  type: string;
  size: number;
  encoding: string;
  source: string;
  isActive: string;
  isSystemFile: boolean;
  defaultType: string;
  isDelete: false;
  _id: string;
  name: string;
  parentId: string;
  entityPermissionId: string;
  userCreate: string;
  timeNow: string;
  slug: string;
  __v: number;
  id: string;
  dimensions: {
    width: number;
    height: number;
  };
} & Timestamp;

export type FileUpload = {
  isDelete: boolean;
  _id: string;
  name: string;
  userCreate: string;
  __v: number;
  id: string;
  fileUpload: FileAvatar;
};

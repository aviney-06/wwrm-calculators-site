/**
 * Strapi blocks / rich-text shapes shared by the calculators CMS and the renderer.
 * Kept in `types/` so server utilities do not import from UI components.
 */

export type RichTextTextNode = {
  type: "text";
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type RichTextElementNode = {
  type: string;
  level?: number;
  format?: string;
  url?: string;
  children?: RichTextNode[];
  [key: string]: unknown;
};

export type RichTextNode = RichTextTextNode | RichTextElementNode;

export type CmsSubSection = {
  heading?: RichTextNode[];
  content?: RichTextNode[];
};

export type CmsSection = {
  id?: string | number;
  heading?: RichTextNode[];
  content?: RichTextNode[];
  subSection?: CmsSubSection[];
};

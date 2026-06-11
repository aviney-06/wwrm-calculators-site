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

/**
 * A CMS rich field. The current schema (TipTap) returns an HTML `string` for
 * rich content and a plain `string` for headings. Older entries may still be
 * Strapi Blocks (`RichTextNode[]`), so both shapes are accepted.
 */
export type CmsRichField = string | RichTextNode[];

export type CmsSubSection = {
  heading?: CmsRichField;
  content?: CmsRichField;
};

export type CmsSection = {
  id?: string | number;
  heading?: CmsRichField;
  content?: CmsRichField;
  subSection?: CmsSubSection[];
};

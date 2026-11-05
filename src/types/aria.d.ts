import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    role?: AriaRole;
    'aria-activedescendant'?: string;
    'aria-atomic'?: Booleanish | 'false' | 'true';
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    'aria-braillelabel'?: string;
    'aria-brailleroledescription'?: string;
    'aria-busy'?: Booleanish;
    'aria-checked'?: Booleanish | 'mixed';
    'aria-colcount'?: number;
    'aria-colindex'?: number;
    'aria-colindextext'?: string;
    'aria-colspan'?: number;
    'aria-controls'?: string;
    'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time';
    'aria-describedby'?: string;
    'aria-description'?: string;
    'aria-disabled'?: Booleanish;
    'aria-dropeffect'?: 'copy' | 'execute' | 'link' | 'move' | 'none' | 'popup';
    'aria-errormessage'?: string;
    'aria-expanded'?: Booleanish;
    'aria-flowto'?: string;
    'aria-grabbed'?: Booleanish;
    'aria-haspopup'?: Booleanish | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
    'aria-hidden'?: Booleanish;
    'aria-invalid'?: Booleanish | 'grammar' | 'spelling';
    'aria-keyshortcuts'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-level'?: number;
    'aria-live'?: 'off' | 'assertive' | 'polite';
    'aria-modal'?: Booleanish;
    'aria-multiline'?: Booleanish;
    'aria-multiselectable'?: Booleanish;
    'aria-orientation'?: 'horizontal' | 'vertical' | 'undefined';
    'aria-owns'?: string;
    'aria-placeholder'?: string;
    'aria-posinset'?: number;
    'aria-pressed'?: Booleanish | 'mixed';
    'aria-readonly'?: Booleanish;
    'aria-relevant'?: 'additions' | 'additions-text' | 'all' | 'removals' | 'text';
    'aria-required'?: Booleanish;
    'aria-roledescription'?: string;
    'aria-rowcount'?: number;
    'aria-rowindex'?: number;
    'aria-rowindextext'?: string;
    'aria-rowspan'?: number;
    'aria-selected'?: Booleanish;
    'aria-setsize'?: number;
    'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';
    'aria-valuemax'?: number;
    'aria-valuemin'?: number;
    'aria-valuenow'?: number;
    'aria-valuetext'?: string;
  }
}

export type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'blockquote'
  | 'button'
  | 'caption'
  | 'cell'
  | 'checkbox'
  | 'code'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'deletion'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'emphasis'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'insertion'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'mark'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'paragraph'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'strong'
  | 'subscript'
  | 'superscript'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';

export interface AriaAttributes {
  'aria-activedescendant'?: string;
  'aria-atomic'?: Booleanish | 'false' | 'true';
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  'aria-braillelabel'?: string;
  'aria-brailleroledescription'?: string;
  'aria-busy'?: Booleanish;
  'aria-checked'?: Booleanish | 'mixed';
  'aria-colcount'?: number;
  'aria-colindex'?: number;
  'aria-colindextext'?: string;
  'aria-colspan'?: number;
  'aria-controls'?: string;
  'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-describedby'?: string;
  'aria-description'?: string;
  'aria-disabled'?: Booleanish;
  'aria-dropeffect'?: 'copy' | 'execute' | 'link' | 'move' | 'none' | 'popup';
  'aria-errormessage'?: string;
  'aria-expanded'?: Booleanish;
  'aria-flowto'?: string;
  'aria-grabbed'?: Booleanish;
  'aria-haspopup'?: Booleanish | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
  'aria-hidden'?: Booleanish;
  'aria-invalid'?: Booleanish | 'grammar' | 'spelling';
  'aria-keyshortcuts'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-level'?: number;
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-modal'?: Booleanish;
  'aria-multiline'?: Booleanish;
  'aria-multiselectable'?: Booleanish;
  'aria-orientation'?: 'horizontal' | 'vertical' | 'undefined';
  'aria-owns'?: string;
  'aria-placeholder'?: string;
  'aria-posinset'?: number;
  'aria-pressed'?: Booleanish | 'mixed';
  'aria-readonly'?: Booleanish;
  'aria-relevant'?: 'additions' | 'additions-text' | 'all' | 'removals' | 'text';
  'aria-required'?: Booleanish;
  'aria-roledescription'?: string;
  'aria-rowcount'?: number;
  'aria-rowindex'?: number;
  'aria-rowindextext'?: string;
  'aria-rowspan'?: number;
  'aria-selected'?: Booleanish;
  'aria-setsize'?: number;
  'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';
  'aria-valuemax'?: number;
  'aria-valuemin'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
}

export interface AriaLabeling {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-description'?: string;
}

export interface AriaStates {
  'aria-busy'?: Booleanish;
  'aria-checked'?: Booleanish | 'mixed';
  'aria-disabled'?: Booleanish;
  'aria-expanded'?: Booleanish;
  'aria-grabbed'?: Booleanish;
  'aria-hidden'?: Booleanish;
  'aria-invalid'?: Booleanish | 'grammar' | 'spelling';
  'aria-pressed'?: Booleanish | 'mixed';
  'aria-selected'?: Booleanish;
}

export interface AriaInteraction {
  'aria-activedescendant'?: string;
  'aria-controls'?: string;
  'aria-haspopup'?: Booleanish | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
  'aria-keyshortcuts'?: string;
  'aria-owns'?: string;
}

export type Booleanish = boolean | 'true' | 'false';

export interface FocusManagement {
  tabIndex?: number;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

export interface KeyboardNavigation {
  role: AriaRole;
  tabIndex?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
}

export interface LiveRegion {
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-atomic'?: Booleanish;
  'aria-relevant'?: 'additions' | 'additions-text' | 'all' | 'removals' | 'text';
}

export interface ModalDialog extends AriaAttributes {
  role: 'dialog' | 'alertdialog';
  'aria-modal'?: Booleanish;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}
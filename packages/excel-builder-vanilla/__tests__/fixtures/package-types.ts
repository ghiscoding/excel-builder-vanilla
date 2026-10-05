import * as Companion from '../../../excel-builder-vanilla-types/dist/index.js';
import * as Library from '../../dist/index.js';

declare const workbook: Library.Workbook;
declare const companionWorkbook: Companion.Workbook;
declare const worksheet: Library.Worksheet;
declare const companionWorksheet: Companion.Worksheet;

export const libraryTypes: { exports: typeof Library; workbook: Library.Workbook; worksheet: Library.Worksheet } = {
  exports: Companion,
  workbook: companionWorkbook,
  worksheet: companionWorksheet,
};
export const companionTypes: { exports: typeof Companion; workbook: Companion.Workbook; worksheet: Companion.Worksheet } = {
  exports: Library,
  workbook,
  worksheet,
};

Library.createExcelFile(companionWorkbook);
Companion.createExcelFile(workbook);
Library.createExcelFileStream(companionWorkbook);
Companion.createExcelFileStream(workbook);

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Assert<T extends true> = T;

type LibraryMembers =
  | keyof Library.Chart
  | keyof Library.Worksheet
  | keyof Library.Workbook
  | keyof Library.Pane
  | keyof typeof Library.Util;
type CompanionMembers =
  | keyof Companion.Chart
  | keyof Companion.Worksheet
  | keyof Companion.Workbook
  | keyof Companion.Pane
  | keyof typeof Companion.Util;

export type TypeContracts = [
  Assert<Equal<Extract<LibraryMembers, `_${string}`>, never>>,
  Assert<Equal<Extract<CompanionMembers, `_${string}`>, never>>,
  Assert<Equal<ReturnType<Library.Worksheet['exportData']>['_headers'], ReturnType<Companion.Worksheet['exportData']>['_headers']>>,
  Assert<Equal<Library.AnchorOption, Companion.AnchorOption>>,
  Assert<Equal<Library.Cell, Companion.Cell>>,
  Assert<Equal<Library.CharType, Companion.CharType>>,
  Assert<Equal<Library.DualAnchorOption, Companion.DualAnchorOption>>,
  Assert<Equal<Library.ExcelFileStreamOptions, Companion.ExcelFileStreamOptions>>,
  Assert<Equal<Library.InferOutputByType<'Blob'>, Companion.InferOutputByType<'Blob'>>>,
  Assert<Equal<Library.InferOutputByType<'Uint8Array'>, Companion.InferOutputByType<'Uint8Array'>>>,
  Assert<Equal<Library.MediaMeta, Companion.MediaMeta>>,
  Assert<Equal<Library.Relation, Companion.Relation>>,
  Assert<Equal<Library.SheetViewOption, Companion.SheetViewOption>>,
  Assert<Equal<Library.WorksheetOption, Companion.WorksheetOption>>,
  Assert<Equal<Library.XMLNodeOption, Companion.XMLNodeOption>>,
];

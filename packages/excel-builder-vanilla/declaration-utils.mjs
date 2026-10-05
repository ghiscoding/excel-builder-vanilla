import { parseSync } from 'rolldown/utils';

// The previous generator exported these referenced types even when index.ts did not.
const legacyTypeExports = [
  'AnchorOption',
  'Cell',
  'CharType',
  'DualAnchorOption',
  'ExcelFileStreamOptions',
  'InferOutputByType',
  'MediaMeta',
  'Relation',
  'SheetViewOption',
  'WorksheetOption',
  'XMLNodeOption',
];

export function prepareDeclarations(code, typesToExport = legacyTypeExports) {
  const { program, comments, errors } = parseSync('index.d.ts', code);
  if (errors.length) {
    throw new Error(`Invalid declaration bundle: ${errors.map(error => error.message).join('\n')}`);
  }

  const declared = new Set();
  const exported = new Set();
  for (const statement of program.body) {
    const declaration = statement.declaration ?? statement;
    if (declaration.id) {
      declared.add(declaration.id.name);
      if (statement.type === 'ExportNamedDeclaration') {
        exported.add(declaration.id.name);
      }
    }
    if (statement.type === 'ExportNamedDeclaration') {
      for (const specifier of statement.specifiers) {
        exported.add(specifier.exported.name ?? specifier.exported.value);
      }
    }
  }
  const missingExports = typesToExport.filter(name => !exported.has(name));
  for (const name of missingExports) {
    if (!declared.has(name)) {
      throw new Error(`Missing public declaration type: ${name}`);
    }
  }

  const edits = [];
  function visit(node) {
    if (!node || typeof node !== 'object') {
      return;
    }
    if (node.type === 'ClassBody') {
      for (const [index, member] of node.body.entries()) {
        const name = member.key?.name ?? member.key?.value;
        const privateMember =
          member.accessibility === 'private' ||
          member.key?.type === 'PrivateIdentifier' ||
          (typeof name === 'string' && name.startsWith('_'));
        // Constructor accessibility is an API contract, unlike implementation fields/methods.
        if (!privateMember || member.kind === 'constructor') {
          visit(member);
          continue;
        }
        const previousEnd = index === 0 ? node.start + 1 : node.body[index - 1].end;
        let start = member.start;
        for (let i = comments.length - 1; i >= 0; i--) {
          const comment = comments[i];
          if (comment.end > start) {
            continue;
          }
          if (
            comment.start < previousEnd ||
            code.slice(comment.end, start).trim() ||
            (index > 0 && !code.slice(previousEnd, comment.start).includes('\n'))
          ) {
            break;
          }
          start = comment.start;
        }
        const lineStart = code.lastIndexOf('\n', start - 1) + 1;
        if (!code.slice(lineStart, start).trim()) {
          start = lineStart;
        }
        let end = member.end;
        const lineEnd = code.indexOf('\n', end);
        if (lineEnd !== -1 && !code.slice(end, lineEnd).trim()) {
          end = lineEnd + 1;
        }
        edits.push([start, end]);
      }
      return;
    }
    for (const child of Object.values(node)) {
      if (Array.isArray(child)) {
        for (const item of child) {
          visit(item);
        }
      } else if (child && typeof child === 'object') {
        visit(child);
      }
    }
  }
  visit(program);
  for (const [start, end] of edits.sort((a, b) => b[0] - a[0])) {
    code = code.slice(0, start) + code.slice(end);
  }
  if (missingExports.length) {
    code += `\nexport type { ${missingExports.join(', ')} };\n`;
  }
  // Match the compact, readable layout of the previous bundle without removing JSDoc.
  return code.replace(/^\/\/#(?:end)?region[^\n]*(?:\n|$)/gm, '').replace(/^(?: {2})+/gm, spaces => '\t'.repeat(spaces.length / 2));
}

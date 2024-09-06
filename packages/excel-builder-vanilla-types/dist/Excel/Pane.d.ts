import { XMLDOM } from './XMLDOM';
export declare class Pane {
    state: null | 'split' | 'frozen' | 'frozenSplit';
    xSplit: number | null;
    ySplit: number | null;
    activePane: string;
    topLeftCell: number | string | null;
    _freezePane: {
        xSplit: number;
        ySplit: number;
        cell: string;
    };
    freezePane(column: number, row: number, cell: string): void;
    exportXML(doc: XMLDOM): import('./XMLDOM').XMLNode;
}
//# sourceMappingURL=Pane.d.ts.map
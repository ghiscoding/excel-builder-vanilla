import { uniqueId } from '../../utilities/uniqueId.js';
import { Util } from '../Util.js';
import type { MediaMeta } from '../Workbook.js';
import type { XMLDOM } from '../XMLDOM.js';
import { Drawing } from './Drawing.js';

export class Picture extends Drawing {
  id = uniqueId('Picture');
  pictureId = Util.uniqueId('Picture');
  fill: any = {};
  mediaData: MediaMeta | null = null;
  description = '';

  /** Creates a picture drawing with generated identifiers. */
  constructor() {
    super();
    // Picture.prototype = new Drawing();
    this.id = uniqueId('Picture');
    this.pictureId = Util.uniqueId('Picture');
  }

  /** Associates this picture with media registered in the workbook. */
  setMedia(mediaRef: MediaMeta) {
    this.mediaData = mediaRef;
  }

  /** Sets the alternative text description written to the drawing markup. */
  setDescription(description: string) {
    this.description = description;
  }

  /** Sets the picture fill mode. */
  setFillType(type: string) {
    this.fill.type = type;
  }

  /** Merges additional options into the picture fill configuration. */
  setFillConfig(config: any) {
    Object.assign(this.fill, config);
  }

  /** Returns the relationship schema key used for picture media. */
  getMediaType(): keyof typeof Util.schemas {
    return 'image';
  }

  /** Returns the workbook media record associated with this picture. */
  getMediaData() {
    return this.mediaData as MediaMeta;
  }

  /** Assigns the package relationship ID used to reference the picture media. */
  setRelationshipId(rId: string) {
    this.mediaData!.rId = rId;
  }

  /** Serializes the picture markup and its anchor as OOXML. */
  toXML(xmlDoc: XMLDOM) {
    const pictureNode = Util.createElement(xmlDoc, 'xdr:pic');

    const nonVisibleProperties = Util.createElement(xmlDoc, 'xdr:nvPicPr');

    const nameProperties = Util.createElement(xmlDoc, 'xdr:cNvPr', [
      ['id', this.pictureId],
      ['name', this.mediaData!.fileName],
      ['descr', this.description || ''],
    ]);
    nonVisibleProperties.appendChild(nameProperties);
    const nvPicProperties = Util.createElement(xmlDoc, 'xdr:cNvPicPr');
    nvPicProperties.appendChild(
      Util.createElement(xmlDoc, 'a:picLocks', [
        ['noChangeAspect', '1'],
        ['noChangeArrowheads', '1'],
      ]),
    );
    nonVisibleProperties.appendChild(nvPicProperties);
    pictureNode.appendChild(nonVisibleProperties);
    const pictureFill = Util.createElement(xmlDoc, 'xdr:blipFill');
    pictureFill.appendChild(
      Util.createElement(xmlDoc, 'a:blip', [
        ['xmlns:r', Util.schemas.relationships],
        ['r:embed', this.mediaData!.rId],
      ]),
    );
    pictureFill.appendChild(Util.createElement(xmlDoc, 'a:srcRect'));
    const stretch = Util.createElement(xmlDoc, 'a:stretch');
    stretch.appendChild(Util.createElement(xmlDoc, 'a:fillRect'));
    pictureFill.appendChild(stretch);
    pictureNode.appendChild(pictureFill);

    const shapeProperties = Util.createElement(xmlDoc, 'xdr:spPr', [['bwMode', 'auto']]);

    const transform2d = Util.createElement(xmlDoc, 'a:xfrm');
    shapeProperties.appendChild(transform2d);

    const presetGeometry = Util.createElement(xmlDoc, 'a:prstGeom', [['prst', 'rect']]);
    shapeProperties.appendChild(presetGeometry);

    pictureNode.appendChild(shapeProperties);
    //            <xdr:spPr bwMode="auto">
    //                <a:xfrm>
    //                    <a:off x="1" y="1"/>
    //                    <a:ext cx="1640253" cy="1885949"/>
    //                </a:xfrm>
    //                <a:prstGeom prst="rect">
    //                    <a:avLst/>
    //                </a:prstGeom>
    //                <a:noFill/>
    //                <a:extLst>
    //                    <a:ext uri="{909E8E84-426E-40DD-AFC4-6F175D3DCCD1}">
    //                        <a14:hiddenFill xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main">
    //                            <a:solidFill>
    //                                <a:srgbClr val="FFFFFF"/>
    //                            </a:solidFill>
    //                        </a14:hiddenFill>
    //                    </a:ext>
    //                </a:extLst>
    //            </xdr:spPr>
    //

    // TODO: add back extends Drawing and the following
    return this.anchor.toXML(xmlDoc, pictureNode);
  }
}

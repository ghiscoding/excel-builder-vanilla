import { Drawing } from './Drawing.js';
import { uniqueId } from '../../utilities/uniqueId.js';
import { Util } from '../Util.js';
import type { MediaMeta } from '../Workbook.js';
import type { XMLDOM } from '../XMLDOM.js';

export class Picture extends Drawing {
  id = uniqueId('Picture');
  pictureId = Util.uniqueId('Picture');
  fill: any = {};
  mediaData: MediaMeta | null = null;
  description = '';

  constructor() {
    super();
    // Picture.prototype = new Drawing();
    this.id = uniqueId('Picture');
    this.pictureId = Util.uniqueId('Picture');
  }

  setMedia(mediaRef: MediaMeta) {
    this.mediaData = mediaRef;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setFillType(type: string) {
    this.fill.type = type;
  }

  setFillConfig(config: any) {
    Object.assign(this.fill, config);
  }

  getMediaType(): keyof typeof Util.schemas {
    return 'image';
  }

  getMediaData() {
    return this.mediaData as MediaMeta;
  }

  setRelationshipId(rId: string) {
    this.mediaData!.rId = rId;
  }

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
